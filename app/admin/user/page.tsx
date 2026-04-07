"use client";
import React, { useState } from "react";
import { Shield, User, Clock, Eye, Trash2, Search } from "lucide-react";

const UserRolesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ansa Asghar",
      email: "ansa@example.com",
      role: "admin",
      lastLogin: "2026-03-25 10:00 AM",
      status: "Active",
    },
    {
      id: 2,
      name: "Shahzad",
      email: "shahzad@example.com",
      role: "user",
      lastLogin: "2026-03-24 08:30 PM",
      status: "Active",
    },
    {
      id: 3,
      name: "Ali Khan",
      email: "ali@test.com",
      role: "user",
      lastLogin: "2026-03-25 09:15 AM",
      status: "Inactive",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-linear from-green-500 to-yellow-500 bg-clip-text text-transparent">
            User Roles & Activity
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage permissions and track user login history.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Admins</p>
            <h3 className="text-xl font-bold">1</h3>
          </div>
        </div>
        <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
            <User size={24} />
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Standard Users</p>
            <h3 className="text-xl font-bold">2</h3>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-900/50 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="p-4 font-semibold text-center">User</th>
              <th className="p-4 font-semibold text-center">Role</th>
              <th className="p-4 font-semibold text-center">
                Last Login / History
              </th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-800/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 font-bold text-yellow-500">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-200">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.role === "admin"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock size={14} /> {user.lastLogin}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-zinc-600"}`}
                    ></div>
                    <span className="text-sm text-zinc-300">{user.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"
                      title="View History"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-900/20 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRolesPage;
 