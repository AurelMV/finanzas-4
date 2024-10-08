<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaccion extends Model
{
    /** @use HasFactory<\Database\Factories\TransaccionFactory> */
    use HasFactory;

    protected $fillable = ['tipo', 'monto', 'descripcion', 'fecha', 'presupuesto_id'];

    public function presupuesto()
    {
        return $this->belongsTo(Presupuesto::class);
    }

    // Método para encriptar el atributo 'descripcion' antes de guardarlo en la base de datos
    public function setDescripcionAttribute($value)
    {
        $this->attributes['descripcion'] = encrypt($value);
    }

    // Método para desencriptar el atributo 'descripcion' al obtenerlo de la base de datos
    public function getDescripcionAttribute($value)
    {
        return decrypt($value);
    }
}
