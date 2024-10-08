import React from "react";
import Dashboard from "../components/Dashboard";
import '../App.css';

function DashboardPage() {
  return (
    <div className="App min-h-screen flex flex-col bg-custom">
      <Dashboard />
    </div>
  );
}

export default DashboardPage;