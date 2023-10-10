import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Dashboard from '../dashboard/Dashboard'
import './dashboardHome.css'

function DashboardHome() {
  return (
    <div className='dashboardHome'>
        <Sidebar/>
        <Dashboard/>
    </div>
  )
}

export default DashboardHome