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

function TestabilitySmell() {
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
      DummyData["Testability Smells"]["smell_distribution"]
    );
    const values = Object.values(
      DummyData["Testability Smells"]["smell_distribution"]
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Smells",
          data: values,
          backgroundColor: [
            "rgb(122, 255, 64)",
            "rgb(45, 189, 230)",
            "rgb(255, 87, 152)",
            "rgb(78, 200, 35)",
            "rgb(203, 92, 210)",
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
        text: "Testability Smells",
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

export default TestabilitySmell;
