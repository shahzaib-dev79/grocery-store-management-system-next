"use client";

import { useEffect, useState } from "react";
import http from "@/services/http";
import axios from "axios";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  date: string;
  value: number;
};

export function OrderByDayChart({ data }: { data: any[] }) {
  const formatted = data.map((item) => ({
    date: item._id,
    value: item.totalRevenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formatted}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" />
      </LineChart>
    </ResponsiveContainer>
  );
}
