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
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import faker from 'faker';




export const KindergartenStatChart = ({kindergartens}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels
      );
      
       const options = {
        indexAxis: 'y' ,

       
             
       
     
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };
      
      var labels = [''];
      if(kindergartens !== null)
        labels = kindergartens.map(kindergarten => kindergarten.name);
      
       const data = {
        labels,
        datasets: [
        
          {
            label: labels.length,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })).sort( (a, b) => a < b),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
        ],
      };



  return <Bar options={options} data={data} height="600em" width="100%"/>;
}
