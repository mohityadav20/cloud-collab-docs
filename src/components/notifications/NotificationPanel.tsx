import React, { useState } from 'react';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning';
}

/**
 * Notification panel component
 * Displays real-time notifications for document updates
 */
const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add notification function (can be called from elsewhere)
  // const addNotification = (message: string, type: Notification['type'] = 'info') => {
  //   const notification: Notification = {
  //     id: Date.now().toString(),
  //     message,
  //     timestamp: new Date(),
  //     type,
  //   };
  //   setNotifications((prev) => [notification, ...prev].slice(0, 5));
  //   setTimeout(() => {
  //     setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
  //   }, 5000);
  // };

  /**
   * Remove notification
   */
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 ${
            notification.type === 'success'
              ? 'border-green-500'
              : notification.type === 'warning'
              ? 'border-yellow-500'
              : 'border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-700">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;

