"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const gridStyle = { stroke: "#e5e7eb", strokeDasharray: "3 3" };
const axisStyle = {
  stroke: "#9ca3af",
  tick: { fill: "#6b7280", fontSize: 12 },
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export function OrderByDayChart({ data }: { data: any[] }) {
  const formatted = data.map((item) => ({
    date: item._id,
    revenue: item.totalRevenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formatted}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="date" {...axisStyle} />
        <YAxis {...axisStyle} />
        <Tooltip {...tooltipStyle} />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#16a34a"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function OrderTrendChart({ data }: { data: any[] }) {
  const formatted = data.map((item) => ({
    date: item._id,
    orders: item.totalOrders,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formatted}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="date" {...axisStyle} />
        <YAxis {...axisStyle} />
        <Tooltip {...tooltipStyle} />

        <Line
          type="monotone"
          dataKey="orders"
          stroke="#3b82f6"
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TopProductsChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="name" {...axisStyle} />
        <YAxis {...axisStyle} />
        <Tooltip {...tooltipStyle} />

        <Bar dataKey="sold" fill="#16a34a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
