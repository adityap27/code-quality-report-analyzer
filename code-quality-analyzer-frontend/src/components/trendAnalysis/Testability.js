import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Testability = ({ data, commits }) => {
  const [selectedSmell, setSelectedSmell] = useState('Testability Smell');
  const [selectedSubtype, setSelectedSubtype] = useState('Excessive Dependency');
  const [selectedDataSource, setSelectedDataSource] = useState('commit_changes'); // State for selecting data source

  const subtypes = Object.keys(data[selectedDataSource][commits[0]][selectedSmell].smell_distribution);

  const chartDataForSubtype = {
    labels: commits,
    datasets: subtypes.map((subtype) => ({
      label: subtype,
      data: commits.map((commit) => {
        if (selectedSmell && selectedSubtype === subtype) {
          return data[selectedDataSource][commit][selectedSmell].smell_distribution[subtype];
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

  const handleDataSourceChange = (event) => {
    setSelectedDataSource(event.target.value);
  };

  return (
    <div className="chart-container">
        <div className="test">
      <h2>Testability Smell</h2>

      {/* Dropdown to select the data source (full_repo or commit_changes) */}
      <div className='dropdowns'>
      <div className="dropdown-container">
        <select value={selectedDataSource} onChange={handleDataSourceChange}>
          <option value="commit_changes">Commit Changes</option>
          <option value="full_repo">Full Repository</option>
        </select>
      </div>

      {/* Dropdown to select the code smell subtype */}
      <div className="dropdown-container">
        <select style={{marginLeft: '20px'}} value={selectedSubtype} onChange={(e) => setSelectedSubtype(e.target.value)}>
          {subtypes.map((subtype) => (
            <option className="option" key={subtype} value={subtype}>
              {subtype}
            </option>
          ))}
        </select>
      </div>
      </div>
      </div>

      {/* Render the Line chart based on the selected subtype and data source */}
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

Testability.propTypes = {
  data: PropTypes.object.isRequired,
  commits: PropTypes.array.isRequired,
};

export default Testability;
