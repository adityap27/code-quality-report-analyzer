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

function TestEntity(props) {
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
    const topEntities = props.testEntityData["Test Smell"]["top_entities"];

    const labels = Object.keys(topEntities).map((key) => {
      const parts = key.split("||");
      const lastPart = parts[parts.length - 1];
      return lastPart;
    });

    const values = Object.values(topEntities);
    setChartData({
      labels,
      datasets: [
        {
          label: "Entity Name",
          data: values,
          backgroundColor: [
            "rgb(128, 255, 255)",
            "rgb(255, 128, 255)",
            "rgb(255, 255, 128)",
            "rgb(192, 64, 0)",
            "rgb(64, 192, 0)",
            "rgb(64, 0, 192)",
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
        text: "Test Entities",
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

export default TestEntity;
