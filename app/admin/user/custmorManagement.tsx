"use client";
import React, { useState } from 'react';
import { Users, Mail, Phone, ShoppingBag, MoreHorizontal, ExternalLink, Filter } from 'lucide-react';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Customer Data (Login based)
  const [customers] = useState([
    { 
      id: "CUS-8821", 
      name: "Shahzad", 
      email: "shahzad@example.com", 
      phone: "+92 300 1234567",
      totalOrders: 5, 
      lastOrder: "2026-03-22",
      spend: "$450.00",
      status: "Active" 
    },
    { 
      id: "CUS-9902", 
      name: "Ali Khan", 
      email: "ali@test.com", 
      phone: "+92 321 7654321",
      totalOrders: 2, 
      lastOrder: "2026-03-24",
      spend: "$120.50",
      status: "New" 
    },
    { 
      id: "CUS-1245", 
      name: "Sara Ahmed", 
      email: "sara@example.com", 
      phone: "+92 312 9876543",
      totalOrders: 12, 
      lastOrder: "2026-03-25",
      spend: "$1,200.00",
      status: "VIP" 
    }
  ]);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-yellow-500" /> 
            <span className="bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
              Customer Directory
            </span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Track customer spending, orders, and contact details.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2 px-4 focus:ring-1 focus:ring-green-500 outline-none transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 text-zinc-400 text-[11px] uppercase tracking-widest border-b border-zinc-800">
                <th className="p-5 font-semibold">Customer Info</th>
                <th className="p-5 font-semibold">Contact</th>
                <th className="p-5 font-semibold">Orders / Spend</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-zinc-800/20 transition-all group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-green-500 group-hover:border-green-500/50 transition-colors">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-100">{customer.name}</div>
                        <div className="text-xs text-zinc-500 font-mono">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Mail size={14} className="text-zinc-500" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Phone size={14} className="text-zinc-500" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={16} className="text-yellow-500/70" />
                      <span className="text-sm font-medium">{customer.totalOrders} Orders</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 pl-6">Total Spent: <span className="text-green-500">{customer.spend}</span></div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${
                      customer.status === 'VIP' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                      customer.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;