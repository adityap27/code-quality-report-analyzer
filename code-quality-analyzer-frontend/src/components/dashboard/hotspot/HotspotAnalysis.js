import React, { useContext } from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
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
import { useLocation } from 'react-router-dom'
import axios from 'axios'
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
  const [commits, setCommits] = useState()
  const { fetchBranches, fetchCommits } = api()
  const [selectedCommit, setSelectedCommit] = useState(null)
  const location = useLocation()
  const { state } = location
  const Sbranch = JSON.parse(localStorage.getItem('branch') || '{}')
  const Scommit = localStorage.getItem('commitId')
  const AllCommits = JSON.parse(localStorage.getItem('allCommits') || '[]')

  useEffect(() => {
    const currentRepoLink = localStorage.getItem('repoLink')
    if (!hotspotAnalysisData || currentRepoLink !== repoLink) {
      setIsLoading(true)

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
        .catch((error) => {
          setIsLoading(false)
        })

      setRepoLink(currentRepoLink)
    }
  }, [])

  return (
    <>
      <div className="hotspot">
        <div className="oneCommit-heading">
          {/* <h1>Hotspot Analysis</h1> */}
        </div>

        {!isLoading ? (
          hotspotAnalysisData && (
            <div className="charts">
              <HotspotChart hotspotAnalysisData={hotspotAnalysisData} />
            </div>
          )
        ) : (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default HotspotAnalysis
