"use client";
import dashboardNavItems from "@/constants/DashboardNavLinks";
import { useAccountContext } from "@/context/AccountContext";
import { DashboardSidebarProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({ isOpen, toggleSidebar, className }: DashboardSidebarProps) {
  const path = usePathname();
  const { user, loading } = useAccountContext();

  return (
    <section
      className={`fixed md:static inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out ${className}`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-soft-ivory">Menu</h2>
          <button
            onClick={() => toggleSidebar(false)}
            className="md:hidden text-white hover:text-dusty-rose focus:outline-none transform hover:scale-110 transition-transform duration-200"
            aria-label="Close sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1">
          {dashboardNavItems.map(
            (item) =>
              item.allowedRoles.includes(user?.role as number) && (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-3 mb-2 hover:bg-white hover:text-black hover:translate-x-1 rounded-md transition-all duration-200 ${path.split("/")[2] === item.href.split("/")[2] ? "bg-white text-black translate-x-1" : ""}`}
                  onClick={() => toggleSidebar(false)}>
                  <div className="mr-3 transform hover:scale-110 transition-transform duration-200">
                    <item.Icon size={24} />
                  </div>
                  <span>{item.name}</span>
                </Link>
              )
          )}
        </nav>
      </div>
    </section>
  );
}
