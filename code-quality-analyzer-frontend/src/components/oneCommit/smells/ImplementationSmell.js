import React, { useEffect, useState } from "react";
import DummyData from "../../../data/dummy.json";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
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

function ImplementationSmell() {
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
    const labels = Object.keys(
      DummyData["Implementation Smells"]["smell_distribution"]
    );
    const values = Object.values(
      DummyData["Implementation Smells"]["smell_distribution"]
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Smells",
          data: values,
          backgroundColor: [
            "rgb(64, 0, 0)",
            "rgb(0, 64, 0)",
            "rgb(0, 0, 64)",
            "rgb(64, 64, 0)",
            "rgb(64, 0, 64)",
            "rgb(0, 64, 64)",
            "rgb(128, 128, 128)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  }, []);

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: "Implementation Smells",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "left",
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
        <Doughnut
          height={"500px"}
          width={"500px"}
          data={chartData}
          options={doughnutOptions}
        />
      </div>
    </>
  );
}

export default ImplementationSmell;
