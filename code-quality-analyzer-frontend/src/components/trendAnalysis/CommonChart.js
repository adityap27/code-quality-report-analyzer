import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import dummyData from '../data/Dummy.json'

function CommonChart() {
  const [data, setData] = useState({})
  const [selectedData, setSelectedData] = useState('full_repo')

  // JSON data provided
  const jsonData = dummyData
  console.log(jsonData)

  const handleDataChange = (event) => {
    setSelectedData(event.target.value)
  }

  useEffect(() => {
    // Function to prepare the data for Chart.js
    const prepareData = (jsonData) => {
      // Get the data based on the selected option
      const selectedChartData = jsonData[selectedData]
      console.log('Selected Data', selectedChartData)

      // Extracting smell categories from the selected data
      const categories = Object.keys(selectedChartData['commit1'])
      console.log('Categories', categories)
      // Extracting commits
      const commits = Object.keys(selectedChartData)
      console.log('Commits', commits)

      const datasets = categories.map((category) => {
        const dataPoints = commits.map((commit) => {
          console.log('Hey there is a change')
          // Check if selectedChartData and its properties exist before accessing
          if (
            selectedChartData &&
            selectedChartData[commit] &&
            selectedChartData[commit][category]
          ) {
            return selectedChartData[commit][category].total_smells
          }
          // If the expected properties are missing, return a default value or handle the case
          return 0
        })

        return {
          label: category,
          data: dataPoints,
          backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        }
      })

      setData({
        labels: commits,
        datasets: datasets,
      })
    }
    prepareData(jsonData)
  }, [selectedData, jsonData])

  return (
    // <div>Hey there. I'm working</div>
    <div>
      <select onChange={handleDataChange}>
        <option value="full_repo">Full Repo</option>
        <option value="commit_changes">Commit Changes</option>
      </select>
      <div>
        {data.labels && data.labels.length > 0 && (
          <Bar
            data={data}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        )}
      </div>
    </div>
  )
}

export default CommonChart
