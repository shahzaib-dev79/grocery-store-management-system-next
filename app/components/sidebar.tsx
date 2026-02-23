"use client";

import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Products",
      icon: Package,
      path: "/products",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/orders",
    },
    {
      name: "Users",
      icon: Users,
      path: "/users",
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-8">Admin Menu</h2>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center gap-3 text-gray-700 px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-600 transition duration-300"
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
