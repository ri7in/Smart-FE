import React from "react";
import { CollectionDTO } from "../../../types";
import Button from "../../atoms/Button/Button";

interface ActionButtonsProps {
  collection: CollectionDTO;
  onEdit: (collection: CollectionDTO) => void;
  onDelete: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  collection,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Button onClick={() => onEdit(collection)}>Edit</Button>
      <Button onClick={() => onDelete(collection.id)}>Delete</Button>
    </>
  );
};

export default ActionButtons;
