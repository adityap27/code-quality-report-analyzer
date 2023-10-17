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

function TestSmell() {
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
    const labels = Object.keys(DummyData["Test Smells"]["smell_distribution"]);
    const values = Object.values(
      DummyData["Test Smells"]["smell_distribution"]
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Smells",
          data: values,
          backgroundColor: [
            "rgb(0, 64, 192)",
            "rgb(192, 0, 64)",
            "rgb(0, 192, 64)",
            "rgb(128, 192, 0)",
            "rgb(128, 0, 192)",
            "rgb(0, 128, 192)"
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
        text: "Test Smells",
        font: {
          size: 20,
        }
      },
      legend: {
        display: true,
        position: "left",
        labels: {
          font: {
            size: 12,
          }
        }
      },
    },
  };
  return (
    <>
      <div>
        <Doughnut height={'500px'} width={'500px'} data={chartData} options={doughnutOptions} />
      </div>
    </>
  );
}

export default TestSmell;
