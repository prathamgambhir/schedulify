"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { PenBox } from "lucide-react";

import { Button } from "@/components/ui/button";
import NavLogo from "../../../public/nav-logo.jpg";
import AuthContent from "./authContent";
import CreateEventDialog from "@/components/navbar/createEvent";

const navLinks = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/availability", label: "Availability" },
  { path: "/events", label: "Events" },
  { path: "/meetings", label: "Meetings" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const showFullNav = session?.user || (!isAuthPage && pathname !== "/");

  // Hamburger Icon Variants
  const iconVariants = {
    closed: { rotate: 0, y: 0 },
    opened: (custom: number) => ({
      rotate: custom === 1 ? 45 : -45,
      y: custom === 1 ? 9 : -6,
    }),
  };

  return (
    <>
      {/* dummy height */}
      <div className="h-28"></div>
      <header className="fixed top-6 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto relative">
          <nav className="flex items-center justify-between bg-white/90 backdrop-blur-md border border-black/10 shadow-lg rounded-2xl px-4 py-2 h-16 relative z-50">
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={NavLogo}
                alt="logo"
                width={130}
                height={50}
                className="w-auto h-10"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
            {showFullNav && (
              <div className="max-w-xl hidden md:flex items-center gap-6 pl-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      pathname === link.path ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {showFullNav && (
                <div className="hidden sm:block">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 border-dashed"
                  >
                    <Link href={"/events?create=true"}>
                      <PenBox className="w-4 h-4" />
                      <CreateEventDialog />
                    </Link>
                  </Button>
                </div>
              )}
              <div>
                <AuthContent />
              </div>

              {/* HAMBURGER BUTTON */}
              {showFullNav && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
                >
                  <motion.span
                    animate={isMenuOpen ? "opened" : "closed"}
                    variants={iconVariants}
                    custom={1}
                    className="w-6 h-0.5 bg-gray-600 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: isMenuOpen ? 0 : 1 }}
                    className="w-6 h-0.5 bg-gray-600 rounded-full"
                  />
                  <motion.span
                    animate={isMenuOpen ? "opened" : "closed"}
                    variants={iconVariants}
                    custom={2}
                    className="w-6 h-0.5 bg-gray-600 rounded-full"
                  />
                </button>
              )}
            </div>
          </nav>

          {/* MOBILE MENU DROPDOWN */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-20 left-0 right-0 bg-white border border-black/10 shadow-xl rounded-2xl p-4 flex flex-col gap-2 md:hidden z-40"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`p-3 rounded-xl font-medium transition-colors ${
                      pathname === link.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-100 sm:hidden">
                  <Button
                    asChild
                    className="w-full justify-start gap-2"
                    variant="ghost"
                  >
                    <Link href={"/events?create=true"}>
                      <PenBox className="w-4 h-4" />
                      <CreateEventDialog />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Navbar;
