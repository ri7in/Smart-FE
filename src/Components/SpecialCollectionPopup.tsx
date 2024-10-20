import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SpecialCollection {
  id: number;
  wasteAccountId: number;
  requestTime: number[];
  collectionTime: number[];
  status: string;
  weight: number | null;
  fee: number;
}

interface ApiResponse {
  status: string;
  results: SpecialCollection[];
}

interface SpecialCollectionPopupProps {
  id: number;
  onClose: () => void;
}

const SpecialCollectionPopup: React.FC<SpecialCollectionPopupProps> = ({
  id,
  onClose,
}) => {
  const [specialCollection, setSpecialCollection] =
    useState<SpecialCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialCollection = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/special-collections/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch special collection");
        }
        const data: ApiResponse = await response.json();
        if (data.status === "successful" && data.results.length > 0) {
          setSpecialCollection(data.results[0]);
        } else {
          throw new Error("No special collection found");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching special collection");
        setLoading(false);
      }
    };

    fetchSpecialCollection();
  }, [id]);

  const formatDate = (dateArray: number[]) => {
    if (dateArray.length < 3) return "Invalid Date";
    const [year, month, day, hour = 0, minute = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute).toLocaleString();
  };

  if (loading) return <div className="popup">Loading...</div>;
  if (error) return <div className="popup">Error: {error}</div>;
  if (!specialCollection) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Special Collection #{specialCollection.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Waste Account ID:</strong>{" "}
            {specialCollection.wasteAccountId}
          </p>
          <p>
            <strong>Request Time:</strong>{" "}
            {formatDate(specialCollection.requestTime)}
          </p>
          <p>
            <strong>Collection Time:</strong>{" "}
            {formatDate(specialCollection.collectionTime)}
          </p>
          <p>
            <strong>Status:</strong> {specialCollection.status}
          </p>
          <p>
            <strong>Weight:</strong>{" "}
            {specialCollection.weight
              ? `${specialCollection.weight} kg`
              : "N/A"}
          </p>
          <p>
            <strong>Fee:</strong> ${specialCollection.fee.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialCollectionPopup;
