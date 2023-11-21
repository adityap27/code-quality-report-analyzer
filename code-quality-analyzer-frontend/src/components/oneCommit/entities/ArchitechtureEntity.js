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

function ArchitechtureEntity({ architectureEntityData }) {
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
    if (architectureEntityData && architectureEntityData['Architecture Smell']) {
    const labels = Object.keys(
      architectureEntityData['Architecture Smell']?.['top_entities']
    )
    const values = Object.values(
      architectureEntityData['Architecture Smell']?.['top_entities']
    )

    const backgroundColor = labels.map(() => getRandomColor());

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Architecture Entities',
          data: values,
          backgroundColor
        },
      ],
    })
  }
  }, [architectureEntityData])

  const doughnutOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (v) {
            if (v.length > 10) {
              return v.toString().substring(0, 1) + '...'
            }
            return v
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Architecture Entities',
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

export default ArchitechtureEntity
