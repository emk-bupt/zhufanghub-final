"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LayoutProvider = ({ children }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <>
      <QueryClientProvider client={queryClient}>
      {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Navbar />}
      {children}
      {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Footer />}
      {/* for hidding the navbar and footer in login and signup screen */}
      </QueryClientProvider>
    </>
  );
};

export default LayoutProvider;
