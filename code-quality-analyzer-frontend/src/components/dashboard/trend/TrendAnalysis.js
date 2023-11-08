import React from 'react';
import dummyData from '../../data/Dummy.json';
import './trend-analysis.css';
import Architechture from '../../trendAnalysis/Architechture';
import Design from '../../trendAnalysis/Design';
import Implementation from '../../trendAnalysis/Implementation';
import Test from '../../trendAnalysis/Test';
import Testability from '../../trendAnalysis/Testability';

const TrendAnalysis = () => {
  const commits = Object.keys(dummyData.commit_changes);
  
  return (
    <div className="trend-analysis-container">
      <h1>Code Smell Trend Analysis</h1>
      <div className="trend-smell-charts">
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
