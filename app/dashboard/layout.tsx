"use client";
import Navbar from "@/components/ui/dashboard/DashboardNavbar";
import Sidebar from "@/components/ui/dashboard/DashboardSidebar";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";

// Memoized overlay component to prevent unnecessary re-renders
const MobileOverlay = memo(({ isVisible, onClick }: { isVisible: boolean; onClick: () => void }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 transition-opacity duration-300 animate-fadeIn"
      style={{
        animation: "fadeIn 0.3s ease-out forwards",
        backdropFilter: "blur(2px)",
        willChange: "opacity, backdrop-filter",
      }}
      onClick={onClick}
    />
  );
});

MobileOverlay.displayName = "MobileOverlay";

// Memoized main content wrapper
const MainContent = memo(
  ({
    margin,
    transitionStyle,
    toggleSidebar,
    isSidebarOpen,
    children,
  }: {
    margin: string;
    transitionStyle: React.CSSProperties;
    toggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void;
    isSidebarOpen: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={`flex-1 flex flex-col overflow-hidden z-10 transition-all duration-300 ease-in-out ${margin}`}
        style={transitionStyle}>
        <Navbar toggleSidebar={toggleSidebar} className="bg-primary-900 text-white" isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-soft-ivory overflow-y-auto custom-scrollbar">{children}</main>
      </div>
    );
  }
);

MainContent.displayName = "MainContent";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Initial state for sidebar - collapsed by default on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const didInitialize = useRef(false);

  // Handle resize and mobile detection - optimized with throttling, RequestAnimationFrame, and ResizeObserver
  useEffect(() => {
    if (didInitialize.current) return;
    didInitialize.current = true;

    let rafId: number | null = null;
    let resizeTimer: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (resizeTimer) return;

      resizeTimer = setTimeout(() => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          const mobile = window.innerWidth < 1024;
          if (mobile !== isMobile) {
            setIsMobile(mobile);
            // Keep sidebar visible but collapsed (icons only) on desktop
            if (!mobile) {
              setIsSidebarOpen(true); // Show sidebar on desktop
              document.body.style.overflow = "";
            } else {
              setIsSidebarOpen(false); // Hide sidebar on mobile by default
              setIsPinned(false);
              setIsExpanded(false);
              document.body.style.overflow = "";
            }
          }
          rafId = null;
        });

        resizeTimer = null;
      }, 100); // Throttle resize events
    };

    // Use ResizeObserver if available for better performance
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(handleResize);
      });

      resizeObserver.observe(document.body);
      handleResize(); // Initial call to set correct state

      return () => {
        resizeObserver.disconnect();
        if (resizeTimer) clearTimeout(resizeTimer);
        if (rafId) cancelAnimationFrame(rafId);
      };
    } else {
      // Fallback to window resize event
      handleResize();
      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        window.removeEventListener("resize", handleResize);
        if (resizeTimer) clearTimeout(resizeTimer);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [isMobile]);

  // Handle clicks outside sidebar on mobile - memoized
  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Memoized toggle function
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

  // Memoized sidebar state handler
  const handleSidebarState = useCallback((pinned: boolean, expanded: boolean) => {
    setIsPinned(pinned);
    setIsExpanded(expanded);
  }, []);

  // Memoized content margin calculator
  const contentMargin = useMemo(() => {
    if (isMobile) return "";
    if (isPinned || isExpanded) return "md:ml-64";
    return "md:ml-20";
  }, [isMobile, isPinned, isExpanded]);

  // Memoized transition style
  const transitionStyle = useMemo(
    () => ({
      transition: "margin-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      willChange: "margin-left",
    }),
    []
  );

  // Memoized overlay click handler
  const handleOverlayClick = useCallback(() => {
    toggleSidebar(false);
  }, [toggleSidebar]);

  return (
    <div className="min-h-screen flex bg-soft-ivory relative">
      {/* Overlay for mobile sidebar */}
      <MobileOverlay isVisible={isMobile && isSidebarOpen} onClick={handleOverlayClick} />

      {/* Sidebar */}
      <div ref={sidebarRef} className="z-40">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className="flex-none bg-primary-900 text-white"
          onStateChange={handleSidebarState}
        />
      </div>

      {/* Main content */}
      <MainContent
        margin={contentMargin}
        transitionStyle={transitionStyle}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        children={children}
      />
    </div>
  );
};

export default memo(DashboardLayout);
