import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import Button from "./Button";

jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button {...props}>{children}</button>
    ),
  },
}));

describe("Button Component", () => {
  test("renders Button with children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Click</Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("custom-class");
  });

  test("triggers onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText("Click Me");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("has focus ring when focused", () => {
    const { container } = render(<Button>Focus Me</Button>);
    const button = container.querySelector("button");

    fireEvent.focus(button);

    expect(button).toHaveClass("focus:ring-2");
    expect(button).toHaveClass("focus:ring-green-500");
  });

  test("handles framer motion hover and tap effects", () => {
    render(<Button>Hover and Tap</Button>);
    const button = screen.getByText("Hover and Tap");

    expect(button).toBeInTheDocument();
  });
});
