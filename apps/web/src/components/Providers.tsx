"use client";
import { SessionProvider } from "next-auth/react";
import { ReactLenis } from '@studio-freight/react-lenis';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}
