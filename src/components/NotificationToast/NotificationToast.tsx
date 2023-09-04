"use client";

import type { Notification } from "@/types";

import "./NotificationToast.css";

type NotificationToastProps = {
  notification: Notification;
  onClose: () => void;
};

export const NotificationToast = ({
  notification,
  onClose,
}: NotificationToastProps) => {
  return (
    <div className="toastContainer">
      <button className="closeButton" onClick={onClose}>
        X
      </button>
      <div className="toastMessage">
        <p>{notification.message}</p>;
      </div>
    </div>
  );
};
