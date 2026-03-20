<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TurnoService;

class TurnoController extends Controller
{
    public function __construct(private TurnoService $service) {}

    public function generar(Request $request)
    {
        $tipo = $request->input('tipo', 'A');

        $turno = $this->service->generar($tipo);

        return response()->json($turno);
    }

    public function siguiente()
    {
        $turno = $this->service->siguiente();

        if (!$turno) {
            return response()->json([
                'message' => 'No hay turnos pendientes'
            ], 404);
        }

        return response()->json($turno);
    }

    public function listar()
    {
        return response()->json([
            'data' => $this->service->listar()
        ]);
    }
}
