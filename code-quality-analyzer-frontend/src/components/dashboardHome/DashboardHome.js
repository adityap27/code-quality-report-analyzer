import React from "react";
import "./dashboard-home.css";
import Sidebar from "../Sidebar/Sidebar";
import OneCommitDashboard from "../Dashboard/OneCommit/OneCommitDashboard";
import HotspotAnalysis from "../Dashboard/Hotspot/HotspotAnalysis";
import TrendAnalysis from "../Dashboard/Trend/TrendAnalysis";
import { useParams, useLocation } from "react-router";

function DashboardHome(props) {
  const { chartType } = useParams();
  const location = useLocation();
  const data = location.state;
  let chart;
  if (chartType === "one-commit") {
    chart = <OneCommitDashboard data={data} />;
  } else if (chartType === "trend") {
    chart = <TrendAnalysis data={data} />;
  } else if (chartType === "hotspot") {
    chart = <HotspotAnalysis data={data} />;
  } else {
    chart = <OneCommitDashboard data={data} />;
  }
  return (
    <>
      <div className="dashboardHome">
        <Sidebar />
        {chart}
      </div>
    </>
  );
}

export default DashboardHome;
