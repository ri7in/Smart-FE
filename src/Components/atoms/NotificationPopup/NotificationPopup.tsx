import React from "react";

interface NotificationPopupProps {
  notifications: { message: string }[];
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications,
  onClose,
}) => (
  <div className="absolute right-0 bg-white shadow-lg rounded mt-2 p-2 w-48 z-10 border border-gray-300">
    <div className="flex flex-col">
      {notifications.map((notification, index) => (
        <div key={index} className="flex items-center justify-between p-1">
          <span className="text-black">{notification.message}</span>
          <span className="bg-red-500 rounded-full h-2 w-2" />
        </div>
      ))}
    </div>
  </div>
);

export default NotificationPopup;
