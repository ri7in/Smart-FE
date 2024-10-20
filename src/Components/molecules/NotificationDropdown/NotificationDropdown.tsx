import React from "react";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import ListItem from "../../atoms/ListItem/ListItem";

interface NotificationDropdownProps {
  isOpen: boolean;
  notifications: string[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  notifications,
}) => (
  <Dropdown
    isOpen={isOpen}
    items={notifications.map((message, index) => (
      <ListItem key={index} message={message} />
    ))}
  />
);

export default NotificationDropdown;
