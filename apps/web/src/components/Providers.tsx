"use client";
import { SessionProvider } from "next-auth/react";
import { ReactLenis } from '@studio-freight/react-lenis';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <SessionProvider>{children}</SessionProvider>
    </ReactLenis>
  );
}
