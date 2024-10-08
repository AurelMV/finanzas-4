<?php

namespace App\Http\Controllers;

use App\Models\Presupuesto;
use App\Models\Transaccion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $presupuestoId)
    {
        $request->validate([
            'tipo' => 'required|string',
            'monto' => 'required|numeric',
            'descripcion' => 'required|string',
            'fecha' => 'required|date',
        ]);

        $presupuesto = Presupuesto::findOrFail($presupuestoId);

        Transaccion::create([
            'tipo' => $request->tipo,
            'monto' => $request->monto,
            'descripcion' => $request->descripcion,
            'fecha' => $request->fecha,
            'presupuesto_id' => $presupuesto->id,
        ]);

        return redirect()->route('presupuestos.show', $presupuestoId);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function grafico(Request $request)
    {
        $year = $request->input('year', date('Y'));
        $groupBy = $request->input('groupBy', 'month');

        if ($groupBy === 'year') {
            $transacciones = Transaccion::selectRaw('YEAR(fecha) as period, tipo, SUM(monto) as total')
                ->groupBy('period', 'tipo')
                ->get();
        } else {
            $transacciones = Transaccion::selectRaw('MONTH(fecha) as period, tipo, SUM(monto) as total')
                ->whereYear('fecha', $year)
                ->groupBy('period', 'tipo')
                ->get();
        }

        $years = Transaccion::selectRaw('YEAR(fecha) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        $data = [
            'ingresos' => [],
            'gastos' => [],
        ];

        if ($groupBy === 'year') {
            foreach ($years as $year) {
                $data['ingresos'][$year] = 0;
                $data['gastos'][$year] = 0;
            }
        } else {
            $data['ingresos'] = array_fill(1, 12, 0);
            $data['gastos'] = array_fill(1, 12, 0);
        }

        foreach ($transacciones as $transaccion) {
            if ($transaccion->tipo === 'ingreso') {
                $data['ingresos'][$transaccion->period] = $transaccion->total;
            } else {
                $data['gastos'][$transaccion->period] = $transaccion->total;
            }
        }

        return Inertia::render('Grafico', [
            'data' => $data,
            'years' => $years,
            'selectedYear' => $year,
            'groupBy' => $groupBy,
        ]);
    }
}
