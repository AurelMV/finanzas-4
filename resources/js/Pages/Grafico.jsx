import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Grafico() {
    const { data, years, selectedYear, groupBy } = usePage().props;
    const [year, setYear] = useState(selectedYear);
    const [group, setGroup] = useState(groupBy);

    const handleYearChange = (e) => {
        setYear(e.target.value);
        window.location.href = route('grafico', { year: e.target.value, groupBy: group });
    };

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
        window.location.href = route('grafico', { year, groupBy: e.target.value });
    };

    const labels = group === 'year' ? Object.keys(data.ingresos) : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Ingresos',
                data: Object.values(data.ingresos),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Gastos',
                data: Object.values(data.gastos),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Transacciones por ${group === 'year' ? 'Año' : 'Mes'} en ${year}`,
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gráfico de Transacciones
                </h2>
            }
        >
            <Head title="Gráfico" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                                    Seleccione un Año
                                </label>
                                <select
                                    name="year"
                                    id="year"
                                    value={year}
                                    onChange={handleYearChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    disabled={group === 'year'}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupBy">
                                    Agrupar por
                                </label>
                                <select
                                    name="groupBy"
                                    id="groupBy"
                                    value={group}
                                    onChange={handleGroupChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="month">Mes</option>
                                    <option value="year">Año</option>
                                </select>
                            </div>
                            <Bar data={chartData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}