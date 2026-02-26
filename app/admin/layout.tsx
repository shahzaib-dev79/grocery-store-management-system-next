"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}