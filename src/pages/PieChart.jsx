import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels'; // import the datalabels plugin
import labels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, labels);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function PieChart() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            // subtitle: {
            //     display: true,
            //     text: 'Custom Chart Subtitle'
            // },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    title: (data) => { return data[0].parsed.x },
                    label: function (context) {
                        const labelIndex = context.dataIndex;
                        return `${data.labels[labelIndex]}: ${context.parsed}%`;
                    },
                    labelPointStyle: function(context) {
                        return {
                            pointStyle: 'triangle',
                            rotation: 0
                        };
                    }
                    // labelColor: function(context) {
                    //     return {
                    //         borderColor: 'rgb(0, 0, 255)',
                    //         backgroundColor: 'rgb(255, 0, 0)',
                    //         borderWidth: 2,
                    //         borderDash: [2, 2],
                    //         borderRadius: 2,
                    //     };
                    // },
                    // labelTextColor: function(context) {
                    //     return '#543453';
                    // }
                },
            },
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    //   console.log(dataArr);
                    dataArr.map((data) => {
                        sum += data;
                    });
                    let percentage = ((value * 100) / sum).toFixed(2) + '%';
                    return percentage;
                },
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 14,
                },
            },
        },
    };

    return (
        <div style={{ height: '550px', width: '1750px' }}>
            <Pie data={data} options={options} height={450} width={1288} />
        </div>
    );
}
