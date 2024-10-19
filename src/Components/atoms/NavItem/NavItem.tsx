import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active, onClick }) => (
  <div
    className={`flex items-center p-2 rounded mb-2 cursor-pointer transition-colors duration-200 ${
      active ? "bg-green-600" : "hover:bg-green-600"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

export default NavItem;
