"use client";
import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import Navbar from "@/components/ui/dashboard/DashboardNavbar";
import Sidebar from "@/components/ui/dashboard/DashboardSidebar";

const MobileOverlay = memo(({ isVisible, onClick }: { isVisible: boolean; onClick: () => void }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 transition-opacity duration-300"
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onClick}
    />
  );
});
MobileOverlay.displayName = "MobileOverlay";

const MainContent = memo(
  ({
    margin,
    toggleSidebar,
    isSidebarOpen,
    children,
  }: {
    margin: string;
    toggleSidebar: Function;
    isSidebarOpen: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <div className={`flex-1 flex flex-col overflow-hidden z-10 transition-all duration-300 ${margin}`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} className="bg-primary-900 text-white" />
        <main className="flex-1 bg-soft-ivory overflow-y-auto custom-scrollbar">{children}</main>
      </div>
    );
  }
);
MainContent.displayName = "MainContent";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // إذا كان العرض أقل من أو يساوي 768، نعتبره موبايل
      if (width <= 768) {
        setIsSidebarOpen(false); // إخفاء السايدبار في الموبايل بشكل افتراضي
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setIsSidebarOpen((prev) => {
        const newValue = typeof value === "function" ? value(prev) : value;
        if (isMobile) {
          document.body.style.overflow = newValue ? "hidden" : "";
        }
        return newValue;
      });
    },
    [isMobile]
  );

  const contentMargin = useMemo(() => {
    return isMobile ? "ml-0" : isSidebarOpen ? "ml-64" : "ml-20";
  }, [isSidebarOpen, isMobile]);

  return (
    <div className="min-h-screen flex bg-soft-ivory relative">
      <MobileOverlay isVisible={isMobile && isSidebarOpen} onClick={() => toggleSidebar(false)} />

      <div
        ref={sidebarRef}
        className={`z-40 fixed h-full transition-all duration-300 ${!isSidebarOpen && isMobile ? "hidden" : ""}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="flex-none bg-primary-900 text-white" />
      </div>

      <MainContent margin={contentMargin} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
        {children}
      </MainContent>
    </div>
  );
};

export default memo(DashboardLayout);
