import React, { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
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

function TestabilitySmell({testabilitySmellData}) {
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
    if (testabilitySmellData && testabilitySmellData['Testability Smell']) {
    const labels = Object.keys(
      testabilitySmellData['Testability Smell']?.['smell_distribution']
    )
    const values = Object.values(
      testabilitySmellData['Testability Smell']?.['smell_distribution']
    )

    const backgroundColor = labels.map(() => getRandomColor());

    setChartData({
      labels,
      datasets: [
        {
          label: 'Smells',
          data: values,
          backgroundColor,
          hoverOffset: 4,
        },
      ],
    })
  }
  }, [testabilitySmellData])

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Testability Smells',
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'left',
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
        <Doughnut
          height={'500px'}
          width={'500px'}
          data={chartData}
          options={doughnutOptions}
        />
      </div>
    </>
  )
}

export default TestabilitySmell
