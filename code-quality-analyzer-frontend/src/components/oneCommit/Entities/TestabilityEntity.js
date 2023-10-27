import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TestabilityEntity(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Data from JSON",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const topEntities = props.testabilityEntityData["Testability Smell"]["top_entities"];
    const values = Object.values(topEntities);

    const labels = Object.keys(topEntities).map((key) => {
      const parts = key.split("||");
      const lastPart = parts[parts.length - 1];
      return lastPart;
    });


    setChartData({
      labels,
      datasets: [
        {
          label: "Entity Name",
          data: values,
          backgroundColor: [
            "rgb(255, 128, 0)",
            "rgb(128, 255, 0)",
            "rgb(128, 0, 255)",
            "rgb(0, 128, 255)",
            "rgb(255, 0, 128)",
            "rgb(0, 255, 128)",
          ],
        },
      ],
    });
  }, []);

  const doughnutOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (v) {
            if (v.length > 10) {
              return v.toString().substring(0, 1) + "...";
            }
            return v;
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Testability Entities",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };
  return (
    <>
      <div>
        <Bar
          height={"500px"}
          width={"500px"}
          data={chartData}
          options={doughnutOptions}
        />
      </div>
    </>
  );
}

export default TestabilityEntity;