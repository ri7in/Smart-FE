import React, { useState } from 'react';
import { Search, Bell, Settings, Home, Users, FileText } from 'lucide-react';

const Sidebar = () => (
  <div className="bg-[#157145] text-white h-screen w-64 p-4">
    <h1 className="text-2xl font-bold mb-8">SmartBin</h1>
    <nav>
      <SidebarItem icon={<Home />} text="Dashboard" active />
      <SidebarItem icon={<Users />} text="Residents" />
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
            placeholder="Search a resident..."
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
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">Profile Settings</p>
                <div className="border-t border-gray-300 my-1" />
                <p className="text-black hover:bg-gray-100 p-1 rounded cursor-pointer">Account Settings</p>
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
  <div className="bg-green-100 p-4 rounded-lg text-center shadow h-full">
    <h3 className="text-sm font-medium text-green-800">{title}</h3>
    <p className="text-xl font-bold text-green-700">{value}</p>
  </div>
);

const WasteAnalysis = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Waste Analysis</h2>
    <div className="flex items-end space-x-1">
      <div className="bg-green-300 h-20 w-1/6"></div>
      <div className="bg-blue-300 h-10 w-1/6"></div>
      <div className="bg-yellow-300 h-15 w-1/6"></div>
      <div className="bg-cyan-300 h-8 w-1/6"></div>
      <div className="bg-purple-300 h-5 w-1/6"></div>
    </div>
    <div className="flex justify-between mt-2 text-sm">
      <span>Food Waste</span>
      <span>Paper Waste</span>
      <span>Plastic Waste</span>
      <span>Recyclable Waste</span>
      <span>Other Waste</span>
    </div>
  </div>
);

const ResidentTable = () => (
  <div className="bg-white p-4 rounded-lg shadow max-h-64 overflow-y-auto">
    <h2 className="text-lg font-semibold mb-4">Residents Overview</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Address</th>
          <th className="border px-4 py-2 text-left">Waste Habits</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'John Doe', address: '123 Main St', habits: 'Regular' },
          { name: 'Jane Smith', address: '456 Oak St', habits: 'High' },
          { name: 'Saman Perera', address: '789 Pine St', habits: 'Low' },
          { name: 'Nimal Kumara', address: '101 Maple St', habits: 'Regular' },
          { name: 'Kumara Silva', address: '202 Elm St', habits: 'High' },
          { name: 'Anushka Dias', address: '303 Cedar St', habits: 'Regular' },
          { name: 'Dilshan Fernando', address: '404 Birch St', habits: 'Low' },
        ].map((resident, index) => (
          <tr key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => alert(`Navigate to details for ${resident.name}`)}>
            <td className="border px-4 py-2">{resident.name}</td>
            <td className="border px-4 py-2">{resident.address}</td>
            <td className="border px-4 py-2">{resident.habits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BillingSettings = () => {
  const [billingModel, setBillingModel] = useState('flat');
  const [flatFee, setFlatFee] = useState('1000');
  const [perKgPrice, setPerKgPrice] = useState('10');
  const [recyclableRate, setRecyclableRate] = useState('5');

  const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(event.target.value)); // Prevent negative values
    setter(value.toString());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Billing Settings</h2>
      <div className="flex flex-col space-y-2">
        <div>
          <h3 className="text-sm font-medium">Billing Model</h3>
          <select value={billingModel} onChange={(e) => setBillingModel(e.target.value)} className="border rounded w-full p-2">
            <option value="flat">Flat Fee</option>
            <option value="per_kg">Price Per kg</option>
          </select>
        </div>
        {billingModel === 'flat' ? (
          <div>
            <h3 className="text-sm font-medium">Set Price (LKR)</h3>
            <input type="number" value={flatFee} onChange={handlePriceChange(setFlatFee)} className="border rounded w-full p-2" />
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-medium">Price Per kg (LKR)</h3>
            <input type="number" value={perKgPrice} onChange={handlePriceChange(setPerKgPrice)} className="border rounded w-full p-2" />
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium">Recyclable Rate (LKR)</h3>
          <input type="number" value={recyclableRate} onChange={handlePriceChange(setRecyclableRate)} className="border rounded w-full p-2" />
        </div>
      </div>
    </div>
  );
};

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([
    { id: 1, text: 'Broken bin at Main St.', resolved: false },
    { id: 2, text: 'Missed collection on Monday.', resolved: false },
    { id: 3, text: 'Request for additional bin.', resolved: false },
    { id: 4, text: 'Complaint about collection timing.', resolved: false },
  ]);

  const resolveInquiry = (id: number) => {
    setInquiries(inquiries.map(inquiry => inquiry.id === id ? { ...inquiry, resolved: true } : inquiry));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow max-h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Inquiries</h2>
      {inquiries.map(inquiry => (
        <div key={inquiry.id} className={`flex justify-between items-center p-2 ${inquiry.resolved ? 'bg-gray-200' : 'hover:bg-gray-100 cursor-pointer'}`}>
          <span className={inquiry.resolved ? 'text-green-600' : ''}>
            {inquiry.resolved ? 'Completed' : inquiry.text}
          </span>
          {!inquiry.resolved && (
            <button onClick={() => resolveInquiry(inquiry.id)} className="bg-green-500 text-white px-2 rounded">Resolve</button>
          )}
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  // Sample hardcoded data; replace this with your database queries later
  const stats = {
    totalResidents: 300,
    totalBins: 150,
    totalCollections: 120,
    totalWasteCollected: 1800, // in kg
    totalEarnings: 45000, // in LKR
    unpaidBills: 10,
    averageWastePerBin: (1800 / 150).toFixed(2), // in kg
    upcomingSpecialCollections: 5,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Good Afternoon, Waste Management Personnel!</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Residents" value={stats.totalResidents} />
            <StatCard title="Total Bins" value={stats.totalBins} />
            <StatCard title="Total Collections" value={stats.totalCollections} />
            <StatCard title="Total Waste Collected" value={`${stats.totalWasteCollected} kg`} />
            <StatCard title="Total Earnings (LKR)" value={`${stats.totalEarnings}`} />
            <StatCard title="Unpaid Bills" value={stats.unpaidBills} />
            <StatCard title="Average Waste per Bin" value={`${stats.averageWastePerBin} kg`} />
            <StatCard title="Upcoming Special Collections" value={stats.upcomingSpecialCollections} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <WasteAnalysis />
            <ResidentTable />
            <BillingSettings />
          </div>
          <InquiriesList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
