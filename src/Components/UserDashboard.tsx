import React, { useState } from 'react';
import {
  Home,
  Users,
  FileText,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Bell,
  Search,
  Settings,
  Trash2
} from "lucide-react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Hardcoded data
  const wasteBins = [
    { id: 1, binNumber: "A001", currentLevel: 75 },
    { id: 2, binNumber: "A002", currentLevel: 50 },
    { id: 3, binNumber: "A003", currentLevel: 25 },
  ];
  const bills = [
    { id: 1, amount: 50 },
    { id: 2, amount: 75 },
    { id: 3, amount: 60 },
  ];
  const collections = [
    { id: 1, collectionDate: "2024-10-15" },
    { id: 2, collectionDate: "2024-10-22" },
    { id: 3, collectionDate: "2024-10-29" },
  ];
  const binHistory = [
    { date: "2024-10-01", action: "Collection", level: 80 },
    { date: "2024-10-05", action: "Fill", level: 30 },
    { date: "2024-10-10", action: "Fill", level: 60 },
    { date: "2024-10-15", action: "Collection", level: 90 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome to your Dashboard!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <StatCard
              title="Total Bins"
              value={wasteBins.length}
              icon={<Trash2 size={24} />}
            />
            <StatCard
              title="Total Bills"
              value={bills.length}
              icon={<BarChartIcon size={24} />}
            />
            <StatCard
              title="Last Collection"
              value="15/10/2024"
              icon={<PieChartIcon size={24} />}
            />
            <StatCard
              title="Next Collection"
              value="22/10/2024"
              icon={<FileText size={24} />}
            />
            <BinLevelCard
              binNumber={wasteBins[0].binNumber}
              level={wasteBins[0].currentLevel}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WasteBinHistoryTable history={binHistory} />
          </div>
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
  <div className="bg-[#157145] text-white h-screen w-64 p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-8">SmartBin</h1>
    <nav className="flex-grow">
      <SidebarItem
        icon={<Home />}
        text="Dashboard"
        active={activeTab === "dashboard"}
        onClick={() => setActiveTab("dashboard")}
      />
      <SidebarItem
        icon={<Users />}
        text="Collections"
        active={activeTab === "collections"}
        onClick={() => setActiveTab("collections")}
      />
    </nav>
  </div>
);

const SidebarItem = ({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
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

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (settingsOpen) setSettingsOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  return (
    <header className="bg-[#157145] p-4 flex justify-between items-center">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a Collection..."
            className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell onClick={toggleNotifications} className="cursor-pointer" />
          {notificationsOpen && (
            <div className="absolute right-0 bg-white shadow-lg rounded mt-2 p-2 w-48 z-10 border border-gray-300">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-1">
                  <span className="text-black">New inquiry received.</span>
                  <span className="bg-red-500 rounded-full h-2 w-2" />
                </div>
                <div className="border-t border-gray-300 my-1" />
                <div className="flex items-center justify-between p-1">
                  <span className="text-black">Service completed.</span>
                  <span className="bg-red-500 rounded-full h-2 w-2" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <Settings onClick={toggleSettings} className="cursor-pointer" />
          {settingsOpen && (
            <div className="absolute right-0 bg-white shadow-lg rounded mt-2 p-2 w-48 z-10 border border-gray-300">
              <div className="flex flex-col">
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">
                  Profile Settings
                </p>
                <div className="border-t border-gray-300 my-1" />
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">
                  Account Settings
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg">
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className="text-green-500">{icon}</div>
  </div>
);

const BinLevelCard = ({ binNumber, level }: { binNumber: string; level: number }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg">
    <h3 className="text-sm font-medium text-gray-500 mb-2">Bin {binNumber} Level</h3>
    <div className="relative w-16 h-24 border-2 border-gray-300 rounded">
      <div
        className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-300"
        style={{ height: `${level}%` }}
      ></div>
    </div>
    <p className="text-xl font-bold text-gray-800 mt-2">{level}%</p>
  </div>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-200">
      {children}
    </table>
  </div>
);

Table.Header = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100">{children}</thead>
);

Table.Body = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

Table.Row = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b">{children}</tr>
);

Table.Head = ({ children }: { children: React.ReactNode }) => (
  <th className="p-2 text-left text-gray-700 font-semibold">{children}</th>
);

Table.Cell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-2 text-gray-600">{children}</td>
);

const WasteBinHistoryTable = ({
  history,
}: {
  history: Array<{ date: string; action: string; level: number }>;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Waste Bin History</h3>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Date</Table.Head>
          <Table.Head>Action</Table.Head>
          <Table.Head>Level</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {history.map((entry: { date: string; action: string; level: number }, index: number) => (
          <Table.Row key={index}>
            <Table.Cell>{new Date(entry.date).toLocaleDateString()}</Table.Cell>
            <Table.Cell>{entry.action}</Table.Cell>
            <Table.Cell>{entry.level}%</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default UserDashboard;
