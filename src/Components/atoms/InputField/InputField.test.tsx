import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import InputField from "./InputField";

describe("InputField Component", () => {
  test("renders input field with correct attributes", () => {
    render(<InputField type="text" placeholder="Enter text" value="" />);

    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  test("handles value changes", () => {
    const handleChange = jest.fn(); // Mock function
    render(
      <InputField
        type="text"
        placeholder="Enter text"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText("Enter text");

    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1); // Check if onChange has been called
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "New Value" } })
    ); // Check if the correct value is passed
  });

  test("applies correct CSS classes", () => {
    const { container } = render(
      <InputField type="text" placeholder="Enter text" />
    );

    const input = container.querySelector("input");

    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("pl-10");
    expect(input).toHaveClass("pr-3");
    expect(input).toHaveClass("py-2");
    expect(input).toHaveClass("border");
    expect(input).toHaveClass("border-gray-300");
    expect(input).toHaveClass("rounded-md");
    expect(input).toHaveClass("focus:outline-none");
    expect(input).toHaveClass("focus:ring-2");
    expect(input).toHaveClass("focus:ring-green-500");
    expect(input).toHaveClass("bg-white");
    expect(input).toHaveClass("text-gray-700");
  });
});
