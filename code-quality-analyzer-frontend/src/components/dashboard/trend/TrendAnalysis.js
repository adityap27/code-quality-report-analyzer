// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import dummyData from '../../data/Dummy.json';
// import './trend-analysis.css';

// const TrendAnalysis = () => {
//   const [selectedSmell, setSelectedSmell] = useState('Design Smell');
//   const [selectedSubtype, setSelectedSubtype] = useState('Unutilized Abstraction');

//   const commits = Object.keys(dummyData.commit_changes);

//   const codeSmellNames = Object.keys(dummyData.commit_changes[commits[0]]);
//   const subtypes = codeSmellNames.includes(selectedSmell)
//     ? Object.keys(dummyData.commit_changes[commits[0]][selectedSmell].smell_distribution)
//     : [];

//   const chartData = {
//     labels: commits,
//     datasets: [
//       {
//         label: selectedSubtype,
//         data: commits.map((commit) => {
//           if (codeSmellNames.includes(selectedSmell)) {
//             return dummyData.commit_changes[commit][selectedSmell].smell_distribution[selectedSubtype];
//           }
//           return 0;
//         }),
//         fill: false,
//         borderColor: getRandomColor(),
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   const handleSmellChange = (event) => {
//     setSelectedSmell(event.target.value);
//   };

//   const handleSubtypeChange = (event) => {
//     setSelectedSubtype(event.target.value);
//   };

//   return (
//     <div className="trend-analysis-container">
//       <h1>Code Smell Trend Analysis</h1>

//       {/* Dropdown to select the code smell type */}
//       <div className="dropdown-container">
//         <select value={selectedSmell} onChange={handleSmellChange}>
//           {codeSmellNames.map((smell) => (
//             <option key={smell} value={smell}>
//               {smell}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Dropdown to select the code smell subtype */}
//       <div className="dropdown-container">
//         <select value={selectedSubtype} onChange={handleSubtypeChange}>
//           {subtypes.map((subtype) => (
//             <option key={subtype} value={subtype}>
//               {subtype}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="line-chart">
//         <Line data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };

// export default TrendAnalysis;

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

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
      {/* Render the Architecture Chart component */}
      <Architechture data={dummyData} commits={commits} />
      
      {/* Render the Design Chart component */}
      <Design data={dummyData} commits={commits} />
      <Implementation data={dummyData} commits={commits} />
      <Test data={dummyData} commits={commits} />
      <Testability data={dummyData} commits={commits} />
      </div>
    </div>
  );
};

export default TrendAnalysis;
