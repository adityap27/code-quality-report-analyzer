import React, { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function DesignEntity({designEntityData}) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Data from JSON',
        data: [],
      },
    ],
  })

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
   }

  useEffect(() => {
    const topEntities = designEntityData?.['Design Smell']?.['top_entities'];
  
    // Check if topEntities is defined and not null
    if (topEntities) {
      const labels = Object.keys(topEntities).map((key) => {
        const parts = key.split('||');
        const lastPart = parts[parts.length - 1];
        return lastPart;
      });
  
      const values = Object.values(topEntities);
      
      // Ensure labels is an array before using map
      if (Array.isArray(labels)) {
        const backgroundColor = labels.map(() => getRandomColor());
  
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Design Entity',
              data: values,
              backgroundColor,
            },
          ],
        });
      }
    }
  }, [designEntityData]);
  

  const doughnutOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (v) {
            if (v.length > 10) {
              return v.toString().substring(0, 10) + '...'
            }
            return v
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Design Entities',
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <>
      <div>
        <Bar
          height={'500px'}
          width={'500px'}
          data={chartData}
          options={doughnutOptions}
        />
      </div>
    </>
  )
}

export default DesignEntity
