import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const BookStats = (props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        interaction: {
            mode: 'index' ,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Book Statistics',
            },
        },
        scales: {
            y: {
                type: 'linear' ,
                display: true,
                position: 'left' ,
            },
            y1: {
                type: 'linear' ,
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const labels = [];
    const dataLabelsRead = [];
    const dataLabelsLikes = [];
    const dataLabelsUnLikes = [];
    const dataLabelsView = [];
    const dataLabelsComments = [];

    for (let key in props.stats.read) {
        // ключи
        labels.push(key)
        // значения ключей
        dataLabelsRead.push(props.stats.read[key]); // John, 30, true
        dataLabelsView.push(props.stats.views[key]); // John, 30, true
        dataLabelsLikes.push(props.stats.likes[key]); // John, 30, true
        dataLabelsUnLikes.push(props.stats.unlikes[key]); // John, 30, true
        dataLabelsComments.push(props.stats.comments[key]); // John, 30, true
    }



    const data = {
        labels,
        datasets: [
            {
                label: 'View',
                data: dataLabelsView,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

                yAxisID: 'y',
            },
            {
                label: 'Read',
                data: dataLabelsRead,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
            }
            ,
            {
                label: 'Likes',
                data: dataLabelsLikes,
                borderColor: 'green',
                backgroundColor: 'green',
                yAxisID: 'y1',
            },
            {
                label: 'Unlikes',
                data: dataLabelsUnLikes,
                borderColor: 'red',
                backgroundColor: 'red',
                yAxisID: 'y1',
            },
            {
                label: 'Comments',
                data: dataLabelsComments,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                yAxisID: 'y1',
            }
        ],
    };
    return (
        <div>
          <Line options={options} data={data} />

        </div>
    );
};

export default BookStats;