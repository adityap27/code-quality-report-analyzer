import React from "react";
import "./one-commit-dashboard.css";
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
import ArchitectureSmell from "../../oneCommit/Smells/ArchitectureSmell";
import DesignSmell from "../../oneCommit/Smells/DesignSmell";
import TestSmell from "../../oneCommit/Smells/TestSmell";
import TestabilitySmell from "../../oneCommit/Smells/TestabilitySmell";
import ImplementationSmell from "../../oneCommit/Smells/ImplementationSmell";
import ArchitechtureEntity from "../../oneCommit/Entities/ArchitechtureEntity";
import DesignEntity from "../../oneCommit/Entities/DesignEntity";
import TestEntity from "../../oneCommit/Entities/TestEntity";
import TestabilityEntity from "../../oneCommit/Entities/TestabilityEntity";
import ImplementationEntity from "../../oneCommit/Entities/ImplementationEntity";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function OneCommitDashboard() {
  return (
    <>
      <div className="oneCommit">
        <div className="oneCommit-heading">
          <h1>OneCommit Analysis</h1>
        </div>
        <div className="charts">
          <div className="architechture common-chart">
            <ArchitectureSmell />
            <ArchitechtureEntity />
          </div>
          <div className="design common-chart">
            <DesignSmell />
            <DesignEntity />
          </div>
          <div className="test common-chart">
            <TestSmell />
            <TestEntity />
          </div>
          <div className="testability common-chart">
            <TestabilitySmell />
            <TestabilityEntity />
          </div>
          <div className="implementation common-chart">
            <ImplementationSmell />
            <ImplementationEntity />
          </div>
        </div>
      </div>
    </>
  );
}

export default OneCommitDashboard;
