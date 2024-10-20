import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import NavItem from "./NavItem";

describe("NavItem Component", () => {
  test("renders icon and text correctly", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    const text = "Home";

    render(
      <NavItem
        icon={<TestIcon />}
        text={text}
        active={false}
        onClick={() => {}}
      />
    );

    const icon = screen.getByTestId("test-icon");
    const navText = screen.getByText(text);

    expect(icon).toBeInTheDocument(); // Check if the icon is rendered
    expect(navText).toBeInTheDocument(); // Check if the text is rendered
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    const text = "Home";

    render(
      <NavItem
        icon={<span>🔍</span>}
        text={text}
        active={false}
        onClick={handleClick}
      />
    );

    const navItem = screen.getByText(text);
    fireEvent.click(navItem); // Simulate a click event

    expect(handleClick).toHaveBeenCalledTimes(1); // Check if the click handler is called
  });

  test("applies active class correctly", () => {
    const text = "Home";

    const { container } = render(
      <NavItem
        icon={<span>🔍</span>}
        text={text}
        active={true}
        onClick={() => {}}
      />
    );

    const navItem = container.querySelector("div");
    expect(navItem).toHaveClass("bg-green-600"); // Check if the active class is applied
  });

  test("applies hover class when not active", () => {
    const text = "Home";

    const { container } = render(
      <NavItem
        icon={<span>🔍</span>}
        text={text}
        active={false}
        onClick={() => {}}
      />
    );

    const navItem = container.querySelector("div");
    expect(navItem).not.toHaveClass("bg-green-600");
  });
});
