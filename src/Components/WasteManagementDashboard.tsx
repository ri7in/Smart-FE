import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Home,
  Users,
  FileText,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Bell,
  Search,
  Settings,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import ReportsPage from '../Pages/ReportsPage';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAllResidents, setShowAllResidents] = useState(false);
  const [showAllInquiries, setShowAllInquiries] = useState(false);
  const [residents, setResidents] = useState([]);
  const [stats, setStats] = useState({
    totalResidents: 0,
    totalWasteCollected: 0,
    totalEarnings: 0,
    recyclingRate: 0,
  });
  const [wasteAnalysisData, setWasteAnalysisData] = useState([]);
  const [collectionTrendsData, setCollectionTrendsData] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const residentsResponse = await axios.get('http://localhost:8080/api/residents');
      setResidents(residentsResponse.data.data);

      const statsResponse = await axios.get('http://localhost:8080/api/dashboard/stats');
      setStats(statsResponse.data.data);

      const wasteAnalysisResponse = await axios.get('http://localhost:8080/api/dashboard/waste-analysis');
      setWasteAnalysisData(wasteAnalysisResponse.data.data);

      const collectionTrendsResponse = await axios.get('http://localhost:8080/api/dashboard/collection-trends');
      setCollectionTrendsData(collectionTrendsResponse.data.data);

      const inquiriesResponse = await axios.get('http://localhost:8080/api/dashboard/inquiries');
      setInquiries(inquiriesResponse.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === 'dashboard' && (
            <>
              <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Dashboard Overview
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  title="Total Residents"
                  value={stats.totalResidents}
                  icon={<Users size={24} />}
                />
                <StatCard
                  title="Total Waste Collected"
                  value={`${stats.totalWasteCollected} kg`}
                  icon={<BarChartIcon size={24} />}
                />
                <StatCard
                  title="Total Earnings"
                  value={`${stats.totalEarnings} LKR`}
                  icon={<PieChartIcon size={24} />}
                />
                <StatCard
                  title="Recycling Rate"
                  value={`${stats.recyclingRate}%`}
                  icon={<FileText size={24} />}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <WasteAnalysis data={wasteAnalysisData} />
                <CollectionTrends data={collectionTrendsData} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResidentTable
                  residents={residents}
                  onSeeAll={() => setShowAllResidents(true)}
                />
                <InquiriesList
                  inquiries={inquiries}
                  onSeeAll={() => setShowAllInquiries(true)}
                />
              </div>
            </>
          )}
          {activeTab === 'residents' && (
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              Residents
            </h1>
          )}
          {activeTab === 'reports' && <ReportsPage />}
        </main>
      </div>
      {showAllResidents && (
        <Modal title="All Residents" onClose={() => setShowAllResidents(false)}>
          <ResidentTable residents={residents} />
        </Modal>
      )}
      {showAllInquiries && (
        <Modal title="All Inquiries" onClose={() => setShowAllInquiries(false)}>
          <InquiriesList inquiries={inquiries} />
        </Modal>
      )}
    </div>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
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
        text="Residents"
        active={activeTab === "residents"}
        onClick={() => setActiveTab("residents")}
      />
      <SidebarItem
        icon={<FileText />}
        text="Reports"
        active={activeTab === "reports"}
        onClick={() => setActiveTab("reports")}
      />
    </nav>
  </div>
);

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  onClick,
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

const Header: React.FC = () => {
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

interface WasteAnalysisProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const WasteAnalysis: React.FC<WasteAnalysisProps> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Waste Analysis</h2>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-between mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2`}
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-xs text-gray-600">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

interface CollectionTrendsProps {
  data: Array<{ name: string; collections: number }>;
}

const CollectionTrends: React.FC<CollectionTrendsProps> = ({ data }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">
      Collection Trends
    </h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="collections" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

interface ResidentTableProps {
  residents: Array<{ name: string; address: string; habits: string }>;
  onSeeAll?: () => void;
}

const ResidentTable: React.FC<ResidentTableProps> = ({
  residents,
  onSeeAll,
}) => {
  // Make sure to use both residents and onSeeAll in the component
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Recent Residents
      </h2>
      <ul className="space-y-2">
        {residents?.slice(0, 5)?.map((resident, index) => (
          <li key={index} className="text-sm text-gray-600">
            {resident.name} - {resident.address}
          </li>
        ))}
      </ul>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          See all residents
        </button>
      )}
    </div>
  );
};

// const BillingSettings: React.FC = () => {
//   const [billingModel, setBillingModel] = useState('flat');
//   const [flatFee, setFlatFee] = useState('1000');
//   const [perKgPrice, setPerKgPrice] = useState('10');
//   const [recyclableRate, setRecyclableRate] = useState('5');

//   const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.max(0, Number(event.target.value));
//     setter(value.toString());
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       {/* BillingSettings content */}
//     </div>
//   );
// };

interface InquiriesListProps {
  inquiries: Array<{ id: number; text: string; resolved: boolean }>;
  onSeeAll?: () => void;
}
const InquiriesList: React.FC<InquiriesListProps> = ({
  inquiries,
  onSeeAll,
}) => {
  const [inquiryList, setInquiryList] = useState(inquiries);

  const toggleResolved = (id: number) => {
    setInquiryList((prev) =>
      prev.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, resolved: true } : inquiry
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Recent Inquiries
      </h2>
      <ul className="space-y-2">
        {inquiryList.slice(0, 5)?.map((inquiry) => (
          <li key={inquiry.id} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{inquiry.text}</span>
            <div className="flex items-center">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  inquiry.resolved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {inquiry.resolved ? "Resolved" : "Pending"}
              </span>
              {!inquiry.resolved && (
                <button
                  onClick={() => toggleResolved(inquiry.id)}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded border border-blue-600"
                >
                  Resolved
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          See all inquiries
        </button>
      )}
    </div>
  );
};

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

export default Dashboard;
