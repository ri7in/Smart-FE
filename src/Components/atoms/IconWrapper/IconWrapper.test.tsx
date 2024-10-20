import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import IconWrapper from "./IconWrapper";

describe("IconWrapper Component", () => {
  test("renders children inside the wrapper", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    render(
      <IconWrapper>
        <TestIcon />
      </IconWrapper>
    );

    const icon = screen.getByTestId("test-icon");

    expect(icon).toBeInTheDocument(); // Check if the icon is rendered
  });

  test("applies the correct CSS classes", () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;

    const { container } = render(
      <IconWrapper>
        <TestIcon />
      </IconWrapper>
    );

    const wrapper = container.querySelector("span");

    expect(wrapper).toHaveClass("absolute");
    expect(wrapper).toHaveClass("inset-y-0");
    expect(wrapper).toHaveClass("left-0");
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("items-center");
    expect(wrapper).toHaveClass("pl-3");
    expect(wrapper).toHaveClass("text-gray-400");
  });
});
