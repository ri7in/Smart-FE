import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import IconTextButton from "./IconTextButton";

describe("IconTextButton Component", () => {
  test("renders the icon and text", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(
      <IconTextButton icon={<TestIcon />} text="Search" onClick={() => {}} />
    );

    const icon = screen.getByTestId("test-icon");
    const text = screen.getByText("Search");

    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn(); // Mock function
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(
      <IconTextButton icon={<TestIcon />} text="Search" onClick={handleClick} />
    );

    const button = screen.getByText("Search").parentElement;

    fireEvent.click(button!); // Simulate click

    expect(handleClick).toHaveBeenCalledTimes(1); // Check if onClick has been called
  });

  test("applies active class when active is true", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(
      <IconTextButton
        icon={<TestIcon />}
        text="Search"
        onClick={() => {}}
        active={true}
      />
    );

    const button = screen.getByText("Search").parentElement;

    expect(button).toHaveClass("bg-green-600"); // Checks for the active class
  });

  test("applies hover class when active is false", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(
      <IconTextButton
        icon={<TestIcon />}
        text="Search"
        onClick={() => {}}
        active={false}
      />
    );

    const button = screen.getByText("Search").parentElement;

    expect(button).not.toHaveClass("bg-green-600");
    expect(button).toHaveClass("hover:bg-green-600");
  });
});
