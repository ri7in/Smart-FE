import React, { useState } from "react";

import inquiryService from "../services/inquiryService";
import useWaste from "../hooks/useWaste";
import useHistory from "../hooks/useHistory";

import {
  Home,
  Users,
  FileText,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Bell,
  Search,
  Settings,
  Trash2,
  Send,
  UserRoundIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

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
    { date: "2024-10-01", wasteType: "Organic", level: 80, binNumber: "A001" },
    {
      date: "2024-10-05",
      wasteType: "Recyclable",
      level: 30,
      binNumber: "A002",
    },
    { date: "2024-10-10", wasteType: "General", level: 60, binNumber: "A003" },
    { date: "2024-10-15", wasteType: "Organic", level: 90, binNumber: "A001" },
  ];

  const chartData = [
    { name: "Organic", amount: 400 },
    { name: "Recyclable", amount: 300 },
    { name: "General", amount: 200 },
  ];

  const pieChartData = [
    { name: "Bin A001", value: 75 },
    { name: "Bin A002", value: 50 },
    { name: "Bin A003", value: 25 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleInquirySend = () => {
    // Here you would typically send the inquiry to a backend service
    console.log("Sending inquiry:", {
      title: inquiryTitle,
      message: inquiryMessage,
    });
    setInquirySent(true);
    setInquiryTitle("");
    setInquiryMessage("");
    setTimeout(() => setInquirySent(false), 3000); // Reset after 3 seconds
  };

  const Sidebar = ({
    activeTab,
    setActiveTab,
  }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }) => (
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Welcome to your Dashboard!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
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
              currentFee={50}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InquiryCard
              title={inquiryTitle}
              message={inquiryMessage}
              setTitle={setInquiryTitle}
              setMessage={setInquiryMessage}
              onSend={handleInquirySend}
              sent={inquirySent}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <WasteBinHistoryTable history={binHistory} />
              <div className="grid grid-rows-2 gap-6">
                <WasteTypeChart data={chartData} />
                <BinLevelPieChart data={pieChartData} colors={COLORS} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ... (Sidebar, SidebarItem, Header components remain unchanged)

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

const BinLevelCard = ({
  binNumber,
  level,
  currentFee,
}: {
  binNumber: string;
  level: number;
  currentFee: number;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg">
    <h3 className="text-sm font-medium text-gray-500 mb-2">
      Bin {binNumber} Level
    </h3>
    <div className="relative w-16 h-24 border-2 border-gray-300 rounded mb-2">
      <div
        className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-300"
        style={{ height: `${level}%` }}
      ></div>
    </div>
    <p className="text-xl font-bold text-gray-800">{level}%</p>
    <p className="text-sm font-medium text-gray-500 mt-2">Current Fee</p>
    <p className="text-lg font-bold text-gray-800">${currentFee}</p>
  </div>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto w-full">
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
  history: Array<{
    date: string;
    wasteType: string;
    level: number;
    binNumber: string;
  }>;
}) => {
  const { data } = useWaste();

  const { data: historyData } = useHistory();

  console.log("thu: ", data);

  const newData = data?.results;

  const newHistory = historyData?.results;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Waste Bin History</h3>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Waste Bin Number</Table.Head>
            <Table.Head>Waste Category</Table.Head>
            <Table.Head>Recyclable</Table.Head>
            <Table.Head>Capacity</Table.Head>
            <Table.Head>Current Level</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {newData?.map((entry, index) => (
            <Table.Row key={index}>
              <Table.Cell>{entry.binNumber}</Table.Cell>
              <Table.Cell>{entry.wasteCategory}</Table.Cell>
              <Table.Cell>{entry.isRecyclable ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>{entry.capacity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const WasteTypeChart = ({
  data,
}: {
  data: Array<{ name: string; amount: number }>;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Waste Type Distribution</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const BinLevelPieChart = ({
  data,
  colors,
}: {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Bin Level Distribution</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const InquiryCard = ({
  sent,
}: {
  title: string;
  message: string;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
  onSend: () => void;
  sent: boolean;
}) => {
  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const formData = {
      subject: title,
      message,
      createdAt: "2024-08-17",
      userId: 1,
    };

    console.log("Sending inquiry:", formData);

    inquiryService.Create(formData).then(() => {
      console.log("Inquiry sent successfully!");
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Raise an Inquiry</h3>
      {sent ? (
        <div className="text-green-600 font-semibold">
          Inquiry raised successfully!
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Inquiry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Inquiry Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mb-4 border rounded h-24"
          />
          <button
            onClick={() => handleSubmit()}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <Send size={16} className="mr-2" />
            Send Inquiry
          </button>
        </>
      )}
    </div>
  );
};

export default UserDashboard;

//rwar
