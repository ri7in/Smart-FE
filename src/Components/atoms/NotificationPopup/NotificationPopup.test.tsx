import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For improved assertions
import NotificationPopup from "./NotificationPopup";

describe("NotificationPopup Component", () => {
  const notifications = [
    { message: "Notification 1" },
    { message: "Notification 2" },
  ];

  test("renders the correct number of notifications", () => {
    render(
      <NotificationPopup notifications={notifications} onClose={() => {}} />
    );

    const notificationItems = screen.getAllByText(/Notification/i);

    expect(notificationItems.length).toBe(notifications.length); // Check if the correct number of notifications are rendered
  });

  test("displays notification messages correctly", () => {
    render(
      <NotificationPopup notifications={notifications} onClose={() => {}} />
    );

    notifications.forEach((notification) => {
      expect(screen.getByText(notification.message)).toBeInTheDocument(); // Check if each message is rendered
    });
  });

  test("calls onClose when close is triggered (assuming you add close functionality)", () => {
    const handleClose = jest.fn();

    render(
      <NotificationPopup notifications={notifications} onClose={handleClose} />
    );

    fireEvent.click(screen.getByText("Close")); // This assumes you have a button with text "Close"

    expect(handleClose).toHaveBeenCalledTimes(1); // Check if the close handler was called
  });

  test("has correct structure and classes", () => {
    const { container } = render(
      <NotificationPopup notifications={notifications} onClose={() => {}} />
    );

    const popupDiv = container.querySelector("div.absolute"); // Get the outer div
    expect(popupDiv).toBeInTheDocument();
    expect(popupDiv).toHaveClass(
      "right-0",
      "bg-white",
      "shadow-lg",
      "rounded",
      "mt-2",
      "p-2",
      "w-48",
      "z-10",
      "border",
      "border-gray-300"
    );

    const notificationDivs = container.querySelectorAll(
      "div.flex.items-center.justify-between"
    );
    expect(notificationDivs.length).toBe(notifications.length); // Each notification should be a flex item
  });
});
