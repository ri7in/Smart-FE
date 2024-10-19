import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import TableHeaderCell from "./TableHeaderCell";

describe("TableHeaderCell Component", () => {
  test("renders label correctly", () => {
    const label = "Header Title";
    render(<TableHeaderCell label={label} />);

    const headerCell = screen.getByText(label);

    expect(headerCell).toBeInTheDocument(); // Check if the header label is rendered
    expect(headerCell.tagName).toBe("TH"); // Ensure it is rendered as a <th> element
  });

  test("renders empty header when no label is passed", () => {
    render(<TableHeaderCell label="" />); // Pass an empty label

    const headerCell = screen.getByRole("columnheader"); // Query for the header cell element
    expect(headerCell).toBeEmptyDOMElement(); // Check if the cell is empty
  });
});
