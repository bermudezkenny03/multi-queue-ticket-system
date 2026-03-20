# 🚀 Multi Queue Ticket System

Sistema de gestión de turnos con colas priorizadas (A, B, C), desarrollado con arquitectura moderna usando Laravel, Docker y un frontend interactivo.

---

## 🎯 Características

- 🔢 Generación de turnos por tipo:
  - A → Normal
  - B → Preferencial
  - C → VIP
- ⚡ Sistema de prioridad real (VIP > Preferencial > Normal)
- 📊 FIFO dentro de cada tipo
- 🖥️ Pantalla tipo banco en tiempo real
- 🔊 Notificación sonora al llamar turno
- 🎨 UI moderna tipo SaaS
- 🐳 Docker listo para desarrollo

---

## 🧠 Arquitectura

El backend sigue una arquitectura limpia basada en:

- Controller → Manejo de requests
- Service → Lógica de negocio
- Repository → Acceso a datos
- Model → Eloquent ORM

---

## 🛠️ Tecnologías

- PHP 8.3
- Laravel
- MySQL
- Docker & Docker Compose
- HTML / CSS / JavaScript (Vanilla)

---

## ⚙️ Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/multi-queue-ticket-system.git
cd multi-queue-ticket-system
```





