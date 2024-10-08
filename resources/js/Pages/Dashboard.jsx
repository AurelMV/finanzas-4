import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Dashboard() {
    const { presupuestos } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        monto: '',
        mes: '',
        ano: '',
    });

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('presupuestos.store'), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear + i);
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Listado de Presupuestos
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <button
                                onClick={handleModalToggle}
                                className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded"
                            >
                                Agregar Presupuesto
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {presupuestos.map((presupuesto) => (
                                    <Link
                                        key={presupuesto.id}
                                        href={route('presupuestos.show', presupuesto.id)}
                                        className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white"
                                    >
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Presupuesto #{presupuesto.id}</div>
                                            <p className="text-gray-700 text-base">
                                                Monto: {presupuesto.monto}
                                            </p>
                                            <p className="text-gray-700 text-base">
                                                Mes: {meses[presupuesto.mes - 1]}
                                            </p>
                                            <p className="text-gray-700 text-base">
                                                Año: {presupuesto.ano}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Agregar Nuevo Presupuesto</h2>
                        <form onSubmit={handleSubmit}>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mes">
                                    Mes
                                </label>
                                <select
                                    name="mes"
                                    id="mes"
                                    value={data.mes}
                                    onChange={(e) => setData('mes', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Seleccione un mes</option>
                                    {meses.map((mes, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {mes}
                                        </option>
                                    ))}
                                </select>
                                {errors.mes && <div className="text-red-500 text-sm">{errors.mes}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ano">
                                    Año
                                </label>
                                <select
                                    name="ano"
                                    id="ano"
                                    value={data.ano}
                                    onChange={(e) => setData('ano', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Seleccione un año</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                {errors.ano && <div className="text-red-500 text-sm">{errors.ano}</div>}
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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