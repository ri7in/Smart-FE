// DashboardLayout.tsx
import React, { useState } from "react";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Header from "../../molecules/Header/Header";
import StatGrid from "../StatGrid/StatGrid";

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = {
    totalBins: 128,
    totalBills: 325,
    lastCollection: "21/10/2024",
    nextCollection: "25/10/2024",
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow">
        <Header />
        <main className="p-6">
          <StatGrid stats={stats} />
          {/* Other dashboard content can go here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
