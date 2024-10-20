import React from "react";

interface IconTextButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  active?: boolean;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  text,
  onClick,
  active = false,
}) => (
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

export default IconTextButton;
