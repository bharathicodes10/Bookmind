'use client';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="w-full fixed z-50 bg-('--bg-primary')">
      <div className="wrapper navbar-height py-4 flex items-center justify-between">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src="/assets/logo.png"
            alt="BookMind Logo"
            width={42}
            height={26}
          />
          <span className="logo-text">BookMind</span>
        </Link>
        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active":"text-black hover:opacity-70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
           <ClerkProvider>
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>  
          <Navbar/>
        </ClerkProvider>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
