import React from "react";
import { Home, Users } from "lucide-react";
import NavItem from "../../atoms/NavItem/NavItem";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
  <div className="bg-[#157145] text-white h-screen w-64 p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-8">SmartBin</h1>
    <nav className="flex-grow">
      <NavItem
        icon={<Home />}
        text="Dashboard"
        active={activeTab === "dashboard"}
        onClick={() => setActiveTab("dashboard")}
      />
      <NavItem
        icon={<Users />}
        text="Collections"
        active={activeTab === "collections"}
        onClick={() => setActiveTab("collections")}
      />
    </nav>
  </div>
);

export default Sidebar;
