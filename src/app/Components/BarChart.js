"use client"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function getLast12MonthNames() {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const month = currentDate.getMonth() - i;
    const year = currentDate.getFullYear();
    const newDate = new Date(year, month, 1);
    const monthName = newDate.toLocaleString('default', { month: 'short' });
    months.unshift(monthName);
  }

  return months;
}

const labels = getLast12MonthNames();



export function BarChart({firstLabel , secondLabel , firstData , secondData}) {
   const data = {
    labels,
    datasets: [
      {
        label: firstLabel,
        data: firstData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: secondLabel,
        data: secondData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: firstLabel === "Challan" ? 'Member Bar Chart' : 'Driver Bar Chart',
      },
    },
  };
  return <Bar options={options} data={data} />;
}
