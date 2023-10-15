import React, { useState } from "react";
import "./main.css";



function Main() {



    return (
        <div className="main">
            <div className="col col1">
                <h2>Analyze Your Code Now!!!</h2>
                <input
                    type="text"
                    placeholder="Paste Your Repository Link"

                />
                <button type="button">EXECUTE</button>
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



