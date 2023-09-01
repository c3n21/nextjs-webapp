import { FavoriteProvider } from "./favorites-provider";
import { NotificationProvider } from "./notifications-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotificationProvider>
        <FavoriteProvider>{children}</FavoriteProvider>
      </NotificationProvider>
    </>
  );
};
