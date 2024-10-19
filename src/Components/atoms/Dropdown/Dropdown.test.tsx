import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for improved assertions
import Dropdown from "./Dropdown";

describe("Dropdown Component", () => {
  test("renders the dropdown when isOpen is true", () => {
    const items = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];

    render(<Dropdown isOpen={true} items={items} />);

    const dropdown = screen.getByText("Item 1").parentElement?.parentElement;

    expect(dropdown).toBeInTheDocument();
    expect(dropdown).not.toHaveClass("hidden");
  });

  test("hides the dropdown when isOpen is false", () => {
    const items = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];

    render(<Dropdown isOpen={false} items={items} />);

    const dropdown = screen.getByText("Item 1").parentElement?.parentElement;

    expect(dropdown).toHaveClass("hidden");
  });

  test("renders correct items in the dropdown", () => {
    const items = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];

    render(<Dropdown isOpen={true} items={items} />);

    const item1 = screen.getByText("Item 1");
    const item2 = screen.getByText("Item 2");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
