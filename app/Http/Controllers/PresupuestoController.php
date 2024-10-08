<?php

namespace App\Http\Controllers;

use App\Models\Presupuesto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PresupuestoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $presupuestos = Presupuesto::all();
        return Inertia::render('Dashboard', [
            'presupuestos' => $presupuestos,
        ]);
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
    public function store(Request $request)
    {
        $request->validate([
            'monto' => 'required|numeric',
            'mes' => 'required|integer',
            'ano' => 'required|integer',
        ]);

        Presupuesto::create($request->all());

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $presupuesto = Presupuesto::with('transacciones')->findOrFail($id);
        return Inertia::render('PresupuestoShow', [
            'presupuesto' => $presupuesto,
            'transacciones' => $presupuesto->transacciones,
        ]);
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
}
