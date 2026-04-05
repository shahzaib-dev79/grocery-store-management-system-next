"use client";

import React from "react";
import AnalyticsPage from "../components/analytics";
import { OrderByDayChart } from "../components/charts";

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Welcome to Grocery Admin Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your products, orders, and users efficiently.
          </p>
        </div>
      </div>

      <AnalyticsPage />
    </div>
  );
}
