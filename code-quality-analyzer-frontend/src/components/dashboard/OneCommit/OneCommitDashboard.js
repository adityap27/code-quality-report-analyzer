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

function OneCommitDashboard(props) {
  console.log(props.data);
  return (
    <>
      <div className="oneCommit">
        <div className="oneCommit-heading">
          <h1>OneCommit Analysis</h1>
        </div>
        <div className="charts">
          <div className="architechture common-chart">
            <ArchitectureSmell architectureSmellData={props.data} />
            <ArchitechtureEntity architectureEntityData={props.data} />
          </div>
          <div className="design common-chart">
            <DesignSmell designSmellData={props.data} />
            <DesignEntity designEntityData={props.data} />
          </div>
          <div className="test common-chart">
            <TestSmell testsmSmellData={props.data} />
            <TestEntity testEntityData={props.data} />
          </div>
          <div className="testability common-chart">
            <TestabilitySmell testabilitySmellData={props.data} />
            <TestabilityEntity testabilityEntityData={props.data} />
          </div>
          <div className="implementation common-chart">
            <ImplementationSmell implementationSmellData={props.data} />
            <ImplementationEntity implementationEntityData={props.data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OneCommitDashboard;