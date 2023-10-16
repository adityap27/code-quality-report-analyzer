import React, { useState } from "react";
import "./main.css";
import { Link } from "react-router-dom";



function Main() {



    return (
        <div className="main">
            <div className="col col1">
                <h2>Analyze Your Code Now!!!</h2>
                <p><input
                    type="text" 
                    placeholder="Insert Your Link" /></p>
              <button>
                <Link to='/dashboard'>EXECUTE</Link>
                </button>  
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



