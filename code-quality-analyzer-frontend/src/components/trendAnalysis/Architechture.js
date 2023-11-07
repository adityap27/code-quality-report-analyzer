// import React from 'react'
// import { Line } from 'react-chartjs-2';
// import { PropTypes } from 'prop-types';

// function Architechture(props) {
//     const commits = Object.keys(props.data.commit_changes);
//   const selectedSmell = 'Architecture Smell'; // You can make this dynamic if needed

//   const subtypes = Object.keys(props.data.commit_changes[commits[0]][selectedSmell].smell_distribution);
  
//     // Create data and options for the chart based on the selected subtype
//     // You can use the same logic as before for generating chart data
  
//     <div className="line-chart">
//       {/* Render the Line chart based on the selected subtype */}
//       {subtypes.map((subtype) => (
//         <div key={subtype}>
//           {selectedSmell === 'Architecture Smell' && (
//             <div>
//               <h2>{subtype}</h2>
//               <Line data={props.chartDataForSubtype} options={props.options} />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
// }

// Architechture.prototype = {
//     data: PropTypes.object.isRequired
// }
// export default Architechture;


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Architechture = ({ data, commits }) => {
  const [selectedSmell, setSelectedSmell] = useState('Architecture Smell');
  const [selectedSubtype, setSelectedSubtype] = useState('Feature Concentration');

  const subtypes = Object.keys(data.commit_changes[commits[0]][selectedSmell].smell_distribution);

  // Create data and options for the chart based on the selected subtype
  // You can use the same logic as before for generating chart data
  const chartDataForSubtype = {
    labels: commits,
    datasets: subtypes.map((subtype) => ({
      label: subtype,
      data: commits.map((commit) => {
        if (selectedSmell === 'Architecture Smell' && selectedSubtype === subtype) {
          return data.commit_changes[commit][selectedSmell].smell_distribution[subtype];
        }
        return 0;
      }),
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

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  return (
    <div className="chart-container">
      <h2>Architecture Smell</h2>
      
      {/* Dropdown to select the code smell type */}
      <div className="dropdown-container">
        <select value={selectedSubtype} onChange={(e) => setSelectedSubtype(e.target.value)}>
          {subtypes.map((subtype) => (
            <option key={subtype} value={subtype}>
              {subtype}
            </option>
          ))}
        </select>
      </div>

      {/* Render the Line chart based on the selected subtype */}
      {subtypes.map((subtype) => (
        <div key={subtype}>
          {selectedSubtype === subtype && (
            <Line data={chartDataForSubtype} options={options} />
          )}
        </div>
      ))}
    </div>
  );
};

Architechture.propTypes = {
  data: PropTypes.object.isRequired,
  commits: PropTypes.array.isRequired,
};

export default Architechture;
