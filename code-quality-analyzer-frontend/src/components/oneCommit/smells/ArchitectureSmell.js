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

function ArchitectureSmell(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Data from JSON',
        data: [],
      },
    ],
  })

  useEffect(() => {
    const labels = Object.keys(
      props.architectureSmellData['Architecture Smell']['smell_distribution']
    )
    const values = Object.values(
      props.architectureSmellData['Architecture Smell']['smell_distribution']
    )

    setChartData({
      labels,
      datasets: [
        {
          label: 'Smells',
          data: values,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(0, 0, 255)',
            'rgb(50, 205, 50)',
            'rgb(255, 255, 0)',
            'rgb(0, 128, 128)',
            'rgb(128, 0, 128)',
          ],
        },
      ],
    })
  }, [props.architectureSmellData])

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Architecture Smells',
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

export default ArchitectureSmell
