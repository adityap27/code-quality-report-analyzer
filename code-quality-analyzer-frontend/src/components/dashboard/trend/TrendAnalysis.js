import React, { useState } from 'react'
import './trend-analysis.css'
import Architechture from '../../trendAnalysis/Architechture'
import Design from '../../trendAnalysis/Design'
import Implementation from '../../trendAnalysis/Implementation'
import Test from '../../trendAnalysis/Test'
import Testability from '../../trendAnalysis/Testability'
import CommonChart from '../../trendAnalysis/CommonChart'

const TrendAnalysis = (props) => {
  const commits = Object.keys(props.data.commit_changes)
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
            {[...Array(5)].map((_, index) => (
              <option key={index} value={index * 5 + 5}>
                {index * 5 + 5}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="trend-smell-charts">
        <CommonChart data={props.data} numberOfCommits={numberOfCommits} />
        <Architechture data={props.data} commits={commits} />
        <Design
          data={props.data}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
        <Implementation data={props.data} commits={commits} />
        <Test data={props.data} commits={commits} />
        <Testability data={props.data} commits={commits} />
      </div>
    </div>
  )
}

export default TrendAnalysis
