"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { marketingService } from '../../services/marketingServices';
import AddMarketingModal from '../components/addMarketingModal';
import Swal from 'sweetalert2';
import { 
  MegaphoneIcon, 
  PlusIcon, 
  ArrowLeftIcon, 
  TrashIcon, 
  TagIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const MarketingPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5000';

  const loadData = async () => {
    try {
      const res = await marketingService.getAll();
      setItems(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This product info will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await marketingService.delete(id);
          // Success alert yahan se remove kar diya gaya hai
          loadData();
        } catch (err) {
          console.error("Delete error:", err);
        }
      }
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-100 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-gray-800 text-xl">
             <div className="bg-[#22c55e] p-1 rounded-lg">
                <ShoppingBagIcon className="w-6 h-6 text-white" />
             </div>
             GroceryHub
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><XMarkIcon className="w-6 h-6" /></button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase px-4 mb-2 tracking-widest">Admin Menu</p>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-green-50 hover:text-[#22c55e] rounded-xl transition-all cursor-pointer font-bold">
            <Squares2X2Icon className="w-5 h-5" /> Dashboard
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-green-50 hover:text-[#22c55e] rounded-xl transition-all cursor-pointer font-bold">
            <ShoppingBagIcon className="w-5 h-5" /> Products
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 text-[#22c55e] rounded-xl transition-all cursor-pointer font-bold">
            <MegaphoneIcon className="w-5 h-5" /> Marketing
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-green-50 hover:text-[#22c55e] rounded-xl transition-all cursor-pointer font-bold">
            <ClipboardDocumentListIcon className="w-5 h-5" /> Orders
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-green-50 hover:text-[#22c55e] rounded-xl transition-all cursor-pointer font-bold">
            <UsersIcon className="w-5 h-5" /> Users
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-green-500 rounded-lg text-white">
                <Bars3Icon className="w-5 h-5" />
             </button>
             <h2 className="font-bold text-gray-700 hidden md:block">Marketing Hub</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-500">
                <span className="cursor-pointer hover:text-green-500 transition">Dashboard</span>
                <span className="cursor-pointer hover:text-green-500 transition text-green-500">Products</span>
                <span className="cursor-pointer hover:text-green-500 transition">Orders</span>
             </div>
             <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-green-500"></div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/admin')} 
                className="p-3 bg-white rounded-xl border border-gray-100 hover:bg-green-50 transition-all group shadow-sm"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-400 group-hover:text-[#22c55e]" />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Marketing Hub</h1>
                <p className="text-slate-500 text-sm font-medium">Manage your grocery prices and discounts</p>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#22c55e] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 hover:scale-105 transition-all"
            >
              <PlusIcon className="w-5 h-5" /> Create New Entry
            </button>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Product Name</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Original Price</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Discount</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Final Price</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Special Offers</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.length > 0 ? items.map((item) => {
                    const originalPrice = Number(item.price) || 0;
                    const discountValue = Number(item.value) || 0;
                    const finalPrice = originalPrice - (originalPrice * discountValue / 100);

                    return (
                      <tr key={item._id} className="hover:bg-green-50/20 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                               {item.image && (
                                 <img src={`${IMG_URL}/${item.image?.replace(/\\/g, '/')}`} className="w-full h-full object-cover" alt="item" />
                               )}
                            </div>
                            <div>
                               <div className="font-bold text-slate-700 uppercase text-sm">{item.title}</div>
                               <div className="text-[10px] text-[#22c55e] font-black tracking-widest uppercase">{item.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-center font-medium text-gray-400 line-through">Rs.{originalPrice}</td>
                        <td className="p-5 text-center">
                          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-[10px] font-black uppercase">
                             -{discountValue}%
                          </span>
                        </td>
                        <td className="p-5 text-center font-black text-slate-800">Rs.{finalPrice}</td>
                        <td className="p-5">
                          <div className="flex items-center gap-2 text-[#22c55e] font-bold text-xs uppercase italic">
                            <TagIcon className="w-4 h-4" /> {item.code || 'Flat Sale'}
                          </div>
                        </td>
                        <td className="p-5 text-right">
                          <button 
                            onClick={() => handleDelete(item._id)} 
                            className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={6} className="p-20 text-center">
                        <MegaphoneIcon className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No Marketing Data Found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <AddMarketingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        refresh={loadData} 
      />
    </div>
  );
};

export default MarketingPage;