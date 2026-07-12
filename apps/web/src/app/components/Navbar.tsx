"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export function Navbar({ session }: { session: any }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 bg-transparent shadow-sm transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-margin py-md max-w-[1440px] mx-auto">
        <div className="flex items-center gap-xl">
          <Link href="/" className="flex items-center gap-sm">
            <Image src="/carbonix-logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="text-section-header font-display font-black text-amber-500 dark:text-primary">
              CarboniX
            </span>
          </Link>
          <div className="hidden md:flex gap-lg">

            <Link href="/docs"   className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Documentation</Link>
          </div>
        </div>
        <div className="flex items-center gap-md">
          {session ? (
            <>
              <SignOutButton />
              <Link
                href="/admin/dashboard"
                className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-primary dark:to-primary-fixed text-white dark:text-on-primary-fixed px-lg py-sm rounded-lg font-bold text-body-md hover:shadow-md hover:shadow-amber-500/20 transition-all"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-primary-container text-on-primary-fixed px-lg py-sm rounded-lg font-bold hover:opacity-80 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
