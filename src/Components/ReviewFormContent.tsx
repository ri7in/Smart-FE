import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  requestTime: string;
  collectionTime: string;
  predictedTrashWeight: string;
  status: string;
  fee: string;
  wasteAccount: number;
}

const ProgressIndicator: React.FC = () => (
  <div className="flex items-center justify-center mb-6">
    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
    <div className="w-24 h-0.5 bg-gray-300 mr-2"></div>
    <div className="w-4 h-4 rounded-full bg-green-700 mr-2"></div>
  </div>
);

const ReviewFormContent: React.FC = () => {
  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate("/specialCollectionForm");
  };

  const navigateToTable = () => {
    navigate("/collections");
  };

  return (
    <div className="ml-20 mr-20">
      <ProgressIndicator />
      <h1 className="text-2xl font-bold mb-6">Review Info</h1>
      <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <p className="font-light mb-6">
          Fill in the data for the special waste collection.
        </p>
        <div className="flex-col pl-40 pr-40">
          <div className="flex justify-between mb-2">
            <span className="font-bold text-xl">Date:</span>
            <span className="text-xl">2024/10/20</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-xl">Time:</span>
            <span className="text-xl">20:00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-xl">
              Predicted Trash Weight (kg):
            </span>
            <span className="text-xl">50</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-xl">Status:</span>
            <span className="text-xl">Pending</span>
          </div>
          <div className="flex justify-between mb-8">
            <span className="font-bold text-xl">Fee (LKR):</span>
            <span className="text-xl">500</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="mr-2 px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={navigateToForm}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={navigateToTable}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormContent;
