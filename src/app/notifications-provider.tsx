"use client";

import { createContext, useContext, useMemo, useState } from "react";

type NotificationProviderProps = {
  children: React.ReactNode;
};

type Notification = {
  movieId: string;
};

type NotificationManager = {
  notifications: Notification[];
  addNotification: (movieId: string) => void;
  removeNotification: (movieId: string) => void;
};

export const NotificationContext = createContext<NotificationManager>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const useNotifications = () => {
  const { notifications, addNotification, removeNotification } =
    useContext(NotificationContext);
  return { notifications, addNotification, removeNotification };
};

export const NotificationPopups = () => {
  const { notifications } = useNotifications();
  console.log("notifications", notifications);
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4">
      {notifications.map((notification) => (
        <p key={notification.movieId}>{notification.movieId}</p>
      ))}
    </div>
  );
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notificationState = useMemo(
    () => ({
      notifications,
      addNotification: (movieId: string) => {
        setNotifications([...notifications, { movieId }]);
      },
      removeNotification: (movieId: string) => {
        setNotifications(
          notifications.filter(
            (notification) => notification.movieId !== movieId
          )
        );
      },
    }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={notificationState}>
      <NotificationPopups />
      {children}
    </NotificationContext.Provider>
  );
};
