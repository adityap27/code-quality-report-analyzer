// import React, { useContext, useState } from 'react'
// import './trend-analysis.css'
// import Architechture from '../../trendAnalysis/Architechture'
// import Design from '../../trendAnalysis/Design'
// import Implementation from '../../trendAnalysis/Implementation'
// import Test from '../../trendAnalysis/Test'
// import Testability from '../../trendAnalysis/Testability'
// import CommonChart from '../../trendAnalysis/CommonChart'
// import { useLocation } from 'react-router-dom'
// import { TrendAnalysisContext } from '../../../TrendAnalysisContext'

// const TrendAnalysis = (props) => {
//   const {trendAnalysisData} = useContext(TrendAnalysisContext
//   )
//   console.log("trendAnalysisData",trendAnalysisData);
//   const location = useLocation()
//   const data = location.state
//   console.log("Branches", props.branches || []);
//   console.log("data>>>>>>>>>>>>>>>",data);

//   const commits = trendAnalysisData?.commit_changes ?  Object.keys(trendAnalysisData.commit_changes) : [];
//   console.log("commits>>>>>>>>>>>>>>>",commits);
//   const [selectedBranch, setSelectedBranch] = useState('')
//   const [numberOfCommits, setNumberOfCommits] = useState(20)
//   const [selectedUser, setSelectedUser] = useState('')

//   const handleBranchChange = (event) => {
//     setSelectedBranch(event.target.value)
//   }

//   const handleUserChange = (event) => {
//     setSelectedUser(event.target.value)
//   }

//   const handleCommitsChange = (event) => {
//     setNumberOfCommits(parseInt(event.target.value))
//   }

//   return (
//     <div className="trend-analysis-container">
//       <div className="trend-heading">
//         <h1>Code Smell Trend Analysis</h1>
//       </div>
//       <div className="branch commits-dropdown dropdown-container">
//         <div className="branch-container">
//           <h4>Branches:</h4>
//           <select name="" id="" onChange={handleBranchChange}>
//             <option value="default">Select Branch</option>
//             {props?.branches?.map((branch) => (
//               <option key={branch.id} value={branch.name}>
//                 {branch.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="commits-container">
//           <h4>Number of Commits:</h4>
//           <select name="" id="" onChange={handleCommitsChange}>
//             {[...Array(10)].map((_, index) => (
//               <option key={index} value={index + 1}>
//                 {index + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="trend-smell-charts">
//         <CommonChart data={trendAnalysisData} numberOfCommits={numberOfCommits} />
//         <Architechture
//           data={trendAnalysisData}
//           commits={commits}
//           numberOfCommits={numberOfCommits}
//         />
//         <Design
//           data={trendAnalysisData}
//           commits={commits}
//           numberOfCommits={numberOfCommits}
//         />
//         <Implementation
//           data={trendAnalysisData}
//           commits={commits}
//           numberOfCommits={numberOfCommits}
//         />
//         <Test data={trendAnalysisData} commits={commits} numberOfCommits={numberOfCommits} />
//         <Testability
//           data={trendAnalysisData}
//           commits={commits}
//           numberOfCommits={numberOfCommits}
//         />
//       </div>
//     </div>
//   )
// }

// export default TrendAnalysis

import React, { useContext, useEffect, useState } from 'react'
import './trend-analysis.css'
import Architechture from '../../trendAnalysis/Architechture'
import Design from '../../trendAnalysis/Design'
import Implementation from '../../trendAnalysis/Implementation'
import Test from '../../trendAnalysis/Test'
import Testability from '../../trendAnalysis/Testability'
import CommonChart from '../../trendAnalysis/CommonChart'
import { TrendAnalysisContext } from '../../context/TrendAnalysisContext'
import axios from 'axios'

const TrendAnalysis = (props) => {
  const { trendAnalysisData, setTrendAnalysisData } =
    useContext(TrendAnalysisContext)
  const [isLoading, setIsLoading] = useState(false)
  console.log('trendAnalysisData', trendAnalysisData)
  const [repoLink, setRepoLink] = useState(localStorage.getItem('repoLink'))

  useEffect(() => {
    const currentRepoLink = localStorage.getItem('repoLink')
    if (!trendAnalysisData || currentRepoLink !== repoLink) {
      setIsLoading(true)

      const branch = localStorage.getItem('branch')
      const maxCommits = localStorage.getItem('maxCommits')

      const requestData = {
        gitRepoLink: currentRepoLink,
        branch: branch,
        noOfCommits: maxCommits,
      }

      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + '/trend/getanalysis',
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
            setTrendAnalysisData(response.data)
          }
          console.log('Trend analysis data:', response.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.error('Failed to fetch trend analysis data:', error)
          // Handle error as needed
        })

      setRepoLink(currentRepoLink)
    }
  }, [trendAnalysisData, setTrendAnalysisData, repoLink])
  // const location = useLocation()
  // const data = location.state
  // console.log("Branches", props.branches || []);
  // console.log("data>>>>>>>>>>>>>>>",data);

  const commits = trendAnalysisData?.commit_changes
    ? Object.keys(trendAnalysisData.commit_changes)
    : []
  // console.log("commits>>>>>>>>>>>>>>>",commits);

  const [selectedBranch, setSelectedBranch] = useState('')
  const [numberOfCommits, setNumberOfCommits] = useState(20)
  const [selectedUser, setSelectedUser] = useState('')

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value)
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleCommitsChange = (event) => {
    setNumberOfCommits(parseInt(event.target.value))
  }

  return (
    <>
      {
      !isLoading ? (
        trendAnalysisData && (
          <div className="trend-analysis-container">
            <div className="trend-heading">
              <h1>Code Smell Trend Analysis</h1>
            </div>
            <div className="branch commits-dropdown dropdown-container">
              <div className="branch-container">
                <h4>Branches:</h4>
                <select name="" id="" onChange={handleBranchChange}>
                  <option value="default">Select Branch</option>
                  {props?.branches?.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="commits-container">
                <h4>Number of Commits:</h4>
                <select name="" id="" onChange={handleCommitsChange}>
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="trend-smell-charts">
              <CommonChart
                data={trendAnalysisData}
                numberOfCommits={numberOfCommits}
              />
              <Architechture
                data={trendAnalysisData}
                commits={commits}
                numberOfCommits={numberOfCommits}
              />
              <Design
                data={trendAnalysisData}
                commits={commits}
                numberOfCommits={numberOfCommits}
              />
              <Implementation
                data={trendAnalysisData}
                commits={commits}
                numberOfCommits={numberOfCommits}
              />
              <Test
                data={trendAnalysisData}
                commits={commits}
                numberOfCommits={numberOfCommits}
              />
              <Testability
                data={trendAnalysisData}
                commits={commits}
                numberOfCommits={numberOfCommits}
              />
            </div>
          </div>
        )
      ) : (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      )
      }
    </>
  )
}

export default TrendAnalysis
