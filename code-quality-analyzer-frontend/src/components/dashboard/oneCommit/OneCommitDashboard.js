import React, { useContext } from 'react'
import { OneCommitAnalysisContext } from '../../../OneCommitAnalysisContext'
import './one-commit-dashboard.css'
import 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import ArchitectureSmell from '../../oneCommit/smells/ArchitectureSmell'
import DesignSmell from '../../oneCommit/smells/DesignSmell'
import TestSmell from '../../oneCommit/smells/TestSmell'
import TestabilitySmell from '../../oneCommit/smells/TestabilitySmell'
import ImplementationSmell from '../../oneCommit/smells/ImplementationSmell'
import ArchitechtureEntity from '../../oneCommit/entities/ArchitechtureEntity'
import DesignEntity from '../../oneCommit/entities/DesignEntity'
import TestEntity from '../../oneCommit/entities/TestEntity'
import TestabilityEntity from '../../oneCommit/entities/TestabilityEntity'
import ImplementationEntity from '../../oneCommit/entities/ImplementationEntity'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function OneCommitDashboard() {
  const { analysisData } = useContext(OneCommitAnalysisContext)
  return (
    <>
      <div className="oneCommit">
        <div className="oneCommit-heading">
          <h1>OneCommit Analysis</h1>
        </div>
        <div className="charts">
          <div className="architechture common-chart">
            <ArchitectureSmell architectureSmellData={analysisData} />
            <ArchitechtureEntity architectureEntityData={analysisData} />
          </div>
          <div className="design common-chart">
            <DesignSmell designSmellData={analysisData} />
            <DesignEntity designEntityData={analysisData} />
          </div>
          <div className="test common-chart">
            <TestSmell testsmSmellData={analysisData} />
            <TestEntity testEntityData={analysisData} />
          </div>
          <div className="testability common-chart">
            <TestabilitySmell testabilitySmellData={analysisData} />
            <TestabilityEntity testabilityEntityData={analysisData} />
          </div>
          <div className="implementation common-chart">
            <ImplementationSmell implementationSmellData={analysisData} />
            <ImplementationEntity implementationEntityData={analysisData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default OneCommitDashboard
