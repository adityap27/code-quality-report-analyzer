import React from 'react'
import Logo from '../../assets/code-analyzer.png'
import './sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <div className="sidebar-menu-items">
            <div className="oneCommit common-item">
                One Commit
            </div>
            <div className="trendAnalysis common-item">
                Trend Analysis
            </div>
            <div className="hotspotAnalysis common-item">
                Hotspot Analysis
            </div>
        </div>
    </div>
  )
}

export default Sidebar