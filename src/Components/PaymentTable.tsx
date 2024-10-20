import React, { useState, useEffect } from "react";
import axios from "axios";

interface Bill {
  id: number;
  billDate: number[];
  amount: number;
  wasteAccountId: number;
  paid: boolean;
}

interface ApiResponse {
  status: string;
  results: Bill[];
}

const PaymentTable: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<ApiResponse>(
          "http://localhost:8080/api/bills"
        );
        if (
          response.data.status === "successful" &&
          Array.isArray(response.data.results)
        ) {
          setBills(response.data.results);
        } else {
          throw new Error("Unexpected data format received from API");
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
        setError("Failed to fetch bills. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (bills.length === 0) {
    return <div className="text-center py-4">No bills found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Waste Account ID</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {bills.map((bill) => (
            <tr
              key={bill.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {bill.id}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(
                  bill.billDate[0],
                  bill.billDate[1] - 1,
                  bill.billDate[2]
                ).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">
                LKR {bill.amount.toFixed(2)}
              </td>
              <td className="py-3 px-6 text-left">{bill.wasteAccountId}</td>
              <td className="py-3 px-6 text-left">
                <span
                  className={`py-1 px-3 rounded-full text-s ${
                    bill.paid
                      ? "bg-red-200 text-red-600"
                      : "bg-green-200 text-green-600"
                  }`}
                >
                  {bill.paid ? "not debited" : "debited"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
