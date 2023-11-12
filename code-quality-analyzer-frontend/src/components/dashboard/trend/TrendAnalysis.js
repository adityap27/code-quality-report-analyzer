import React, { useState } from 'react';
import dummyData from '../../data/Dummy.json';
import './trend-analysis.css';
import Architechture from '../../trendAnalysis/Architechture';
import Design from '../../trendAnalysis/Design';
import Implementation from '../../trendAnalysis/Implementation';
import Test from '../../trendAnalysis/Test';
import Testability from '../../trendAnalysis/Testability';
import CommonChart from '../../trendAnalysis/CommonChart';

const TrendAnalysis = (props) => {
  const commits = Object.keys(dummyData.commit_changes);
  const [selectedBranch, setSelectedBranch] = useState(''); // State for selecting branch

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="trend-analysis-container">
      <div className="trend-heading">
      <h1>Code Smell Trend Analysis</h1>
      </div>
      <div className="branch dropdown-container">
        <select name="" id="" onChange={handleBranchChange}>
          <option value="default">Select Branch</option>
          <option value="master">Master</option>
          <option value="main">Main</option>
        </select>
      </div>
      
      <div className="trend-smell-charts">
        <CommonChart/>
      <Architechture data={dummyData} commits={commits} />
      <Design data={dummyData} commits={commits} />
      <Implementation data={dummyData} commits={commits} />
      <Test data={dummyData} commits={commits} />
      <Testability data={dummyData} commits={commits} />
      </div>
    </div>
  );
};

export default TrendAnalysis;
