import React, { useState } from "react";
import Header from "../components/molecules/Header/Header";
import Sidebar from "../components/molecules/Sidebar/Sidebar";
import ReviewFormContent from "../Components/ReviewFormContent";

const ReviewFormPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <ReviewFormContent />
        </main>
      </div>
    </div>
  );
};

export default ReviewFormPage;
