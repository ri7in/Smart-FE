import React from "react";

const TrashActions: React.FC = () => {
  const handleTrashAdded = () => {
    console.log("Trash added");
    // Implement your logic for "Trash Added" action here
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
