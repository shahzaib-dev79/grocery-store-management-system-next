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
  TicketIcon, 
  PhotoIcon 
} from '@heroicons/react/24/outline';

const MarketingPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      text: "This tool will be permanently removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await marketingService.delete(id);
        Swal.fire('Deleted!', 'Tool removed successfully.', 'success');
        loadData();
      }
    });
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin')} 
            className="p-3 bg-white rounded-2xl shadow-sm hover:bg-indigo-50 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <MegaphoneIcon className="w-8 h-8 text-indigo-600" /> Marketing Hub
            </h1>
            <p className="text-slate-500 font-medium">Manage your store promotions and banners</p>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 hover:scale-105 transition-all"
        >
          <PlusIcon className="w-5 h-5" /> Create New Tool
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? items.map((item) => (
          <div key={item._id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:border-indigo-200 transition-all">
            {item.type === 'banner' ? (
              <div className="h-44 bg-slate-100 relative">
                <img 
                  src={`${IMG_URL}/${item.image?.replace(/\\/g, '/')}`} 
                  className="w-full h-full object-cover" 
                  alt="Banner" 
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com"; }}
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">Banner</div>
              </div>
            ) : (
              <div className="h-44 bg-indigo-50 flex flex-col items-center justify-center p-6 border-b border-indigo-100">
                <TicketIcon className="w-12 h-12 text-indigo-300 mb-2" />
                <span className="bg-white px-4 py-2 rounded-xl font-mono font-black text-indigo-600 text-xl shadow-sm">{item.code}</span>
                <span className="text-xs font-bold text-indigo-400 mt-2 uppercase tracking-widest">{item.value}% Discount</span>
              </div>
            )}

            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-700 uppercase tracking-tight">{item.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{item.type}</p>
              </div>
              <button 
                onClick={() => handleDelete(item._id)} 
                className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full bg-white border-2 border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
            <MegaphoneIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Marketing Tools Active</p>
          </div>
        )}
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
