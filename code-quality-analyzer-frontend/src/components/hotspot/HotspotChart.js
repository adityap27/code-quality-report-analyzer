import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function HotspotChart(props) {
  const [data, setData] = useState({});
  const [selectedData, setSelectedData] = useState(props.hotspotAnalysisData.top_classes_list);

  useEffect(() => {
    const prepareData = () => {
      const selectedChartData = selectedData;

      const packages = selectedChartData.map((item) => {
        return Object.keys(item)[0];
      });

      const datasets = [
        {
          label: 'Total Smells',
          data: selectedChartData.map((item) => item[Object.keys(item)[0]].total_smells),
          backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        },
      ];

      // Extract smell distribution labels
      const smellDistributionLabels = Object.keys(selectedChartData[0][packages[0]].smell_distribution);

      // Create a dataset for each smell distribution label
      smellDistributionLabels.forEach((label) => {
        const smellDistributionData = selectedChartData.map((item) => item[Object.keys(item)[0]].smell_distribution[label]);
        datasets.push({
          label: label,
          data: smellDistributionData,
          backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        });
      });

      setData({
        labels: packages,
        datasets: datasets,
      });
    };

    prepareData();
  }, [selectedData]);

  return (
    <div>
      <div className="test">
        <div className="common-heading">
          <h2>Smell Details</h2>
        </div>
        {/* Dropdown to select the user */}
        <div className="user-dropdown">
          <select onChange={(event) => setSelectedData(props.hotspotAnalysisData[event.target.value])}>
            {props.hotspotAnalysisData &&
              Object.keys(props.hotspotAnalysisData).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div style={{ width: '1200px', marginLeft: '20px'}}>
        {data.labels && data.labels.length > 0 && (
          <Bar
            data={data}
            options={{
              scales: {
                x: { stacked: true, title: { display: true, text: 'Package' } },
                y: { stacked: true, title: { display: true, text: 'Number of Smells' } },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Hotspot Analysis',
                  font: {
                    size: 20,
                  },
                },
                legend: {
                  position: 'right',
                },
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem, data) => {
                    if (tooltipItem.datasetIndex === 0) {
                      return `Total Smells: ${tooltipItem.yLabel}`;
                    } else {
                      const datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
                      return `${datasetLabel}: ${tooltipItem.yLabel}`;
                    }
                  },
                },
              },
            }}
            height={window.innerHeight}
            width={window.innerWidth}
          />
        )}
      </div>
    </div>
  );
}

export default HotspotChart;
