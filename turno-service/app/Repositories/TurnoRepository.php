<?php

namespace App\Repositories;

use App\Models\Turno;

class TurnoRepository
{
    public function ultimoPorTipo($tipo)
    {
        return Turno::where('tipo', $tipo)
            ->latest()
            ->first();
    }

    public function crear($numero, $tipo)
    {
        return Turno::create([
            'numero' => $numero,
            'tipo' => $tipo,
            'estado' => 'pendiente'
        ]);
    }

    public function siguiente()
    {
        return Turno::where('estado', 'pendiente')
            ->orderByRaw("
                CASE tipo
                    WHEN 'C' THEN 1
                    WHEN 'B' THEN 2
                    ELSE 3
                END
            ")
            ->orderBy('created_at') // FIFO
            ->first();
    }

    public function atender($turno)
    {
        $turno->estado = 'atendido';
        $turno->save();

        return $turno;
    }

    public function listar()
    {
        return Turno::orderByDesc('created_at')->get();
    }
}
