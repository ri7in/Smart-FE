import React from "react";
import { Home, Trash, BadgeDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavItem from "../../atoms/NavItem/NavItem";
import LogoutButton from "../../LogoutButton";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="bg-[#157145] text-white h-screen w-64 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">SmartBin</h1>
      <nav className="flex-grow">
        <NavItem
          icon={<Home />}
          text="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => handleNavigation("dashboard", "/user")}
        />
        <NavItem
          icon={<Trash />}
          text="Collections"
          active={activeTab === "collections"}
          onClick={() => handleNavigation("collections", "/collections")}
        />
        <NavItem
          icon={<BadgeDollarSign />}
          text="Payment"
          active={activeTab === "payment"}
          onClick={() => handleNavigation("payment", "/payment")}
        />
      </nav>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
