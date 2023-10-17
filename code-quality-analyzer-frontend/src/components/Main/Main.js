import "./main.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";



function Main() {

  const [repoLink, setRepoLink] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [commits, setCommits] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState('');

  const API_URL = `https://api.github.com`;
  const handleRepoUrlChange = (event) => {
    setRepoLink(event.target.value);
  };
  const fetchBranches = () => {
    const ownerAndRepo = repoLink.split('/').slice(-2).join('/');
    const branchUrl = `${API_URL}/repos/${ownerAndRepo}/branches`;
  
    axios
      .get(branchUrl)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const fetchCommits = () => {
    if (selectedBranch) {
      const ownerAndRepo = repoLink.split('/').slice(-2).join('/');
      const commitsUrl = `${API_URL}/repos/${ownerAndRepo}/commits?sha=${selectedBranch}`;
  
      axios
        .get(commitsUrl)
        .then((response) => {
          setCommits(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  
  /*const fetchBranches = () => {
    axios
      .get(`${API_URL}/repos${repoLink}/branches`)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchCommits = () => {
    if (selectedBranch) {
      axios
        .get(`${API_URL}/repos${repoLink}/commits?sha=${selectedBranch}`)
        .then((response) => {
          setCommits(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };*/

  useEffect(() => {
    if (repoLink) {
      fetchBranches();
    }
  }, [repoLink]);

  useEffect(() => {
    fetchCommits();
  }, [selectedBranch]);


 /* useEffect(() => {
    if (repoLink) {
   
      fetchGitLabData();
    }
  }, [repoLink]);
  const fetchGitLabData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:8080/onecommit/getanalysis?repoLink=${repoLink}`);
      const data = response.data;

      
      setBranches(data.branches);
      setCommits(data.commits);
    } catch (error) {
      console.error(error);
    }
  };*/



    return (
        <div className="main">
            <div className="col col1">
                <h2>Analyze Your Code Now!!!</h2>
                <p>
          <input
            type="text"
            placeholder="Insert Your GitLab Repository Link"
            value={repoLink}
            onChange={handleRepoUrlChange} />
            <button onClick={fetchBranches}>Fetch Branches</button>
        </p>
        <div className="dropdowns">
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
  <option value="">Select a branch</option>
  {branches.map((branch, index) => (
    <option key={index} value={branch.name}>
      {branch.name}
    </option>
  ))}
</select>

<select value={selectedCommit} onChange={(e) => setSelectedCommit(e.target.value)}>
  <option value="">Select a commit</option>
  {commits.map((commit) => (
    <option key={commit.sha} value={commit.sha}>
      {commit.commit.message}
    </option>
  ))}
</select>



          
              <button>
                <Link to='/dashboard'>EXECUTE</Link>
                </button>  
            </div>
            
       
          
        </div>
            <div className="col">
                <div className="card card1"></div>
                <div className="card card2"></div>
                <div className="card card3"></div>
                <div className="card card4"></div>
                <div className="card card5"></div>
                <div className="card card6"></div>
            </div>
        </div>
    
    );
}
export default Main;



