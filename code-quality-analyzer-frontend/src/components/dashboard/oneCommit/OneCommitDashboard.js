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
  const[analysisData,setAnalysisData] = useState()
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [branch, setBranch] = useState();
  const [commits, setCommits] = useState();
  const { fetchBranches,fetchCommits } = api()
  const [selectedCommit, setSelectedCommit] = useState(null)
  const location = useLocation();
  const {state}=location;
  const {AnalysisData,Link,Sbranch,Scommit}=state
  
  setAnalysisData(AnalysisData)
  // console.log(state.selectedbranch);
  useEffect(() => {
    fetchBranch();
    fetchCommit();
  }, []);
  
  const fetchBranch = async () => {
    const b = await fetchBranches(Link);
    setBranch(b);
    console.log(b); // Log the updated value here
  };

  const fetchCommit = async () => {
    console.log(selectedBranch);
    const c = await fetchCommits(Link,Sbranch);
    setCommits(c);
    console.log(c); // Log the updated value here
  };

  const handleExecuteQuery=()=>{
    const selcommitSHA = selectedCommit.value
      const requestData = {
        RepoLink: Link,
        branch: selectedBranch.value,
        commitId: selcommitSHA,
      }
      //to make the one-commit api request
      axios
        .post(process.env.REACT_APP_BACKEND_URL+'/onecommit/getanalysis', requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          
          if (response.status === 200) {
            setAnalysisData(response.data)
            
        }})
        
  }

  return (
    <>
      <div className="oneCommit">
        <div className="oneCommit-heading">
          <h1>OneCommit Analysis</h1>
        </div>
        <div className="branch commits-dropdown dropdown-container">
        <div className="branch-container">
          <h4>Branches:</h4>
        <select name="" id=""
                      value={Sbranch}
                      onChange={(option)=>{setSelectedBranch(option)}}
                      options={branch}
                      isSearchable={true}
                      placeholder=" Branch..."
                    ></select>
                    </div>
                          <div className="commits-container">
                          <h4>Number of Commits:</h4>
                    <select name="" id=""
                            value={Scommit}
                            onChange={(option) => {setSelectedCommit(option) ; handleExecuteQuery();}}
                            options={commits}
                            isSearchable={true}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            placeholder="Commit..."
                          ></select>

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
  )
}

export default OneCommitDashboard
