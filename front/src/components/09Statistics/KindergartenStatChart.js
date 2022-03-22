import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const KindergartenStatChart = ({
  kindergartens,
  statistics,
  priorities,
}) => {
  if (priorities === 0) return <></>;

  const percentage = (val, priority, applicationCount) => {
    if (applicationCount === 0) return 0;
    //if (val !== 0)
    return 100 * (val / applicationCount);
  };

  function letterSort(lang, letters) {
    letters.sort(new Intl.Collator(lang).compare);
    return letters;
  }

  let applicationCountArr = [];
  let availablePlacesCountArr = [];
  let takenPlacesCountArr = [];
  for (let key in statistics) {
    availablePlacesCountArr.push(statistics[key].occupiedPlaces);
    takenPlacesCountArr.push(statistics[key].takenPlaces);
    switch (priorities) {
      case 1:
        applicationCountArr.push(statistics[key].c1);
        break;
      case 2:
        applicationCountArr.push(statistics[key].c2);
        break;
      case 3:
        applicationCountArr.push(statistics[key].c3);
        break;
      case 4:
        applicationCountArr.push(statistics[key].c4);
        break;
      case 5:
        applicationCountArr.push(statistics[key].c5);
        break;
      default:
        applicationCountArr.push(0);
        break;
    }
  }
  var applicationCount = applicationCountArr.reduce((sum, a) => {
    return sum + a;
  }, 0);
  var takenPlacesCount = takenPlacesCountArr.reduce((sum, a) => {
    return sum + a;
  }, 0);
  var availablePlacesCount = availablePlacesCountArr.reduce((sum, a) => {
    return sum + a;
  }, 0);
  var maxNumber = (
    Math.max(applicationCount, takenPlacesCount, availablePlacesCount) + ""
  ).length;

  function addSpaces(val, step) {
    let spaces = "";

    for (let i = 0; i < step + maxNumber - (val + "").length; i++) {
      spaces += " ";
    }
    return spaces;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  ChartJS.defaults.set("plugins.datalabels", {
    color: "black",
    anchor: "start",
    clamp: true,
    align: "right",
  });

  const options = {
    scales: {
      x: {
        display: false,
      },
    },
    indexAxis: "y",
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
          return (
            addSpaces(value, 0) +
            value +
            "         " +
            addSpaces(
              percentage(value, priorities, applicationCount).toFixed(1),
              1
            ) +
            addSpaces(
              percentage(value, priorities, applicationCount).toFixed(1),
              1
            ) +
            percentage(value, priorities, applicationCount).toFixed(1) +
            "%" +
            "                         " +
            addSpaces(
              statistics[labels[context.dataIndex]].availablePlaces,
              0
            ) +
            statistics[labels[context.dataIndex]].availablePlaces +
            addSpaces(
              statistics[labels[context.dataIndex]].availablePlaces,
              0
            ) +
            "                                          " +
            addSpaces(statistics[labels[context.dataIndex]].takenPlaces, 0) +
            statistics[labels[context.dataIndex]].takenPlaces
          );
        },
      },
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text:
          "    Darželis       Prašymų skaičius " +
          addSpaces(maxNumber) +
          "                      Laisvų vietų" +
          addSpaces(maxNumber) +
          "                     Užimtų vietų",
        align: "start",
      },
    },
  };

  var labels = [];
  //  if(kindergartens !== null)
  // labels = kindergartens.map(kindergarten => kindergarten.name);
  for (let key in statistics) {
    labels.push(key);
  }

  const dataArray = labels
    .map((label) => {
      switch (priorities) {
        case 1:
          return statistics[label].c1;
        case 2:
          return statistics[label].c2;
        case 3:
          return statistics[label].c3;
        case 4:
          return statistics[label].c4;
        case 5:
          return statistics[label].c5;
        default:
          return 0;
      }
    })
    .sort((a, b) => a < b);

  labels = letterSort("lt", labels);
  labels.sort((a, b) => {
    switch (priorities) {
      case 1:
        return statistics[b].c1 - statistics[a].c1;
      case 2:
        return statistics[b].c2 - statistics[a].c2;
      case 3:
        return statistics[b].c3 - statistics[a].c3;
      case 4:
        return statistics[b].c4 - statistics[a].c4;
      case 5:
        return statistics[b].c5 - statistics[a].c5;
      default:
        return 0;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        data: dataArray.sort((a, b) => b - a),
        borderColor: "rgb(32, 222, 12)",
        backgroundColor: "rgba(255, 255, 255, 0)",
      },
    ],
  };

  if (statistics !== null && kindergartens !== null)
    return (
      <div className="mt-5">
        <h5>Pasirinkta {priorities} prioritetu</h5>
        <Bar options={options} data={data} height="600em" width="100%" />
      </div>
    );
  else return <h6 className="pt-5">Informacija ruošiama</h6>;
};
