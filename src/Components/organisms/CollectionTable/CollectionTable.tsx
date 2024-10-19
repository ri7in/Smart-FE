import React, { useEffect, useState } from "react";
import axios from "axios";
import { CollectionDTO } from "../../../types";
import TableHeaderCell from "../../atoms/TableHeaderCell/TableHeaderCell";
import TableRow from "../../molecules/TableRow/TableRow";

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
            <TableHeaderCell label="ID" />
            <TableHeaderCell label="Waste Bin ID" />
            <TableHeaderCell label="Collection Time" />
            <TableHeaderCell label="Weight" />
            <TableHeaderCell label="Fee" />
            <TableHeaderCell label="Actions" />
          </tr>
        </thead>
        <tbody>
          {collections.length === 0 ? (
            <tr>
              <td colSpan={6}>No collections found.</td>
            </tr>
          ) : (
            collections.map((collection) => (
              <TableRow
                key={collection.id}
                collection={collection}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionTable;
