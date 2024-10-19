import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import TableCell from "./TableCell";

describe("TableCell Component", () => {
  test("renders children correctly", () => {
    render(<TableCell>Cell Content</TableCell>);

    const cellContent = screen.getByText("Cell Content");

    expect(cellContent).toBeInTheDocument(); // Check if the cell content is rendered
  });

  test("renders empty cell when no children are passed", () => {
    render(<TableCell />);

    const cell = screen.getByRole("cell"); // Query for the cell element
    expect(cell).toBeEmptyDOMElement(); // Check if the cell is empty
  });
});
