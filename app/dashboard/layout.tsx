"use client";
import Navbar from "@/components/ui/dashboard/DashboardNavbar";
import Sidebar from "@/components/ui/dashboard/DashboardSidebar";
import { useState, useEffect, useRef } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex bg-soft-ivory relative">
      {/* Blurry Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={setIsSidebarOpen}
          className="flex-none w-64 md:w-72 bg-black text-white md:block z-40 h-screen"
        />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={setIsSidebarOpen} className="bg-black text-white" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-soft-ivory overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
