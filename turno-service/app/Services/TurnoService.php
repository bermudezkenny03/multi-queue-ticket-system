<?php

namespace App\Services;

use App\Repositories\TurnoRepository;

class TurnoService
{
    public function __construct(private TurnoRepository $repo) {}

    public function generar($tipo)
    {
        $ultimo = $this->repo->ultimoPorTipo($tipo);

        $numero = $ultimo ? $ultimo->numero + 1 : 1;

        return $this->repo->crear($numero, $tipo);
    }

    public function siguiente()
    {
        $turno = $this->repo->siguiente();

        if (!$turno) {
            return null;
        }

        return $this->repo->atender($turno);
    }

    public function listar()
    {
        return $this->repo->listar();
    }
}
