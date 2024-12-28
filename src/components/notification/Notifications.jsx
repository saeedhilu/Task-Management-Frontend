import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import useNotificationWebSocket from "@/hooks/useNotifications";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaBell } from "react-icons/fa";
import fetchNotifications from "@/services/user/Notification";
import NotificationSound from "./NotificationSound";

const MyNotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);
  console.log('notification is L:', notifications);
  const queryClient = useQueryClient();
  const { data: fetchedNotifications, refetch } = useQuery("notifications", fetchNotifications, {
    onSuccess: (data) => {
      setNotifications(data.results);
      queryClient.invalidateQueries('tasks');
    },
  });

  const addNotification = (notification) => {
    console.log('Heyyyyyyyy');

    NotificationSound().playSound();

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  useNotificationWebSocket(addNotification);

  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications.results);
    }
  }, [fetchedNotifications]);

  return (
    <div className="relative">
      <Dialog >
        <DialogTrigger asChild>
          <button className="relative focus:outline-none">
            <FaBell className="w-6 h-6 text-gray-500" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold  bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
        </DialogTrigger>

        <DialogContent className="p-4 max-w-md mx-auto rounded-lg shadow-lg overflow-auto max-h-[500px]">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="divide-y divide-gray-200">
            {notifications.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {notifications.map((notif, index) => (
                  <li key={notif.id || index} className="p-2">
                    <span className="font-bold">Task ID:</span> {notif.id}
                    <br />
                    <span className="">{notif.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center ">No notifications yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyNotificationsComponent;
