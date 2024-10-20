import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg">
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className="text-green-500">{icon}</div>
  </div>
);

export default StatCard;
