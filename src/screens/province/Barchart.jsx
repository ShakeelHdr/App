import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = (props) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'bar',
        scrollY: 40, // Set the desired height for scrolling
        scrollx:40,
      },
      xaxis: {
        categories: props.data.x,
        labels: {
          style: {
            colors: ['#f00', '#0f0', '#00f', '#f0f', '#ff0', '#0ff','#f00', '#0f0', '#00f', '#f0f', '#ff0'], // Set category colors here
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            color: '#7FFFD4', // Set y-axis label color here
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'cemter',
            colors: ['#333'], // Set data label color here
            //enabled: true, // Disable data labels
          },
        },
      },
      colors: ['#7FFFD4'], // Set chart bar color here
    },
    series: [
      {
        name: 'Completed Revenue ($)',
        data: props.data.Y,
      },
    ],
  });

  return (
    <div>
      <h2>Barchart</h2>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
    </div>
  );
};

export default BarChart;
