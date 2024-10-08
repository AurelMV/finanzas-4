<?php

namespace App\Console\Commands;

use App\Models\Transaccion;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Crypt;

class EncryptTransaccionDescripcion extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:encrypt-transaccion-descripcion';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting encryption of descripcion column...');

        $transacciones = Transaccion::all();

        foreach ($transacciones as $transaccion) {
            try {
                // Try to decrypt the value to check if it's already encrypted
                Crypt::decryptString($transaccion->descripcion);
            } catch (\Exception $e) {
                // If decryption fails, it means the value is not encrypted yet
                $transaccion->descripcion = Crypt::encryptString($transaccion->descripcion);
                $transaccion->save();
                $this->info("Encrypted descripcion for transaccion ID: {$transaccion->id}");
            }
        }

        $this->info('Encryption of descripcion column completed.');

        return 0;
    }
}
