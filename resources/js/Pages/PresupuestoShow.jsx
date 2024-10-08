import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function PresupuestoShow() {
    const { presupuesto, transacciones } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        tipo: '',
        monto: '',
        descripcion: '',
        fecha: `${presupuesto.ano}-${String(presupuesto.mes).padStart(2, '0')}-01`,
    });

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('transacciones.store', presupuesto.id), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

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
                            <button
                                onClick={handleModalToggle}
                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Agregar Transacción
                            </button>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Tipo</th>
                                        <th className="px-4 py-2">Monto</th>
                                        <th className="px-4 py-2">Descripción</th>
                                        <th className="px-4 py-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transacciones.map((transaccion) => (
                                        <tr
                                            key={transaccion.id}
                                            className={transaccion.tipo === 'ingreso' ? 'text-black' : 'text-red-500'}
                                        >
                                            <td className="border px-4 py-2 text-center">{transaccion.tipo}</td>
                                            <td className="border px-4 py-2 text-center">{transaccion.monto}</td>
                                            <td className="border px-4 py-2 text-center">{transaccion.descripcion}</td>
                                            <td className="border px-4 py-2 text-center">{transaccion.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Agregar Nueva Transacción</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
                                    Tipo
                                </label>
                                <select
                                    name="tipo"
                                    id="tipo"
                                    value={data.tipo}
                                    onChange={(e) => setData('tipo', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="ingreso">Ingreso</option>
                                    <option value="gasto">Gasto</option>
                                </select>
                                {errors.tipo && <div className="text-red-500 text-sm">{errors.tipo}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                                    Monto
                                </label>
                                <input
                                    type="number"
                                    name="monto"
                                    id="monto"
                                    value={data.monto}
                                    onChange={(e) => setData('monto', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.monto && <div className="text-red-500 text-sm">{errors.monto}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    id="descripcion"
                                    value={data.descripcion}
                                    onChange={(e) => setData('descripcion', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                                    Día
                                </label>
                                <input
                                    type="date"
                                    name="fecha"
                                    id="fecha"
                                    value={data.fecha}
                                    onChange={(e) => setData('fecha', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                    min={`${presupuesto.ano}-${String(presupuesto.mes).padStart(2, '0')}-01`}
                                    max={`${presupuesto.ano}-${String(presupuesto.mes).padStart(2, '0')}-${new Date(presupuesto.ano, presupuesto.mes, 0).getDate()}`}
                                />
                                {errors.fecha && <div className="text-red-500 text-sm">{errors.fecha}</div>}
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalToggle}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}