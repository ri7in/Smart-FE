import React, { useEffect, useState } from "react";
import axios from "axios";

interface CollectionDTO {
  id: number;
  wasteBinId: number;
  collectionTime: string;
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
      <h2>Collection List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Waste Bin ID</th>
            <th>Collection Time</th>
            <th>Weight</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.length === 0 ? (
            <tr>
              <td colSpan={6}>No collections found.</td>
            </tr>
          ) : (
            collections.map((collection) => (
              <tr key={collection.id}>
                <td>{collection.id}</td>
                <td>{collection.wasteBinId}</td>
                {new Date(
                  collection.collectionTime[0], // year
                  collection.collectionTime[1] - 1, // month (0-based)
                  collection.collectionTime[2], // day
                  collection.collectionTime[3], // hours
                  collection.collectionTime[4] // minutes
                ).toLocaleString()}
                <td>{collection.weight}</td>
                <td>{collection.fee}</td>
                <td>
                  <button onClick={() => handleEdit(collection)}>Edit</button>
                  <button onClick={() => handleDelete(collection.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionTable;
// import React from "react";

// // Define the type for the CollectionDTO
// interface CollectionDTO {
//   id: number;
//   wasteBinId: number;
//   collectionTime: string;
//   weight: number;
//   fee: number;
// }

// const CollectionTable: React.FC = () => {
//   // Dummy data
//   const collections: CollectionDTO[] = [
//     {
//       id: 1,
//       wasteBinId: 101,
//       collectionTime: "2023-10-19T12:00:00",
//       weight: 15.5,
//       fee: 20.0,
//     },
//     {
//       id: 2,
//       wasteBinId: 102,
//       collectionTime: "2023-10-18T09:30:00",
//       weight: 12.0,
//       fee: 15.0,
//     },
//     {
//       id: 3,
//       wasteBinId: 103,
//       collectionTime: "2023-10-17T14:45:00",
//       weight: 18.7,
//       fee: 25.0,
//     },
//   ];

//   const handleDelete = (id: number) => {
//     console.log(`Delete collection with ID: ${id}`);
//   };

//   const handleEdit = (collection: CollectionDTO) => {
//     console.log("Edit collection:", collection);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Collection List</h2>
//       {collections.length === 0 ? (
//         <p>No collections available.</p>
//       ) : (
//         <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
//           <thead>
//             <tr className="bg-green-500 text-white">
//               <th className="py-2 px-4">ID</th>
//               <th className="py-2 px-4">Waste Bin ID</th>
//               <th className="py-2 px-4">Collection Time</th>
//               <th className="py-2 px-4">Weight</th>
//               <th className="py-2 px-4">Fee</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {collections.map((collection) => (
//               <tr key={collection.id} className="hover:bg-gray-100">
//                 <td className="border px-4 py-2">{collection.id}</td>
//                 <td className="border px-4 py-2">{collection.wasteBinId}</td>
//                 <td className="border px-4 py-2">
//                   {new Date(collection.collectionTime).toLocaleString()}
//                 </td>
//                 <td className="border px-4 py-2">{collection.weight}</td>
//                 <td className="border px-4 py-2">{collection.fee}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
//                     onClick={() => handleEdit(collection)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(collection.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CollectionTable;
