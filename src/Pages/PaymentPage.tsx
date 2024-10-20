import React, { useState } from "react";
import Header from "../components/molecules/Header/Header";
import Sidebar from "../components/molecules/Sidebar/Sidebar";
import SearchBar from "../Components/SearchBar";
import PaymentTable from "../Components/PaymentTable";

const PaymentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6">Payment Details</h1>
          <SearchBar />
          <PaymentTable />
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;
