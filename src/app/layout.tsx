import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import NotificationToasts from "@/components/NotificationToasts";

export const metadata: Metadata = {
  title: "Movies App",
  description: "List your movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NotificationToasts />
          {children}
        </Providers>
      </body>
    </html>
  );
}
