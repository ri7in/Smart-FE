import React, { useEffect, useState } from "react";
import axios from "axios";

interface CollectionDTO {
  id: number;
  wasteBinId: number;
  collectionTime: number[]; // Updated type to match the API response
  weight: number;
  fee: number;
}

const CollectionTable: React.FC = () => {
  const [collections, setCollections] = useState<CollectionDTO[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/collections");
      setCollections(
        Array.isArray(response.data.results) ? response.data.results : []
      );
      console.log("Huththo");
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/collections/${id}`);
      fetchCollections();
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleEdit = (collection: CollectionDTO) => {
    console.log("Edit collection:", collection);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Collection List</h2>
      {collections.length === 0 ? (
        <p>No collections available.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Waste Bin ID</th>
              <th className="py-2 px-4">Collection Time</th>
              <th className="py-2 px-4">Weight</th>
              <th className="py-2 px-4">Fee</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{collection.id}</td>
                <td className="border px-4 py-2">{collection.wasteBinId}</td>
                <td className="border px-4 py-2">
                  {new Date(
                    collection.collectionTime[0], // year
                    collection.collectionTime[1] - 1, // month (0-based)
                    collection.collectionTime[2], // day
                    collection.collectionTime[3], // hours
                    collection.collectionTime[4] // minutes
                  ).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{collection.weight}</td>
                <td className="border px-4 py-2">{collection.fee}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    onClick={() => handleEdit(collection)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(collection.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CollectionTable;
