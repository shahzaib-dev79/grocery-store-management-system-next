"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <Navbar setSidebarOpen={setSidebarOpen} />
        
        
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
