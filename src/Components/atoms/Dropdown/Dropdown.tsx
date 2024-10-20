import React from "react";

interface DropdownProps {
  isOpen: boolean;
  items: React.ReactNode[];
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, items }) => (
  <div
    className={`absolute right-0 bg-white shadow-lg rounded mt-2 p-2 w-48 z-10 border border-gray-300 ${
      isOpen ? "" : "hidden"
    }`}
  >
    <div className="flex flex-col">{items}</div>
  </div>
);

export default Dropdown;
