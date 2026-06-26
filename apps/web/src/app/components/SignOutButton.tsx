"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-on-surface-variant hover:text-error transition-colors font-body-md bg-transparent border-none cursor-pointer"
    >
      Sign Out
    </button>
  );
}
