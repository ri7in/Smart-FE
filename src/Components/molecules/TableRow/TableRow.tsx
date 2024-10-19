import React from "react";
import { CollectionDTO } from "../../../types";
import ActionButtons from "../ActionButtons/ActionButtons";
import TableCell from "../../atoms/TableCell/TableCell";

interface TableRowProps {
  collection: CollectionDTO;
  onEdit: (collection: CollectionDTO) => void;
  onDelete: (id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  collection,
  onEdit,
  onDelete,
}) => {
  const collectionTime = new Date(
    collection.collectionTime[0],
    collection.collectionTime[1] - 1,
    collection.collectionTime[2],
    collection.collectionTime[3],
    collection.collectionTime[4]
  ).toLocaleString();

  return (
    <tr>
      <TableCell>{collection.id}</TableCell>
      <TableCell>{collection.wasteBinId}</TableCell>
      <TableCell>{collectionTime}</TableCell>
      <TableCell>{collection.weight}</TableCell>
      <TableCell>{collection.fee}</TableCell>
      <TableCell>
        <ActionButtons
          collection={collection}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </tr>
  );
};

export default TableRow;
