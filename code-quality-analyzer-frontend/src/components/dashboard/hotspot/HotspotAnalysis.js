import React, { useContext } from 'react'
import './hotspot-analysis.css'
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
import api from '../../../utils/api'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Loader from '../../loader/Loader'
import { HotspotAnalysisContext } from '../../../HotspotAnalysisContext'
import HotspotChart from '../../hotspot/HotspotChart'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function HotspotAnalysis() {
  const { hotspotAnalysisData, setHotspotAnalysisData } = useContext(
    HotspotAnalysisContext
  )
  const [isLoading, setIsLoading] = useState(false)
  const [repoLink, setRepoLink] = useState(localStorage.getItem('repoLink'))
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [branch, setBranch] = useState()
  const { fetchBranches } = api()
  const Sbranch = JSON.parse(localStorage.getItem('branch') || '{}')

  useEffect(() => {
    const currentRepoLink = localStorage.getItem('repoLink')
    if (!hotspotAnalysisData || currentRepoLink !== repoLink) {
      const currentBranchString = localStorage.getItem('branch')
      const currentBranchObject = currentBranchString
        ? JSON.parse(currentBranchString)
        : null
      const currentBranchValue = currentBranchObject
        ? currentBranchObject.value
        : ''
      const commitId = localStorage.getItem('commitId')

      const requestData = {
        gitRepoLink: currentRepoLink,
        branch: currentBranchValue,
        commitId: commitId,
      }

      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/hotspot/getanalysis',
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
            setHotspotAnalysisData(response.data)
          }
        })
        .catch((error) => {})

      setRepoLink(currentRepoLink)
    }
    setSelectedBranch(Sbranch)
    localStorage.setItem('branch', JSON.stringify(Sbranch))
    fetchB()
  }, [])

  const fetchB = async () => {
    var B = await fetchBranches(repoLink)
    setBranch(B)
  }

  const handleExecuteQuery = () => {
    setIsLoading(true)
    const requestData = {
      gitRepoLink: repoLink,
      branch: selectedBranch.value,
    }
    console.log(requestData)
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + '/hotspot/getanalysis',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
          setHotspotAnalysisData(response.data)
          setSelectedBranch(selectedBranch);
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-content">
            <p>Updating Analysis</p>
          </div>
        </div>
      )}
      {!isLoading && hotspotAnalysisData && (
        <div>
          <div className="hotspot">
            <div className="hotspot-heading">
              <h1>Hotspot Analysis</h1>
            </div>
            <div className="dropdown-dropdowns">
              <div className="branch-dropdowns">
                <h4>Branches:</h4>
                <Select
                  value={selectedBranch}
                  onChange={(option) => {
                    setSelectedBranch(option)
                  }}
                  options={branch}
                  isSearchable={true}
                  placeholder="Branch..."
                />

                <button
                  className={`trend_button ${isLoading ? 'loading' : ''}`}
                  onClick={handleExecuteQuery}
                  disabled={isLoading}
                >
                  Update Analysis
                </button>
              </div>
            </div>

            <div className="charts">
              <HotspotChart hotspotAnalysisData={hotspotAnalysisData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HotspotAnalysis
