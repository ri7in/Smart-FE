import React from "react";

interface ListItemProps {
  message: string;
}

const ListItem: React.FC<ListItemProps> = ({ message }) => (
  <div className="flex items-center justify-between p-1">
    <span className="text-black">{message}</span>
    <span className="bg-red-500 rounded-full h-2 w-2" />
  </div>
);

export default ListItem;
