import React, { useState } from 'react';
import { Search, Bell, Settings, Home, Users, FileText } from 'lucide-react';

const Sidebar = () => (
  <div className="bg-[#157145] text-white h-screen w-64 p-4">
    <h1 className="text-2xl font-bold mb-8">SmartBin</h1>
    <nav>
      <SidebarItem icon={<Home />} text="Dashboard" active />
      <SidebarItem icon={<Users />} text="Collections" />
      <SidebarItem icon={<FileText />} text="Reports" />
    </nav>
  </div>
);

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active }) => (
  <div className={`flex items-center p-2 rounded mb-2 ${active ? 'bg-green-600' : 'hover:bg-green-600'}`}>
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (settingsOpen) setSettingsOpen(false); // Close settings if open
  };
  
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (notificationsOpen) setNotificationsOpen(false); // Close notifications if open
  };

  return (
    <header className="bg-[#157145] p-4 flex justify-between items-center">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a collection..."
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
                  <span className="text-black">New collection scheduled.</span>
                  <span className="bg-red-500 rounded-full h-2 w-2" />
                </div>
                <div className="border-t border-gray-300 my-1" />
                <div className="flex items-center justify-between p-1">
                  <span className="text-black">Bin full alert.</span>
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
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">Profile Settings</p>
                <div className="border-t border-gray-300 my-1" />
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">Account Settings</p>
                <div className="border-t border-gray-300 my-1" />
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">Privacy Settings</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};



interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-green-100 p-4 rounded-lg">
    <h3 className="text-sm font-medium text-green-800">{title}</h3>
    <p className="text-2xl font-bold text-green-700">{value}</p>
  </div>
);

const WasteAnalysis = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Waste Analysis</h2>
    <div className="h-64 flex items-end space-x-2">
      <div className="bg-green-500 h-full w-1/4"></div>
      <div className="bg-blue-500 h-1/3 w-1/4"></div>
      <div className="bg-yellow-500 h-3/4 w-1/4"></div>
      <div className="bg-cyan-500 h-1/2 w-1/4"></div>
    </div>
    <div className="flex justify-between mt-2 text-sm">
      <span>Food Waste</span>
      <span>Paper Waste</span>
      <span>Plastic Waste</span>
      <span>Recyclable Waste</span>
    </div>
  </div>
);

const HighWasteAreas = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">High-Waste Areas</h2>
    <div className="bg-gray-200 h-64 rounded"></div>
  </div>
);

const Dashboard = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Good Afternoon, Mr. Shehan!</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Today's waste" value="27 kg" />
          <StatCard title="Most frequent type" value="Plastic" />
          <StatCard title="Total available bins" value="5" />
          <StatCard title="Next Collection Date" value="09/11" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <WasteAnalysis />
          <HighWasteAreas />
        </div>
      </main>
    </div>
  </div>
);

export default Dashboard;