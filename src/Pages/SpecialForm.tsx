import React, { useState } from "react";
import SpecialWasteForm from "../Components/SpecialWasteForm";
import Header from "../components/molecules/Header/Header";
import Sidebar from "../components/molecules/Sidebar/Sidebar";

const SpecialForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <SpecialWasteForm />
        </main>
      </div>
    </div>
  );
};

export default SpecialForm;
