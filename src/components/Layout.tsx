import { ReactNode } from "react";
import Navbar from "./Navbar";
// CookieConsent is already rendered via PageLayout to avoid duplicates

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
    </div>
  );
};

export default Layout;
