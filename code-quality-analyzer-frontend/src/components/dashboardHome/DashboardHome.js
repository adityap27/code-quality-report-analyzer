import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import "./dashboard-home.css";

function DashboardHome() {
  return (
    <div className="dashboardHome">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default DashboardHome;
