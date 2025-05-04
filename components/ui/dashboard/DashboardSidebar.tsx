"use client";
import dashboardNavItems from "@/constants/DashboardNavLinks";

import { useAccountContext } from "@/context/AccountContext";

import { DashboardSidebarProps } from "@/types";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";

import { X, Pin } from "lucide-react";

// Memoized NavItem component to prevent unnecessary re-renders
const NavItem = memo(
  ({
    item,
    path,
    isExpanded,
    isPinned,
    handleCloseSidebar,
  }: {
    item: any;
    path: string;
    isExpanded: boolean;
    isPinned: boolean;
    handleCloseSidebar: () => void;
  }) => {
    const isActive = path.split("/")[2] === item.href.split("/")[2];

    // Precalculate all class names to avoid string concatenation during render
    const linkClassName = useMemo(() => {
      return `flex items-center p-3 mb-2 hover:bg-white hover:text-primary-800 hover:translate-x-1 rounded-md transition-all duration-200 ${
        isActive ? "bg-white text-primary-800" : ""
      } ${!isExpanded && !isPinned ? "md:justify-center" : ""} relative overflow-hidden group`;
    }, [isActive, isExpanded, isPinned]);

    const iconContainerClassName = useMemo(() => {
      return `transform transition-all duration-200 ${isExpanded || isPinned ? "mr-3" : "mr-2"} relative`;
    }, [isExpanded, isPinned]);

    const iconClassName = useMemo(() => {
      return isActive ? "text-primary-800" : "group-hover:scale-110 transition-transform duration-200";
    }, [isActive]);

    const textClassName = useMemo(() => {
      return `truncate transition-all duration-300 ${
        !isExpanded && !isPinned ? "md:opacity-0 md:w-0 md:translate-x-5" : "md:opacity-100 md:w-auto md:translate-x-0"
      }`;
    }, [isExpanded, isPinned]);

    return (
      <Link key={item.name} href={item.href} className={linkClassName} onClick={handleCloseSidebar}>
        <div className={iconContainerClassName}>
          <item.Icon size={22} className={iconClassName} />
          {isActive && !isExpanded && !isPinned && (
            <span className="absolute inset-0 rounded-md animate-ping bg-primary-800 opacity-30" />
          )}
        </div>
        <span className={textClassName}>{item.name}</span>
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";

const DashboardSidebar = ({ isOpen, toggleSidebar, className, onStateChange }: DashboardSidebarProps) => {
  const path = usePathname();

  const { user } = useAccountContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const prevHoverState = useRef(isHovering);

  // Use ResizeObserver for more efficient window resize handling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        if (mobile) {
          setIsPinned(false);
          setIsExpanded(false);
        }
      }
    };

    // Use ResizeObserver when available
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(handleResize);
      });

      resizeObserver.observe(document.body);
      handleResize(); // Initial call

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback to throttled window resize event
      let rafId: number | null = null;
      const throttledResize = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          handleResize();
          rafId = null;
        });
      };

      handleResize();
      window.addEventListener("resize", throttledResize, { passive: true });

      return () => {
        window.removeEventListener("resize", throttledResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [isMobile]);

  // Update parent component when pin/expand state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isPinned, isExpanded);
    }
  }, [isPinned, isExpanded, onStateChange]);

  // Optimized mouse enter handler with debouncing
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && !isPinned) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      // Update hovering state only if changing
      if (!prevHoverState.current) {
        setIsHovering(true);
        prevHoverState.current = true;
      }

      hoverTimeoutRef.current = setTimeout(() => setIsExpanded(true), 100);
    }
  }, [isMobile, isPinned]);

  // Optimized mouse leave handler with debouncing
  const handleMouseLeave = useCallback(() => {
    if (!isMobile && !isPinned) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      // Update hovering state only if changing
      if (prevHoverState.current) {
        setIsHovering(false);
        prevHoverState.current = false;
      }

      hoverTimeoutRef.current = setTimeout(() => setIsExpanded(false), 300);
    }
  }, [isMobile, isPinned]);

  // Toggles the pinned state of the sidebar
  const togglePin = useCallback(() => {
    setIsPinned((prev) => !prev);
    setIsExpanded((prev) => !isPinned);
  }, [isPinned]);

  // Close sidebar on mobile
  const handleCloseSidebar = useCallback(() => {
    if (isMobile) {
      toggleSidebar(false);
    }
  }, [isMobile, toggleSidebar]);

  // Memoized sidebar width class
  const sidebarWidthClass = useMemo(() => {
    return isExpanded || isPinned ? "md:w-64" : "md:w-20";
  }, [isExpanded, isPinned]);

  // Memoized filtered nav items
  const filteredNavItems = useMemo(() => {
    return dashboardNavItems.filter((item) => item.allowedRoles.includes(user?.role as number));
  }, [user?.role]);

  // Transition style for smooth animations
  const transitionStyle = useMemo(
    () => ({
      transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      willChange: "width, transform", // Hint to browser for optimizing animations
    }),
    []
  );

  // Memoized sidebar mobile class
  const sidebarMobileClass = useMemo(() => {
    if (isMobile) {
      return isOpen ? "sidebar-mobile-open" : "sidebar-mobile-closed";
    }
    return "";
  }, [isMobile, isOpen]);

  // Memoized sidebar class name
  const sidebarClassName = useMemo(() => {
    return `bg-primary-900 fixed inset-0 h-full transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 transition-all duration-300 ease-in-out ${className || ""} ${sidebarWidthClass} ${sidebarMobileClass} z-40 shadow-lg overflow-hidden`;
  }, [isOpen, className, sidebarWidthClass, sidebarMobileClass]);

  // Memoized header text class name
  const headerTextClassName = useMemo(() => {
    return `text-xl font-bold text-soft-ivory transition-all duration-300 ${
      !isExpanded && !isPinned
        ? "md:opacity-0 md:scale-90 md:translate-x-5"
        : "md:opacity-100 md:scale-100 md:translate-x-0"
    }`;
  }, [isExpanded, isPinned]);

  // Memoized pin button class name
  const pinButtonClassName = useMemo(() => {
    return `text-soft-ivory hover:text-dusty-rose focus:outline-none p-1.5 rounded-full hover:bg-primary-700 active:bg-primary-600 transition-all duration-200 ${
      isPinned ? "text-dusty-rose" : ""
    }`;
  }, [isPinned]);

  // Memoized pin icon class name
  const pinIconClassName = useMemo(() => {
    return `transition-transform duration-300 ${isPinned ? "fill-current rotate-45" : ""}`;
  }, [isPinned]);

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => {
    return filteredNavItems.map((item) => (
      <NavItem
        key={item.name}
        item={item}
        path={path}
        isExpanded={isExpanded}
        isPinned={isPinned}
        handleCloseSidebar={handleCloseSidebar}
      />
    ));
  }, [filteredNavItems, path, isExpanded, isPinned, handleCloseSidebar]);

  return (
    <section
      ref={sidebarRef}
      className={sidebarClassName}
      style={transitionStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="flex flex-col h-full p-3">
        <div className="flex items-center justify-between p-2 mb-6 rounded-lg bg-primary-800 bg-opacity-50">
          <h2 className={headerTextClassName}>Menu</h2>
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <button
                onClick={togglePin}
                className={pinButtonClassName}
                aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}>
                <Pin size={18} className={pinIconClassName} />
              </button>
            )}
            <button
              onClick={handleCloseSidebar}
              className="md:hidden text-soft-ivory hover:text-dusty-rose focus:outline-none transform hover:scale-110 active:scale-95 transition-all duration-200 p-1.5 rounded-full hover:bg-primary-700"
              aria-label="Close sidebar">
              <X size={18} />
            </button>
          </div>
        </div>
        <nav className="flex-1 bg-primary-800 bg-opacity-70 rounded-lg p-2 overflow-y-auto custom-scrollbar">
          {navItems}
        </nav>
      </div>
    </section>
  );
};

export default memo(DashboardSidebar);
