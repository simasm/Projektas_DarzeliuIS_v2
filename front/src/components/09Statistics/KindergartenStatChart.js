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


      ChartJS.defaults.set('plugins.datalabels', {
        color: 'black',
        anchor : "start",
        clamp : true,
        align : "right",
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex] + " " + value;
        }

        });
      
       const options = {
        
        legend: {
          display: false
      },
        
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
        labels  ,
        datasets: [
        
          {
            label: "prasymu sk",
            data: labels.map(( ) => faker.datatype.number({ min: 0, max: 100 }))
                        .sort( (a, b) => a < b) ,
            

            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
           
          },
        ],
      };



  return <Bar options={options} data={data} height="600em" width="100%"/>;
}
