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
import api from '../../../utils/api'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function OneCommitDashboard() {
  const { analysisData, setAnalysisData } = useContext(OneCommitAnalysisContext);
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [branch, setBranch] = useState();
  const [commits, setCommits] = useState();
  const { fetchBranches, fetchCommits } = api()
  const [selectedCommit, setSelectedCommit] = useState(null)
  const location = useLocation();
  const { state } = location;
  const { aData, Link, Sbranch, Scommit, AllCommits } = state


  useEffect(() => {
    setAnalysisData(aData)
    setSelectedBranch(Sbranch)
    setSelectedCommit(Scommit)
    setCommits(AllCommits)
    fetchB();
    fetchC();
  }, []);

  const fetchB = async () => {
    var B = await fetchBranches(Link);
    setBranch(B)
  }
  
  const fetchC = async () => {
    console.log(Link, selectedBranch);
    if (selectedBranch) {
      var C = await fetchCommits(Link, selectedBranch);
      setSelectedCommit(C[0])
      console.log(C)
      setCommits(C)
    }
  }

  const handleExecuteQuery = () => {
    const selcommitSHA = selectedCommit.value;
    const requestData = {
      gitRepoLink: Link,
      branch: selectedBranch.value,
      commitId: selcommitSHA,
    };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/onecommit/getanalysis', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAnalysisData(response.data);
          console.log('Analysis Data after API call:', response.data);
        }
      });
  };

  return (
    <>
      <div className="oneCommit">
        <div className="oneCommit-heading">
          <h1>OneCommit Analysis</h1>
        </div>
        <div className="dropdown-dropdowns">
          <div className="branch-dropdowns">
            <h4>Branches:</h4>
            <Select
              value={selectedBranch}
              onChange={(option) => { setSelectedBranch(option); fetchC(); }}
              options={branch}
              isSearchable={true}
              placeholder=" Branch..."
            />
          </div>
          <div className="commits-dropdowns">
            <h4>Commits:</h4>
            <Select
              value={selectedCommit}
              onChange={(option) => { setSelectedCommit(option); handleExecuteQuery(); }}
              options={commits}
              isSearchable={true}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              placeholder="Commit..."
            />

          </div>
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

  );
};

export default OneCommitDashboard