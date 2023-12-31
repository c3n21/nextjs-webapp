"use client";

import { useNotifications } from "@/app/notifications-provider";
import { useEffect, useRef } from "react";
import { NotificationToast } from "../NotificationToast/NotificationToast";

import "./NotificationToasts.css";

export const NotificationToasts = () => {
  const { notifications, removeNotification } = useNotifications();
  const scheduledRemovals = useRef(0);

  useEffect(() => {
    if (
      notifications.length > 0 &&
      // this is to avoid scheduling more removals than notifications
      scheduledRemovals.current < notifications.length
    ) {
      scheduledRemovals.current++;
      setTimeout(() => {
        removeNotification();
        scheduledRemovals.current--;
      }, 5000);
    }
  }, [notifications.length, removeNotification]);

  return (
    <div className="notificationContainer" aria-live="polite">
      {notifications.map((notification, index) => {
        return (
          <NotificationToast
            onClose={() => {
              removeNotification(notification);
            }}
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
