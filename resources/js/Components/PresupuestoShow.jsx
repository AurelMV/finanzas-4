import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

export default function PresupuestoShow() {
    const { presupuesto, transacciones } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Presupuesto #{presupuesto.id} - Transacciones
                </h2>
            }
        >
            <Head title={`Presupuesto #${presupuesto.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Tipo</th>
                                        <th className="px-4 py-2">Monto</th>
                                        <th className="px-4 py-2">Descripción</th>
                                        <th className="px-4 py-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transacciones.map((transaccion) => (
                                        <tr key={transaccion.id}>
                                            <td className="border px-4 py-2">{transaccion.id}</td>
                                            <td className="border px-4 py-2">{transaccion.tipo}</td>
                                            <td className="border px-4 py-2">{transaccion.monto}</td>
                                            <td className="border px-4 py-2">{transaccion.descripcion}</td>
                                            <td className="border px-4 py-2">{transaccion.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}