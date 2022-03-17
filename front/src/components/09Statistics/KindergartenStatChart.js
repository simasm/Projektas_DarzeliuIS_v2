import React, { useEffect } from 'react';
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





export const KindergartenStatChart = ({ kindergartens, statistics, priorities }) => {


  if (priorities === 0)
    return <></>;

  const percentage = (val, priority, applicationCount) => {
    if (applicationCount === 0)
      return 0;
    //if (val !== 0)
    return 100 * (val / applicationCount);
  }

  const availablePlaces = () => {
    return 0;
  }

  const occupiedPlaces = () => {
    return 0;
  }

  let arr = [];
  for (let key in statistics) {
    switch (priorities) {
      case 1: arr.push(statistics[key].c1); break;
      case 2: arr.push(statistics[key].c2); break;
      case 3: arr.push(statistics[key].c3); break;
      case 4: arr.push(statistics[key].c4); break;
      case 5: arr.push(statistics[key].c5); break;
      default: arr.push(0); break;
    }
  }
  var applicationCount = arr.reduce((sum, a) => { return sum + a }, 0);

  // console.log("pr " + priorities + " total " + applicationCount);




  var statArray = [];
  //statistics.map( (val,ind)=>  statArray[val.name] = { availablePlaces : val.availablePlaces, takenPlaces : val.takenPlaces});
  //    console.log(statistics);
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
    anchor: "start",
    clamp: true,
    align: "right",


  });

  const options = {


    scales: {
      x: {
        display: false
      }
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,

    plugins: {

      xAxes: { display: false },

      //statistics[kindergartens[context.dataIndex].name].availablePlaces
      // statistics[kindergartens[context.dataIndex].name].takenPlaces
      datalabels: {
        formatter: function (value, context) {
          //  console.log(context.dataIndex);
          return value + "         " +
            percentage(value, priorities, applicationCount).toFixed(1) + "%" +
            "                         " +
            statistics[labels[context.dataIndex]].availablePlaces +
            "                                          " +
            statistics[labels[context.dataIndex]].takenPlaces;
        }
      },
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: '    Darželis       Prašymų skaičius                       Laisvų vietų                     Užimtų vietų',
        align: "start"
      },
    },
  };

  function letterSort(lang, letters) {
    letters.sort(new Intl.Collator(lang).compare);
    return letters;
  }
  var labels = [];
  //  if(kindergartens !== null)
  // labels = kindergartens.map(kindergarten => kindergarten.name);
  for (let key in statistics) {
    labels.push(key);

  }

  const dataArray = labels.map(label => {
    switch (priorities) {
      case 1: return statistics[label].c1;
      case 2: return statistics[label].c2;
      case 3: return statistics[label].c3;
      case 4: return statistics[label].c4;
      case 5: return statistics[label].c5;
      default: return 0;
    }
  })
    .sort((a, b) => a < b);

  labels = letterSort('lt', labels);
  labels.sort((a, b) => {
    switch (priorities) {
      case 1: return statistics[a].c1 < statistics[b].c1;
      case 2: return statistics[a].c2 < statistics[b].c2;
      case 3: return statistics[a].c3 < statistics[b].c3;
      case 4: return statistics[a].c4 < statistics[b].c4;
      case 5: return statistics[a].c5 < statistics[b].c5;
      default: return 0;
    }

  });

  const data = {
    labels,
    datasets: [

      {
        data: dataArray,
        borderColor: 'rgb(32, 222, 12)',
        backgroundColor: 'rgba(255, 255, 255, 0)',

      },
    ],
  };



  if (statistics !== null && kindergartens !== null) return (
    <div className='mt-5'>
      <h5>Pasirinkta {priorities} prioritetu</h5>
      <Bar options={options} data={data} height="600em" width="100%" />
    </div>);
  else
    return <div>Siunčiami duomenys</div>;
}
