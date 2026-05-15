import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workora AI — European Employment Intelligence",
  description: "Premium information-only EU employment intelligence with verified-data gate, salary simulator UI, enterprise dashboard and Workora lead funnel."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
