import React from 'react';
import { Line } from 'react-chartjs-2';
import dummyData from "../../data/Dummy.json"; // Import your dummy data

import './trend-analysis.css';

const TrendAnalysis = () => {
  // Process your dummy data to prepare it for the chart
  const commits = Object.keys(dummyData.commit_changes);

  // Extract code smell names from the first commit
  const codeSmellNames = Object.keys(dummyData.commit_changes[commits[0]]);

  const data = {
    labels: commits,
    datasets: codeSmellNames.map((smellName) => ({
      label: smellName,
      data: commits.map((commit) => dummyData.commit_changes[commit][smellName].total_smells),
      fill: false,
      borderColor: getRandomColor(),
    })),
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="trend-analysis-container">
      <h1>Code Smell Trend Analysis</h1>
      <div className="line-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TrendAnalysis;

// Helper function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
