import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import dummyData from '../data/Dummy.json'

function CommonChart(props) {
  const [data, setData] = useState({})
  const [selectedData, setSelectedData] = useState('full_repo')

  // JSON data provided
  const jsonData = dummyData

  const handleDataChange = (event) => {
    setSelectedData(event.target.value)
  }

  // useEffect(() => {
  //   // Function to prepare the data for Chart.js
  //   const prepareData = (jsonData) => {
  //     // Get the data based on the selected option
  //     const selectedChartData = jsonData[selectedData]

  //     // Extracting smell categories from the selected data
  //     const categories = Object.keys(selectedChartData['commit1']).filter(
  //       (category) => category !== 'total_smells' && category !== 'user'
  //     );
  //     // Extracting commits
  //     const commits = Object.keys(selectedChartData)

  //     const datasets = categories.map((category) => {
  //       const dataPoints = commits.map((commit) => {
  //         // Check if selectedChartData and its properties exist before accessing
  //         if (
  //           selectedChartData &&
  //           selectedChartData[commit] &&
  //           selectedChartData[commit][category]
  //         ) {
  //           return selectedChartData[commit][category].total_smells
  //         }
  //         return 0
  //       })

  //       return {
  //         label: category,
  //         data: dataPoints,
  //         backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
  //       }
  //     })

  //     setData({
  //       labels: commits,
  //       datasets: datasets,
  //     })
  //   }
  //   prepareData(jsonData)
  // }, [selectedData, jsonData])

  useEffect(() => {
    // Function to prepare the data for Chart.js
    const prepareData = (jsonData) => {
      const selectedChartData = jsonData[selectedData];
      const categories = Object.keys(selectedChartData['commit1']).filter(
        (category) => category !== 'total_smells' && category !== 'user'
      );
      const commits = Object.keys(selectedChartData).slice(0, props.numberOfCommits); // Limit commits

      const datasets = categories.map((category) => {
        const dataPoints = commits.map((commit) => {
          if (
            selectedChartData &&
            selectedChartData[commit] &&
            selectedChartData[commit][category]
          ) {
            return selectedChartData[commit][category].total_smells;
          }
          return 0;
        });

        return {
          label: category,
          data: dataPoints,
          backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        };
      });

      setData({
        labels: commits,
        datasets: datasets,
      });
    };
    prepareData(dummyData);
  }, [selectedData, props.numberOfCommits]);

  return (
    <div>
      <div className="test">
        <div className="common-heading">
          <h2>Smell Details</h2>
        </div>
        <div className="common-dropdown">
          <select onChange={handleDataChange}>
            <option value="full_repo">Full Repository</option>
            <option value="commit_changes">Commit Changes</option>
          </select>
        </div>
      </div>
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
