import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

function CommonChart(props) {
  const [data, setData] = useState({})
  console.log('>>>>>>>>>', props.data)
  const [selectedData, setSelectedData] = useState(props.data.full_repo);

  const users = [...new Set(Object.values(selectedData).map((category) => {
    return category.user
  }))];

  console.log(users);

  const [selectedUser, setSelectedUser] = useState(users[0]);
  console.log('Selected Data', selectedData)

  // JSON data provided
  const jsonData = props.data
  console.log('JSON Data', jsonData)

  const handleDataChange = (event) => {
    setSelectedData(props.data[event.target.value])
    // console.log(props.data.event.target.value);
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  

  useEffect(() => {
    const prepareData = () => {
      const selectedChartData = selectedData
      // console.log(typeof selectedChartData);
      const cat = [];
      Object.values(selectedChartData).map((category) => {
    
        cat.push(Object.keys(category).filter(
          (category) => category !== 'total_smells' && category !== 'user'
        ));
      })
      console.log('Selected Chart Data', new Set(cat.flat()))
      const categories = [...new Set(cat.flat())];
      console.log('cate',categories);
      const commits = Object.keys(selectedChartData).slice(
        0,
        props.numberOfCommits
      ) // Limit commits
      // console.log('commits',commits);
      
      const datasets = categories.map((category) => {
        const dataPoints = commits.map((commit) => {
          console.log('fjhjfheh', selectedUser);
          if (
            selectedChartData &&
            selectedChartData[commit] &&
            selectedChartData[commit][category] &&
            selectedChartData[commit].user === selectedUser
          ) {
            // console.log('********',category, selectedChartData[commit]);
            return selectedChartData[commit][category].total_smells
          }
          return 0
        })
        // console.log('dataPoints',dataPoints);

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
  }, [selectedData, props.numberOfCommits, selectedUser])

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
        {/* Dropdown to select the user */}
        <div className="user-dropdown">
          <select onChange={handleUserChange}>
            {
              users.map((user) => {
                return <option key={user} value={user}>{user}</option>
              })
            }
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
