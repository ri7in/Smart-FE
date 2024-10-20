import React from "react";
import {
  Users,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  FileText,
} from "lucide-react";
import StatCard from "../../atoms/StatCard/StatCard";

interface StatGridProps {
  stats: {
    totalBins: number;
    totalBills: number;
    lastCollection: string;
    nextCollection: string;
  };
}

const StatGrid: React.FC<StatGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <StatCard
      title="Total Bins"
      value={stats.totalBins}
      icon={<Users size={24} />}
    />
    <StatCard
      title="Total Bills"
      value={stats.totalBills}
      icon={<BarChartIcon size={24} />}
    />
    <StatCard
      title="Last Collection"
      value={stats.lastCollection}
      icon={<PieChartIcon size={24} />}
    />
    <StatCard
      title="Next Collection"
      value={stats.nextCollection}
      icon={<FileText size={24} />}
    />
  </div>
);

export default StatGrid;
