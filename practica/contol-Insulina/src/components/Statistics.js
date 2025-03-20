import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, CategoryScale, LinearScale } from 'chart.js';

// Registra todos los componentes de Chart.js
Chart.register(...registerables, CategoryScale, LinearScale);

const Statistics = ({ month, year }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Referencia para el gráfico

    // useEffect para obtener estadísticas
    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true); // Establece loading en true antes de la solicitud
            try {
                const response = await axios.get(`http://localhost/practica/stats.php?month=${month}&year=${year}`);
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Error al cargar las estadísticas. Intenta de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [month, year]); // Dependencias: se ejecuta cuando cambian month o year

    // useEffect para limpiar el gráfico
    useEffect(() => {
        return () => {
            // Limpia el gráfico al desmontar el componente
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []); // Este efecto se ejecuta solo al desmontar el componente

    if (loading) return <p>Cargando estadísticas...</p>;
    if (error) return <p>{error}</p>;
    if (!stats) return <p>No hay datos disponibles.</p>;

    if (!Array.isArray(stats.values) || stats.values.length === 0) {
        return <p>No hay datos para mostrar en el gráfico.</p>;
    }

    const chartData = {
        labels: stats.values.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Valor LENTA',
                data: stats.values,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }
        ]
    };

    return (
        <div>
            <h2>Estadísticas del Valor LENTA</h2>
            <p>Valor Medio: {stats.mean !== null ? stats.mean.toFixed(2) : 'No disponible'}</p>
            <p>Valor Mínimo: {stats.min !== null ? stats.min : 'No disponible'}</p>
            <p>Valor Máximo: {stats.max !== null ? stats.max : 'No disponible'}</p>
            <Line data={chartData} ref={chartRef} />
        </div>
    );
};

export default Statistics;

