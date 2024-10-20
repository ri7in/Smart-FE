import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

interface ReportData {
  type: string;
  dateRange: string;
  totalWaste: number;
  recycledWaste: number;
  organicWaste: number;
  nonRecyclableWaste: number;
  recyclingRate: number;
  carbonReduction: number;
  topAreas: { name: string; rate: number }[];
  improvementAreas: { name: string; rate: number }[];
}

interface Bill {
  id: number;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

interface Collection {
  id: number;
  date: string;
  amount: number;
  wasteBinId: number;
}

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<string>('daily');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bills, setBills] = useState<Bill[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchBills();
    fetchCollections();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bills');
      setBills(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/collections');
      setCollections(response.data.results);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const generatePDF = (reportData: ReportData) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Waste Management Report', 105, 40, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Type: ${reportData.type}`, 20, 60);
    doc.text(`Date Range: ${reportData.dateRange}`, 20, 70);
    
    doc.autoTable({
      startY: 80,
      head: [['Metric', 'Value']],
      body: [
        ['Total Waste Collected', `${reportData.totalWaste} kg`],
        ['Recycled Waste', `${reportData.recycledWaste} kg`],
        ['Organic Waste', `${reportData.organicWaste} kg`],
        ['Non-recyclable Waste', `${reportData.nonRecyclableWaste} kg`],
        ['Recycling Rate', `${reportData.recyclingRate}%`],
        ['Carbon Footprint Reduction', `${reportData.carbonReduction} tons CO2e`],
      ],
    });
    
    let yPos = doc.lastAutoTable.finalY + 20;
    doc.text('Top Performing Areas:', 20, yPos);
    yPos += 10;
    reportData.topAreas.forEach((area, index) => {
      doc.text(`${index + 1}. ${area.name} - ${area.rate}% compliance rate`, 30, yPos);
      yPos += 10;
    });
    
    yPos += 10;
    doc.text('Areas Needing Improvement:', 20, yPos);
    yPos += 10;
    reportData.improvementAreas.forEach((area, index) => {
      doc.text(`${index + 1}. ${area.name} - ${area.rate}% compliance rate`, 30, yPos);
      yPos += 10;
    });
    
    doc.save('waste_management_report.pdf');
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('/api/waste-bins');
      const wasteBins = response.data.data;

      const totalWaste = collections.reduce((sum, collection) => sum + collection.amount, 0);
      const recycledWaste = totalWaste * 0.4; // Assuming 40% of waste is recycled
      const organicWaste = totalWaste * 0.3; // Assuming 30% of waste is organic
      const nonRecyclableWaste = totalWaste * 0.3; // Assuming 30% of waste is non-recyclable
      const recyclingRate = (recycledWaste / totalWaste) * 100;
      const carbonReduction = totalWaste * 0.001; // Assuming 1 kg of waste reduction equals 0.001 tons of CO2e

      const reportData: ReportData = {
        type: reportType,
        dateRange: reportType === 'custom' ? `${startDate} to ${endDate}` : reportType,
        totalWaste,
        recycledWaste,
        organicWaste,
        nonRecyclableWaste,
        recyclingRate,
        carbonReduction,
        topAreas: wasteBins.slice(0, 3)?.map((bin: any) => ({ name: bin.location, rate: Math.random() * 20 + 80 })),
        improvementAreas: wasteBins.slice(-2)?.map((bin: any) => ({ name: bin.location, rate: Math.random() * 20 + 60 })),
      };

      generatePDF(reportData);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleDownloadExistingReport = async (title: string, date: string) => {
    try {
      const response = await axios.get(`/api/bills/payment-status?isPaid=true`);
      const paidBills = response.data.data;

      const totalAmount = paidBills.reduce((sum: number, bill: Bill) => sum + bill.amount, 0);

      const reportData: ReportData = {
        type: title,
        dateRange: date,
        totalWaste: totalAmount,
        recycledWaste: totalAmount * 0.4,
        organicWaste: totalAmount * 0.3,
        nonRecyclableWaste: totalAmount * 0.3,
        recyclingRate: 40,
        carbonReduction: totalAmount * 0.001,
        topAreas: [
          { name: 'Area A', rate: Math.floor(Math.random() * 20) + 80 },
          { name: 'Area B', rate: Math.floor(Math.random() * 20) + 70 },
          { name: 'Area C', rate: Math.floor(Math.random() * 20) + 60 },
        ],
        improvementAreas: [
          { name: 'Area X', rate: Math.floor(Math.random() * 20) + 50 },
          { name: 'Area Y', rate: Math.floor(Math.random() * 20) + 40 },
        ],
      };

      generatePDF(reportData);
    } catch (error) {
      console.error('Error downloading existing report:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Generate Reports</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </div>
        {reportType === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        <div>
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download size={20} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Reports</h2>
        <ul className="space-y-2">
          {bills.slice(0, 4)?.map((bill) => (
            <ReportItem
              key={bill.id}
              title={`Bill #${bill.id} Report`}
              date={bill.dueDate}
              onDownload={handleDownloadExistingReport}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ReportItemProps {
  title: string;
  date: string;
  onDownload: (title: string, date: string) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({ title, date, onDownload }) => (
  <li className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors duration-150">
    <div>
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <button 
      onClick={() => onDownload(title, date)} 
      className="text-green-600 hover:text-green-700 focus:outline-none"
    >
      <Download size={20} />
    </button>
  </li>
);

export default ReportsPage;



// comment