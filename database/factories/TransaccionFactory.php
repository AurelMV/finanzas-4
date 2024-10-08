<?php

namespace Database\Factories;

use App\Models\Presupuesto;
use App\Models\Transaccion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaccion>
 */
class TransaccionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Transaccion::class;

    public function definition()
    {
        return [
            'tipo' => $this->faker->randomElement(['ingreso', 'gasto']),
            'monto' => $this->faker->numberBetween(100, 1000),
            'descripcion' => $this->faker->sentence,
            'fecha' => $this->faker->dateTimeThisDecade,
            'presupuesto_id' => Presupuesto::factory(),
        ];
    }
}
