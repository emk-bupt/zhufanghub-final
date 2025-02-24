"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider

const LayoutProvider = ({ children }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    // Wrap the layout with ThemeProvider
    <ThemeProvider enableSystem={true} attribute="class">
      <QueryClientProvider client={queryClient}>
        {/* Conditionally render Navbar and Footer */}
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") &&  !pathname.includes("/company") && <Navbar />}
        
        {/* Render children (the page content) */}
        {children}
        
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && !pathname.includes("/company") && <Footer />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default LayoutProvider;
