import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for improved assertions
import IconButton from "./IconButton";

describe("IconButton Component", () => {
  test("renders the icon inside the button", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(<IconButton icon={<TestIcon />} onClick={() => {}} />);

    const icon = screen.getByTestId("test-icon");

    expect(icon).toBeInTheDocument();
  });

  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn(); // Mock function
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(<IconButton icon={<TestIcon />} onClick={handleClick} />);

    const button = screen.getByTestId("test-icon").parentElement; // Get parent div (IconButton)

    fireEvent.click(button!); // Simulate click

    expect(handleClick).toHaveBeenCalledTimes(1); // Check if onClick has been called
  });

  test("applies the cursor-pointer class", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(<IconButton icon={<TestIcon />} onClick={() => {}} />);

    const button = screen.getByTestId("test-icon").parentElement;

    expect(button).toHaveClass("cursor-pointer");
  });
});
