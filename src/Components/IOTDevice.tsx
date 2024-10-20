import React from "react";
import axios from "axios";

const TrashActions: React.FC = () => {
  const handleTrashAdded = async () => {
    console.log("Trash added");
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/waste-bins/1/level/increase?increment=5.0`,
        { increment: 5.0 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Waste bin level increased:", response.data);
    } catch (error) {
      console.error("Error increasing waste bin level:", error);
    }
  };

  const handleTrashCollected = () => {
    console.log("Trash collected");
    // Implement your logic for "Trash Collected" action here
  };

  return (
    <div className="flex justify-between mb-4 p-4 bg-white shadow rounded">
      <button
        onClick={handleTrashAdded}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Trash Added
      </button>
      <button
        onClick={handleTrashCollected}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        Trash Collected
      </button>
    </div>
  );
};

export default TrashActions;
