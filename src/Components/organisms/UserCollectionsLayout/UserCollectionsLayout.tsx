import React, { useState } from "react";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import Header from "../../molecules/Header/Header";
import CollectionTable from "../CollectionTable/CollectionTable";

const UserCollectionsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <CollectionTable />
        </main>
      </div>
    </div>
  );
};

export default UserCollectionsLayout;
