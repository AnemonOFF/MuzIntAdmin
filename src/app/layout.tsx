import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/shared/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "МузИнт - %s",
    default: "МузИнт - музыкальная интуиция",
  },
  description: "Игра - музыкальная интуиция",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} antialiased scroll-smooth`}>
        <Toaster position="top-right" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
