import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import StatCard from "./StatCard";

describe("StatCard Component", () => {
  const title = "Total Sales";
  const value = 1500;
  const icon = <span data-testid="icon">💰</span>;

  test("renders title, value, and icon correctly", () => {
    render(<StatCard title={title} value={value} icon={icon} />);

    const titleElement = screen.getByText(title);
    const valueElement = screen.getByText(value.toString());
    const iconElement = screen.getByTestId("icon");

    expect(titleElement).toBeInTheDocument(); // Check if the title is rendered
    expect(valueElement).toBeInTheDocument(); // Check if the value is rendered
    expect(iconElement).toBeInTheDocument(); // Check if the icon is rendered
  });

  test("displays the correct value format", () => {
    render(<StatCard title={title} value={value} icon={icon} />);

    expect(screen.getByText(value.toString())).toBeInTheDocument(); // Ensure value is displayed correctly
  });

  test("has correct structure and classes", () => {
    const { container } = render(
      <StatCard title={title} value={value} icon={icon} />
    );

    const cardDiv = container.querySelector("div.bg-white");
    expect(cardDiv).toBeInTheDocument();
    expect(cardDiv).toHaveClass(
      "p-4",
      "rounded-lg",
      "shadow-md",
      "flex",
      "items-center",
      "justify-between",
      "transition-all",
      "duration-300",
      "hover:shadow-lg"
    );
  });
});
