import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./styles/globals.css";
import "./styles/tailwind.css";
import { ToastContainer } from "react-toastify";
import MainNavbar from "@/components/ui/MainNavbar";
import { AccountProvider } from "@/context/AccountContext";

const merriweather = Merriweather_Sans({
  subsets: ["latin"],
});

export const metadata = (): Metadata => ({
  title: {
    template: "%s | LuxeLane",
    default: "LuxeLane",
  },
  description: "Your one-stop destination for luxury fashion and accessories. Shop the latest trends and exclusive collections today!",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css" />
      </head>
      <body className={merriweather.className}>
        <AccountProvider>
          <main>
            <MainNavbar />
            <ToastContainer />
            {children}
          </main>
        </AccountProvider>
      </body>
    </html>
  );
}
