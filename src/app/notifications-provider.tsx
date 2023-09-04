"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

import { Notification } from "@/types";

type NotificationProviderProps = {
  children: React.ReactNode;
};

type NotificationManager = {
  notifications: Notification[];
  addNotification: (message: string) => Notification;
  removeNotification: (notification?: Notification) => void;
  clear: () => void;
};

type ActionPayload =
  | {
      type: "add";
      payload: Notification;
    }
  | {
      type: "clear";
      payload?: never;
    }
  | {
      type: "remove";
      payload?: Notification;
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

function reducer(
  notifications: Notification[],
  { type, payload }: ActionPayload
) {
  switch (type) {
    case "add":
      return [...notifications, payload];
    case "remove":
      if (!payload) {
        return notifications.slice(1);
      }
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
      {children}
    </NotificationContext.Provider>
  );
};
