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

function DesignSmell() {
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
      DummyData["Design Smells"]["smell_distribution"]
    );
    const values = Object.values(
      DummyData["Design Smells"]["smell_distribution"]
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Smells",
          data: values,
          backgroundColor: [
            "rgb(234, 76, 137)",
            "rgb(112, 191, 83)",
            "rgb(48, 120, 227)",
            "rgb(255, 165, 2)",
            "rgb(167, 38, 171)",
            "rgb(19, 173, 102)",
            "rgb(246, 121, 55)",
            "rgb(88, 179, 247)",
            "rgb(255, 215, 0)",
            "rgb(65, 130, 64)",
            "rgb(197, 65, 132)",
            "rgb(43, 80, 120)",
            "rgb(165, 98, 42)",
            "rgb(135, 206, 250)"
          ],
        },
      ],
    });
  }, []);

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: "Design Smells",
        font: {
          size: 20,
        }
      },
      legend: {
        display: true,
        position: "top",
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
        <Doughnut style={{width: '100%'}} data={chartData} options={doughnutOptions} />
      </div>
    </>
  );
}

export default DesignSmell;
