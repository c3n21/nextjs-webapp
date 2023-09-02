"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type NotificationProviderProps = {
  children: React.ReactNode;
};

type Notification = {
  message: string;
};

type NotificationManager = {
  notifications: Notification[];
  addNotification: (message: string) => Notification;
  removeNotification: (notification: Notification) => void;
  clear: () => void;
};

export const NotificationContext = createContext<NotificationManager>({
  notifications: [],
  addNotification: () => {
    throw new Error("NotificationProvider not found");
  },
  removeNotification: () => {
    throw new Error("NotificationProvider not found");
  },
  clear: () => {
    throw new Error("NotificationProvider not found");
  },
});

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationPopup = ({
  notification,
}: {
  notification: Notification;
}) => {
  return <p className="notification">{notification.message}</p>;
};

export const NotificationPopups = () => {
  const { notifications, removeNotification, clear } = useNotifications();
  const notification = notifications[0];
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        removeNotification(notification);
      }, 5000);
    }
  }, [notification, removeNotification]);

  return (
    <div className="notificationContainer">
      <button
        onClick={() => {
          clear();
        }}
      >
        Wipe notifications
      </button>
      {notifications.map((notification, index) => {
        return (
          <NotificationPopup
            // could have used index as key since the index per se carries information about notification order
            // hence you can't have two notifications with the same index at the same time
            key={`${notification.message}-${index}`}
            notification={notification}
          />
        );
      })}
    </div>
  );
};

type ActionPayload =
  | {
      type: "add" | "remove";
      payload: Notification;
    }
  | {
      type: "clear";
      payload?: never;
    };

function reducer(
  notifications: Notification[],
  { type, payload }: ActionPayload
) {
  switch (type) {
    case "add":
      return [...notifications, payload];
    case "remove":
      return notifications.filter((notification) => notification !== payload);
    case "clear":
      return [];
    default:
      return notifications;
  }
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, dispatch] = useReducer(reducer, []);

  const notificationManager = useMemo(
    () =>
      ({
        notifications,
        addNotification: (message: string) => {
          const notification = { message } as Notification;
          dispatch({
            type: "add",
            payload: notification,
          });
          return notification;
        },
        removeNotification: (notification: Notification) => {
          dispatch({ type: "remove", payload: notification });
        },
        clear: () => {
          dispatch({ type: "clear" });
        },
      } as NotificationManager),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={notificationManager}>
      <NotificationPopups />
      {children}
    </NotificationContext.Provider>
  );
};
