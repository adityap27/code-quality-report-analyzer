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

function ArchitechtureEntity(props) {
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
        const labels = Object.keys(props.architectureEntityData["Architecture Smell"]["top_entities"]);
        const values = Object.values(props.architectureEntityData["Architecture Smell"]["top_entities"]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Entity Name",
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
        scales: {
          x: {
            ticks: {
              callback: function(v) {
                if(v.length > 10) {
                  return v.toString().substring(0, 1) + '...';
                }
                return v;
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Architecture Entities",
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
            <Bar height={'500px'} width={'500px'} data={chartData} options={doughnutOptions} />
          </div>
        </>
      );
}

export default ArchitechtureEntity