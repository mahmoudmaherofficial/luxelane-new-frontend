"use client"
import { DashboardNavbarProps } from "@/types";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";


export default function DashboardNavbar({ toggleSidebar, className }: DashboardNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className={`flex items-center justify-between p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => toggleSidebar((prev: boolean) => !prev)}
          className="md:hidden text-white hover:text-dusty-rose focus:outline-none transform hover:scale-110 transition-transform duration-200"
          aria-label="Toggle sidebar">
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-soft-ivory">LuxeLane Dashboard</h1>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-muted-teal hover:text-white transform hover:scale-110 transition-all duration-200"
          aria-label="User menu">
          <User size={24} />
        </button>
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-black text-soft-ivory rounded-md shadow-md py-2 z-50 transition-all duration-200 transform origin-top-right scale-95 opacity-0 md:scale-100 md:opacity-100"
            style={{
              animation: isMenuOpen ? "dropdownOpen 0.2s ease-out forwards" : "dropdownClose 0.2s ease-out forwards",
            }}>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-muted-teal hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
            <Link
              href="/logout"
              className="block px-4 py-2 hover:bg-muted-teal hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
