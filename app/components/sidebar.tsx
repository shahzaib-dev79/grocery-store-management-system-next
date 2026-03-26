"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Megaphone,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({ isOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Marketing", icon: Megaphone, path: "/marketingtool" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Users", icon: Users, path: "/users" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <div className="p-6 mt-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-8">
            Admin Menu
          </h2>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-green-100 text-green-600 font-bold"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
