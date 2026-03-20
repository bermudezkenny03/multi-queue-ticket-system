const API = "http://localhost:8002/api/turnos";

let sonidoActivo = false;
let ultimoTurno = null;

document.body.addEventListener("click", () => {
  const audio = document.getElementById("audio");
  if (!audio) return;

  audio.play().then(() => {
    audio.pause();
    sonidoActivo = true;
    console.log("🔊 sonido activo");
  });
}, { once: true });

const format = (t,n) => `${t}-${String(n).padStart(3,"0")}`;


async function api(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (e) {
    console.error("API ERROR", e);
    return null;
  }
}

async function generar(tipo){
  await api(`${API}/generar`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ tipo })
  });
  cargar();
}

async function siguiente(){
  await api(`${API}/siguiente`,{ method:"POST" });
  cargar();
}

async function cargar(){
  const json = await api(`${API}/listar`);
  if(!json) return;

  let html = "";

  json.data.slice(0,12).forEach(t=>{
    html += `
      <div class="item">
        <div class="numero ${t.tipo}">
          ${format(t.tipo,t.numero)}
        </div>
        <div class="estado ${t.estado}">
          ${t.estado}
        </div>
      </div>
    `;
  });

  document.getElementById("lista").innerHTML = html;
}

function renderColas(data){
  const colas = { A:[], B:[], C:[] };

  data.filter(t=>t.estado==="pendiente")
      .forEach(t => colas[t.tipo].push(t));

  document.getElementById("colaA").innerHTML =
    colas.A.map(t=>`<div>${format(t.tipo,t.numero)}</div>`).join("");

  document.getElementById("colaB").innerHTML =
    colas.B.map(t=>`<div>${format(t.tipo,t.numero)}</div>`).join("");

  document.getElementById("colaC").innerHTML =
    colas.C.map(t=>`<div>${format(t.tipo,t.numero)}</div>`).join("");
}


function reproducirSonido(texto){
  if(ultimoTurno !== texto && sonidoActivo){
    const audio = document.getElementById("audio");
    if(audio){
      audio.currentTime = 0;
      audio.play();
    }
  }
  ultimoTurno = texto;
}

async function cargarPantalla(){
  const json = await api(`${API}/listar`);
  if(!json) return;

  const data = json.data;
  const actual = data.find(t=>t.estado==="atendido");

  const el = document.getElementById("turno");

  if(!actual){
    el.innerText = "Esperando...";
    return;
  }

  const texto = format(actual.tipo,actual.numero);

  el.innerText = texto;
  el.className = "turno " + actual.tipo;

  el.classList.add("animate");
  setTimeout(()=> el.classList.remove("animate"),300);

  reproducirSonido(texto);

  renderColas(data);
}