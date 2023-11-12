import React, { useState } from 'react'
import dummyData from '../../data/Dummy.json'
import './trend-analysis.css'
import Architechture from '../../trendAnalysis/Architechture'
import Design from '../../trendAnalysis/Design'
import Implementation from '../../trendAnalysis/Implementation'
import Test from '../../trendAnalysis/Test'
import Testability from '../../trendAnalysis/Testability'
import CommonChart from '../../trendAnalysis/CommonChart'

const TrendAnalysis = (props) => {
  const commits = Object.keys(dummyData.commit_changes)
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
        <CommonChart numberOfCommits={numberOfCommits} />
        <Architechture data={dummyData} commits={commits} />
        <Design
          data={dummyData}
          commits={commits}
          numberOfCommits={numberOfCommits}
        />
        <Implementation data={dummyData} commits={commits} />
        <Test data={dummyData} commits={commits} />
        <Testability data={dummyData} commits={commits} />
      </div>
    </div>
  )
}

export default TrendAnalysis
