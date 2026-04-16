"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { marketingService } from '../../services/marketingServices';
import AddMarketingModal from '../components/addMarketingModal';
import Sidebar from '../components/sidebar'; 
import Navbar from '../components/navbar';   
import Swal from 'sweetalert2';
import { 
  TrashIcon, 
  TagIcon,
  PlusIcon,
  ArrowLeftIcon,
  MegaphoneIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const MarketingPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

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
      text: "This marketing offer will be removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await marketingService.delete(id);
          loadData(); 
        } catch (err) {
          console.error("Delete error:", err);
        }
      }
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 text-slate-800">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => router.push('/admin')} className="p-3 bg-white rounded-xl border border-gray-100 hover:bg-green-50 transition-all shadow-sm group">
                  <ArrowLeftIcon className="w-5 h-5 text-gray-400 group-hover:text-[#22c55e]" />
                </button>
                <div>
                  <h1 className="text-2xl font-black tracking-tight">Marketing Hub</h1>
                  <p className="text-slate-500 text-xs font-medium">Manage grocery discounts and offers</p>
                </div>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="bg-[#22c55e] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-sm">
                <PlusIcon className="w-5 h-5" /> Create New Entry
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Original Price</th>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Discount</th>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Final Price</th>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Offer Code</th>
                      <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {items.length > 0 ? items.map((item) => {
                      
                      const originalPrice = Number(item.price) || 0;
                      const discountVal = Number(item.value) || 0;
                      const finalPrice = originalPrice - (originalPrice * discountVal / 100);

                      return (
                        <tr key={item._id} className="hover:bg-green-50/10 transition-colors">
                          <td className="p-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">
                                {item.image ? (
                                    <img src={`${IMG_URL}/${item.image?.replace(/\\/g, '/')}`} className="w-full h-full object-cover" alt="img" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                        <ShoppingBagIcon className="w-5 h-5" />
                                    </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-700 uppercase">{item.title || 'Untitled'}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{item.type || 'Campaign'}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-5 text-center text-gray-400 line-through font-medium">
                            Rs.{originalPrice.toLocaleString()}
                          </td>

                          <td className="p-5 text-center">
                            <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-[10px] font-black">
                              -{discountVal}%
                            </span>
                          </td>

                          <td className="p-5 text-center font-black text-slate-900">
                            Rs.{finalPrice > 0 ? finalPrice.toLocaleString() : originalPrice.toLocaleString()}
                          </td>

                          <td className="p-5 text-center">
                            <div className="inline-flex items-center gap-1 bg-green-50 text-[#22c55e] px-3 py-1 rounded-full text-[10px] font-bold border border-green-100 uppercase italic">
                              <TagIcon className="w-3 h-3" /> {item.code || 'Flat Sale'}
                            </div>
                          </td>

                          <td className="p-5 text-right">
                            <button onClick={() => handleDelete(item._id)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={6} className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">No Data Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddMarketingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refresh={loadData} />
    </div>
  );
};

export default MarketingPage;