"use client";
import { usePathname } from "next/navigation";
import MainNavbar from "./MainNavbar";

const MainNavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Hide navbar for routes starting with /dashboard
  const showNavbar = !pathname.startsWith("/dashboard");

  return (
    <>
      {showNavbar && <MainNavbar />}
      {children}
    </>
  );
};

export default MainNavbarWrapper;
