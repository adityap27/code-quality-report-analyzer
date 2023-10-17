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
          <div className="smells">
            <div className="smell-heading">
              <h2>Smells</h2>
            </div>
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
          <div className="entities">
            <div className="entities-heading">
              <h2>Entities</h2>
            </div>
            <div>
              <div className="architechture entity-common-chart">
                <ArchitechtureEntity />
              </div>
              <div className="design entity-common-chart">
                <DesignEntity />
              </div>
              <div className="test entity-common-chart">
                <TestEntity />
              </div>
              <div className="testability entity-common-chart">
                <TestabilityEntity />
              </div>
              <div className="implementation entity-common-chart">
                <ImplementationEntity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneCommitDashboard;
