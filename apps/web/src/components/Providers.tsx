"use client";
import { SessionProvider } from "next-auth/react";
import { ReactLenis } from '@studio-freight/react-lenis';
import { ThemeProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <SessionProvider>
          <NextTopLoader
            color="#FFD700"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #FFD700,0 0 5px #FFD700"
          />
          {children}
        </SessionProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}
