import React, { useState } from 'react'
import './trend-analysis.css'
import Architechture from '../../trendAnalysis/Architechture'
import Design from '../../trendAnalysis/Design'
import Implementation from '../../trendAnalysis/Implementation'
import Test from '../../trendAnalysis/Test'
import Testability from '../../trendAnalysis/Testability'
import CommonChart from '../../trendAnalysis/CommonChart'
import { useLocation } from 'react-router-dom'

const TrendAnalysis = (props) => {
  const location = useLocation()
  const data = location.state
  console.log('Data', data)
  // console.log('Hello');
  const commits = Object.keys(data.commit_changes)
  // console.log(commits);
  const [selectedBranch, setSelectedBranch] = useState('')
  const [numberOfCommits, setNumberOfCommits] = useState(20)
  const [selectedUser, setSelectedUser] = useState('')

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value)
    console.log(event.target.value)
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleCommitsChange = (event) => {
    setNumberOfCommits(parseInt(event.target.value))
  }

  return (
    <div className="trend-analysis-container">
      <div className="trend-heading">
        <h1>Code Smell Trend Analysis</h1>
      </div>
      <div className="branch commits-dropdown dropdown-container">
        <div className="branch-container">
          <h4>Branches:</h4>
          <select name="" id="" onChange={handleBranchChange}>
            <option value="default">Select Branch</option>
            {props.branches?.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="commits-container">
          <h4>Number of Commits:</h4>
          <select name="" id="" onChange={handleCommitsChange}>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="trend-smell-charts">
        <CommonChart data={data} numberOfCommits={numberOfCommits} />
        <Architechture
          data={data}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
        <Design
          data={data}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
        <Implementation
          data={data}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
        <Test data={data} commits={commits} numberOfCommits={numberOfCommits} />
        <Testability
          data={data}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
      </div>
    </div>
  )
}

export default TrendAnalysis
