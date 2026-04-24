import "./globals.css";
import "@/styles/theme.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "QueueSmart",
    template: "%s — QueueSmart",
  },
  description: "Book stays, explore attractions, and plan transport across Sri Lanka.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SiteHeader />
        {/* IMPORTANT: no global <main> wrapper here */}
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
