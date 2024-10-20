import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  return (
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
      {children}
    </span>
  );
};

export default IconWrapper;
