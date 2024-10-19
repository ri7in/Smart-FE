// DashboardLayout.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Header from "../../molecules/Header/Header";
import StatGrid from "../StatGrid/StatGrid";
import axios from "axios";


const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

const [stats, setStats] = useState({
  totalBins: 0,
  totalBills: 0, // Change this line
  lastCollection: "",
  nextCollection: "",
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const binResponse = await axios.get("/api/waste-bins");
      const totalBins = binResponse.data.results.length; // Assuming results is an array

      const billResponse = await axios.get("/api/bills");
      const totalBills = billResponse.data.results.length; // Assuming results is an array

      // Update your statistics based on fetched data
      setStats({
        totalBins,
        totalBills,
        lastCollection: "21/10/2024", // Update with actual data if available
        nextCollection: "25/10/2024", // Update with actual data if available
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  fetchStats();
}, []);


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
