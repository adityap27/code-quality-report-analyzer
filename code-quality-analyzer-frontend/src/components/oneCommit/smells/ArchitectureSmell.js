import React, { useEffect, useState } from "react";
import DummyData from "../../../Data/dummy.json";
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

function ArchitectureSmell() {
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
      DummyData["Architecture Smells"]["smell_distribution"]
    );
    const values = Object.values(
      DummyData["Architecture Smells"]["smell_distribution"]
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
        },
      ],
    });
  }, []);

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: "Architecture Smells",
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  return (
    <>
      <div>
        <Doughnut data={chartData} options={doughnutOptions} />
      </div>
    </>
  );
}

export default ArchitectureSmell;
