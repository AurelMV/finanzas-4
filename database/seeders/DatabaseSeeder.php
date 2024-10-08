<?php

namespace Database\Seeders;

use App\Models\Presupuesto;
use App\Models\Transaccion;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Crear 10 presupuestos
        Presupuesto::factory(20)->create()->each(function ($presupuesto) {
            // Crear 5 transacciones para cada presupuesto
            Transaccion::factory(5)->create(['presupuesto_id' => $presupuesto->id]);
        });
    }
}
