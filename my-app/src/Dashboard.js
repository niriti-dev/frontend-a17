import React, { useState } from "react";
import Topbar from "./Topbar.js";
import SummaryCards from "./SummaryCards";
import RecentSubmissionsTable from "./RecentSubmissionsTable";
import "./index.css"; // Ensure your CSS is imported

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard">
        <Topbar />
        <SummaryCards />
        <RecentSubmissionsTable />
    </div>
  );
}

export default Dashboard;