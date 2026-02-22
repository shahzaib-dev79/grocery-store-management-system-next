"use client";

import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Welcome to Grocery Admin Panel
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your products, orders, and users efficiently.
        </p>
      </div>
    </div>
  );
}
