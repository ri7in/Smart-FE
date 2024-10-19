import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import ListItem from "./ListItem";

describe("ListItem Component", () => {
  test("renders the message prop correctly", () => {
    const message = "Test Message";

    render(<ListItem message={message} />);

    const messageElement = screen.getByText(message);

    expect(messageElement).toBeInTheDocument(); // Check if the message is rendered
  });

  test("applies correct CSS classes", () => {
    const message = "Test Message";

    const { container } = render(<ListItem message={message} />);

    const listItem = container.querySelector("div"); // Get the main div
    const spanElement = listItem?.querySelector("span"); // Get the message span
    const dotElement = listItem?.querySelectorAll("span")[1]; // Get the dot span

    expect(listItem).toHaveClass("flex");
    expect(listItem).toHaveClass("items-center");
    expect(listItem).toHaveClass("justify-between");
    expect(listItem).toHaveClass("p-1");

    expect(spanElement).toHaveClass("text-black"); // Check the message span class
    expect(dotElement).toHaveClass("bg-red-500");
    expect(dotElement).toHaveClass("rounded-full");
    expect(dotElement).toHaveClass("h-2");
    expect(dotElement).toHaveClass("w-2");
  });
});
