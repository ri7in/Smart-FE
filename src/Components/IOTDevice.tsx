import React from "react";

const TrashActions: React.FC = () => {
  const wasteBinId = 1; // Replace with the actual ID of the waste bin

  const handleTrashAdded = () => {
    console.log("Trash added");

    // Define the increment value
    const increment = 10;

    // Make the PATCH request
    fetch(
      `http://your-api-url/api/waste-bins/${wasteBinId}/level/increase?increment=${increment}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Waste bin level increased:", data);
      })
      .catch((error) => {
        console.error("Error increasing waste bin level:", error);
      });
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
