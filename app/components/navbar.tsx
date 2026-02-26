"use client";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type NavbarProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Users", path: "/users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Hamburger → always visible */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-green-600 text-white p-2 rounded-md shadow hover:bg-green-700 transition"
          >
            <Menu size={22} />
          </button>

          <ShoppingCart size={30} className="text-green-600" />
          <span className="text-xl font-bold text-gray-800">GroceryHub</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Right Hamburger → mobile links only */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-green-600 text-white p-2 rounded-md shadow hover:bg-green-700 transition"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 text-red-500 hover:bg-red-100 transition text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}