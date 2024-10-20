import React, { useState } from "react";
import axios from "axios";

interface Bill {
  id: number;
  billDate: string;
  amount: number | null; // Allow amount to be null
  isPaid: boolean;
  wasteAccount?: {
    // Make wasteAccount optional
    id: number;
    // Add other waste account properties as needed
  };
}

const SearchBar: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [bill, setBill] = useState<Bill | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/bills/${searchId}`
      );

      console.log("Bill response:", response);
      setBill(response.data.results[0]);
      setError(null);
    } catch (err) {
      setBill(null);
      setError("Bill not found. Please check the ID and try again.");
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Bill ID"
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {bill && (
        <div className="bg-white p-4 rounded shadow">
          <button
            onClick={() => setBill(null)}
            className="float-right text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-2">Bill Details</h2>
          <p>
            <strong>ID:</strong> {bill.id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(bill.billDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Amount:</strong> $
            {bill.amount ? bill.amount.toFixed(2) : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {bill.isPaid ? "debited" : "not debited"}
          </p>
          <p>
            {/* <strong>Waste Account ID:</strong> {bill.wasteAccount?.id ?? "N/A"} */}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
