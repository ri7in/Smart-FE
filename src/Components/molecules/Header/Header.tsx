import React, { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import InputField from "../../atoms/InputField/InputField";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import IconButton from "../../atoms/IconButton/IconButton";
import SpecialCollectionPopup from "../../SpecialCollectionPopup";

const Header: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialCollectionId, setSpecialCollectionId] = useState<number | null>(
    null
  );

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (settingsOpen) setSettingsOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(searchQuery);
    if (!isNaN(id)) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/special-collections/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch special collection");
        }
        const data = await response.json();
        if (data.status === "successful" && data.results.length > 0) {
          setSpecialCollectionId(id);
        } else {
          alert("No special collection found with this ID");
        }
      } catch (err) {
        alert("Error fetching special collection");
      }
    } else {
      alert("Please enter a valid Special Collection ID");
    }
  };

  return (
    <header className="bg-[#157145] p-4 flex justify-between items-center">
      <div className="flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <InputField
            placeholder="Search Special Collection by ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Search className="text-gray-400" />
          </button>
        </form>
      </div>
      <div className="flex items-center space-x-4">
        <IconButton icon={<Bell />} onClick={toggleNotifications} />
        <NotificationDropdown
          isOpen={notificationsOpen}
          notifications={["New inquiry received.", "Service completed."]}
        />
        <IconButton icon={<Settings />} onClick={toggleSettings} />
      </div>
      {specialCollectionId && (
        <SpecialCollectionPopup
          id={specialCollectionId}
          onClose={() => setSpecialCollectionId(null)}
        />
      )}
    </header>
  );
};

export default Header;
