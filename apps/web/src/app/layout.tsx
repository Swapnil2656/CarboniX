import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import AgentChat from "@/components/admin/AgentChat";

export const metadata: Metadata = {
  title: "CarboniX | The Carbon Cost of Your Cloud",
  description:
    "Quantify, monitor, and gate your infrastructure's environmental impact. Industrial-grade carbon intelligence for modern dev teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
          <AgentChat />
        </Providers>
      </body>
    </html>
  );
}
