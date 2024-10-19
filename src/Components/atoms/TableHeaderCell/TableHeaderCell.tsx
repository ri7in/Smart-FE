import React from "react";

interface TableHeaderCellProps {
  label: string;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label }) => {
  return <th>{label}</th>;
};

export default TableHeaderCell;
