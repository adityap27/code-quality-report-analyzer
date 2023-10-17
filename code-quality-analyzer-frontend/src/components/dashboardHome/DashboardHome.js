import React from "react";
import "./dashboard-home.css";
import Sidebar from "../Sidebar/Sidebar";
import OneCommitDashboard from "../dashboard/OneCommit/OneCommitDashboard";
import HotspotAnalysis from "../dashboard/Hotspot/HotspotAnalysis";
import TrendAnalysis from "../dashboard/Trend/TrendAnalysis";
import { useParams } from "react-router";

function DashboardHome() {
  const { chartType } = useParams();
  let chart;
  if (chartType === "one-commit") {
    chart = <OneCommitDashboard />;
  } else if (chartType === "trend") {
    chart = <TrendAnalysis />;
  } else if (chartType === "hotspot") {
    chart = <HotspotAnalysis />;
  } else {
    chart = <OneCommitDashboard />;
  }
  return (
    <>
      <div className="dashboardHome">
        <Sidebar />
        {/* <div className="one-commit">
          <OneCommitDashboard />
        </div>
        <div className="trend-analysis">
          <TrendAnalysis />
        </div>
        <div className="hotspot-analysis">
          <HotspotAnalysis />
        </div> */}
        {chart}
      </div>
    </>
  );
}

export default DashboardHome;
