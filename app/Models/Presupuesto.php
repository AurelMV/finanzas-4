<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presupuesto extends Model
{
    /** @use HasFactory<\Database\Factories\PresupuestoFactory> */
    use HasFactory;

    protected $fillable = ['monto', 'mes', 'ano'];

    public function transacciones()
    {
        return $this->hasMany(Transaccion::class);
    }
}
