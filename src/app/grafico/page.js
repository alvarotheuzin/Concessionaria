'use client';

import Pagina from "../components/page";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Page() {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        const desejos = JSON.parse(localStorage.getItem('desejos')) || [];

        if (desejos.length === 0) {
            setDados({
                modelos: { labels: [], datasets: [] },
                anos: { labels: [], datasets: [] },
                marcas: { labels: [], datasets: [] },
            });
            return;
        }

        const modelosCount = desejos.reduce((acc, desejo) => {
            acc[desejo.modelo] = (acc[desejo.modelo] || 0) + 1;
            return acc;
        }, {});

        const anosCount = desejos.reduce((acc, desejo) => {
            acc[desejo.ano] = (acc[desejo.ano] || 0) + 1;
            return acc;
        }, {});

        const marcasCount = desejos.reduce((acc, desejo) => {
            acc[desejo.marca] = (acc[desejo.marca] || 0) + 1;
            return acc;
        }, {});

        const modelos = Object.keys(modelosCount);
        const quantidadesModelos = Object.values(modelosCount);

        const anos = Object.keys(anosCount);
        const quantidadesAnos = Object.values(anosCount);

        const marcas = Object.keys(marcasCount);
        const quantidadesMarcas = Object.values(marcasCount);

        setDados({
            modelos: {
                labels: modelos,
                datasets: [{
                    label: 'Carros Desejados por Modelo',
                    data: quantidadesModelos,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                }],
            },
            anos: {
                labels: anos,
                datasets: [{
                    label: 'Carros Desejados por Ano',
                    data: quantidadesAnos,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                }],
            },
            marcas: {
                labels: marcas,
                datasets: [{
                    label: 'Carros Desejados por Marca',
                    data: quantidadesMarcas,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.1,
                }],
            }
        });
    }, []);

    if (!dados) {
        return <div>Carregando gráfico...</div>;
    }

    return (
        <Pagina>
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2 className="text-center my-4">Gráfico de Carros Desejados</h2>

            <h3 className="text-center my-4">Por Modelo</h3>
            <Line data={dados.modelos} />

            <h3 className="text-center my-4">Por Ano</h3>
            <Line data={dados.anos} />

            <h3 className="text-center my-4">Por Marca</h3>
            <Line data={dados.marcas} />
        </div>
        <br />
        <br />
        <br />
        </Pagina>
    );
}
