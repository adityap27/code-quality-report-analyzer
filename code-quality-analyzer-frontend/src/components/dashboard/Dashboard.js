import React from "react";
import "./dashboard.css";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ArchitectureSmell from "../oneCommit/Smells/ArchitectureSmell";
import DesignSmell from "../oneCommit/Smells/DesignSmell";
import TestSmell from "../oneCommit/Smells/TestSmell";
import TestabilitySmell from "../oneCommit/Smells/TestabilitySmell";
import ImplementationSmell from "../oneCommit/Smells/ImplementationSmell";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  return (
    <div className="oneCommit">
      <div className="oneCommit-heading">
        <h1>OneCommit Analysis</h1>
      </div>
      <div className="charts">
        <div className="architechture common-chart">
          <ArchitectureSmell />
        </div>
        <div className="design common-chart">
          <DesignSmell />
        </div>
        <div className="test common-chart">
          <TestSmell />
        </div>
        <div className="testability common-chart">
          <TestabilitySmell />
        </div>
        <div className="implementation common-chart">
          <ImplementationSmell />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
