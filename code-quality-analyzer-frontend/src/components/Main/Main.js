import React, { useState, useEffect } from "react";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [gitRepoLink, setGitRepoLink] = useState("");

//   const executeAPI = async () => {
//     try {
//       const apiUrl = "http://localhost:8080/onecommit/getanalysis";
//       const gitRepoLink = "https://github.com/apache/maven.git";
//       const branch = "master";
//       // const response = await axios.get()
//       const response = await fetch(`${apiUrl}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "gitRepoLink": gitRepoLink,
//           "branch": branch
//         },
//       });
//       const result = await response.json();
//     //   setData(result);
//       console.log(result);

//       history.push("/dashboard", { data: result });
//     } catch (error) {
//       console.error("Error Executing API:", error);
//     }
//   };

const executeAPI = async () => {
    try {
      const apiUrl = "http://localhost:8080/onecommit/getanalysis";
    //   const gitRepoLink = "https://github.com/apache/maven.git";
      const branch = "master";
      
      const requestData = {
        gitRepoLink,
        branch,
      };
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        navigate("/dashboard", { state: { data: result } })
        setData(result);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error Executing API:", error);
    }
  };
  

  return (
    <div className="main">
      <div className="col col1">
        <h2>Analyze Your Code Now!!!</h2>
        <p>
          <input type="text" placeholder="Insert Your Link" value={gitRepoLink}
          onChange={(e) => setGitRepoLink(e.target.value)}/>
        </p>
        <button onClick={executeAPI}>EXECUTE</button>      
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
