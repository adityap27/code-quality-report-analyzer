import React from "react";
import "./dashboard-home.css";
import Sidebar from "../sidebar/Sidebar";
import OneCommitDashboard from "../dashboard/oneCommit/OneCommitDashboard";
import HotspotAnalysis from "../dashboard/hotspot/HotspotAnalysis";
import TrendAnalysis from "../dashboard/trend/TrendAnalysis";
import { useParams, useLocation } from "react-router";

function DashboardHome(props) {
  const { chartType } = useParams();
  const location = useLocation();
  const data = location.state;
  console.log(data);
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