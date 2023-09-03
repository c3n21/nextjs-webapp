"use client";

import type { Notification } from "@/types";

export const NotificationToast = ({
  notification,
}: {
  notification: Notification;
}) => {
  return <p className="notification">{notification.message}</p>;
};
