import React, { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import InputField from "../../atoms/InputField/InputField";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import IconButton from "../../atoms/IconButton/IconButton";

const Header: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (settingsOpen) setSettingsOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  return (
    <header className="bg-[#157145] p-4 flex justify-between items-center">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <InputField placeholder="Search a Collection..." />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <IconButton icon={<Bell />} onClick={toggleNotifications} />
        <NotificationDropdown
          isOpen={notificationsOpen}
          notifications={["New inquiry received.", "Service completed."]}
        />
        <IconButton icon={<Settings />} onClick={toggleSettings} />
      </div>
    </header>
  );
};

export default Header;
