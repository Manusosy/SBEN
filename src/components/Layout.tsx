import { ReactNode } from "react";
import Navbar from "./Navbar";
import CookieConsent from "./CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <CookieConsent />
    </div>
  );
};

export default Layout;
