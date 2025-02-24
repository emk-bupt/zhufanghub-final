"use client";
import React from "react";
import CompanyNavbar from "../components/CompanyNavbar";
import CompanySidebar from "../components/CompanySidebar";

const CompanyLayout = ({ children }) => {
  return (
    <div className="h-full w-full overflow-hidden bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Wrapper for the whole layout */}
      <div className="h-full w-full px-6 py-4 sm:px-10 sm:py-6">
        {/* Navbar */}
        <CompanyNavbar />
        {/* Main content area */}
        <div className="h-full w-full mt-8 mx-auto grid grid-cols-1 sm:grid-cols-8 gap-6">
          {/* Sidebar */}
          <div className="sm:col-span-2">
            <CompanySidebar />
          </div>
          {/* Content */}
          <div className="sm:col-span-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
