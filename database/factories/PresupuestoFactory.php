<?php

namespace Database\Factories;

use App\Models\Presupuesto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Presupuesto>
 */
class PresupuestoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Presupuesto::class;

    public function definition()
    {
        return [
            'monto' => $this->faker->numberBetween(1000, 10000),
            'mes' => $this->faker->numberBetween(1, 12),
            'ano' => $this->faker->year,
        ];
    }
}
