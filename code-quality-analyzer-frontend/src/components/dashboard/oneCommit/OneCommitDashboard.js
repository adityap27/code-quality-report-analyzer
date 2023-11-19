import React, { useContext, useState, useEffect } from 'react'
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
import axios from 'axios'

function OneCommitDashboard() {
  const { analysisData, setAnalysisData } = useContext(OneCommitAnalysisContext)
  const [isLoading, setIsLoading] = useState(false)
  const [repoLink, setRepoLink] = useState(localStorage.getItem('repoLink'))
  console.log("Analysis Data", analysisData);



  useEffect(() => {
    const currentRepoLink = localStorage.getItem('repoLink')
    if (!analysisData || currentRepoLink !== repoLink) {
      setIsLoading(true)

      const branch = localStorage.getItem('branch')
      const commitId = localStorage.getItem('commitId')

      const requestData = {
        gitRepoLink: currentRepoLink,
        branch: branch,
        commitId: commitId,
      }

      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/onecommit/getanalysis',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setIsLoading(false)
          if (response.status === 200) {
            setAnalysisData(response.data)
          }
          console.log('OneCommit analysis data:', response.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.error('Failed to fetch trend analysis data:', error)
          // Handle error as needed
        })

      setRepoLink(currentRepoLink)
    }
  }, [repoLink])


  return (
    <>
    {
      isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
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
      )
    }
      
    </>
  )
}

export default OneCommitDashboard
