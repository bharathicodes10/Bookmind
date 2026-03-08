"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";
const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];
const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[var(--bg-primary)]">
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
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex gap-7.5 items-center">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <div className="nav-user-link">
              <Show when="signed-in">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </Show>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
