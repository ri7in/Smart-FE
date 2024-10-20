import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  requestTime: string;
  collectionTime: string;
  weight: string;
  status: string;
  fee: string;
  wasteAccountId: number;
}

const ProgressIndicator: React.FC = () => (
  <div className="flex items-center justify-center mb-6">
    <div className="w-4 h-4 rounded-full bg-green-700 mr-2"></div>
    <div className="w-24 h-0.5 bg-gray-300 mr-2"></div>
    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
  </div>
);

const SpecialWasteForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    requestTime: "",
    collectionTime: "",
    weight: "",
    status: "Pending",
    fee: "500",
    wasteAccountId: 1,
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const currentRequestTime = new Date().toISOString();

    const specialCollectionDTO = {
      ...formData,
      requestTime: currentRequestTime,
    };

    console.log("Special collection DTO:", specialCollectionDTO);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/special-collections",
        specialCollectionDTO
      );

      console.log("Special collection created:", response.data);

      const params = new URLSearchParams(
        specialCollectionDTO as any
      ).toString();
      navigate(`/reviewForm?${params}`);

      setSuccess(true);
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      console.error("Error creating special collection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToTable = () => {
    navigate("/collections");
  };

  return (
    <div className="ml-20 mr-20">
      <ProgressIndicator />
      <h1 className="text-2xl font-bold mb-6">
        Schedule a Special Waste Collection
      </h1>
      <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4">
            Special collection scheduled successfully!
          </div>
        )}
        <p className="font-light mb-6">
          Fill in the data for the special waste collection.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="collectionTime"
              className="block text-sm font-medium text-gray-700"
            >
              Collection Time:
            </label>
            <input
              type="datetime-local"
              id="collectionTime"
              name="collectionTime"
              value={formData.collectionTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 bg-slate-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="predictedTrashWeight"
              className="block text-sm font-medium text-gray-700"
            >
              Predicted Trash Weight (kg):
            </label>
            <input
              type="number"
              id="predictedTrashWeight"
              name="predictedTrashWeight"
              value={formData.predictedTrashWeight}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 bg-slate-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 bg-slate-200"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="fee"
              className="block text-sm font-medium text-gray-700"
            >
              Fee (LKR):
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              value={formData.fee}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 bg-slate-200"
              readOnly
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="mr-2 px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={navigateToTable}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialWasteForm;
