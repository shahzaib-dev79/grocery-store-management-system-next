"use client";
import React, { useState } from 'react';
import { marketingService } from '../../services/marketingServices';
import { X, Image as ImageIcon, Ticket } from 'lucide-react';

export default function AddMarketingModal({ isOpen, onClose, refresh }: any) {
  const [type, setType] = useState<'discount' | 'banner'>('discount');
  const [form, setForm] = useState({ title: '', code: '', value: 0 });
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', type);
    data.append('title', form.title);
    
    if (type === 'discount') {
      data.append('code', form.code);
      data.append('value', String(form.value));
    }
    
    if (file) data.append('image', file);

    try {
      // API call to create
      await marketingService.create(data);
      
      // Removed Swal.fire ('Zabardast!') alert from here
      
      // Directly close and refresh
      onClose();
      refresh();
      
      // Reset local state for next time
      setForm({ title: '', code: '', value: 0 });
      setFile(null);
    } catch (err) {
      console.error("Create karne mein masla hua:", err);
      // Optional: Error alert rehne dein taake user ko pata chale agar fail ho
      // Swal.fire('Error', 'Technical issue.', 'error'); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Add Marketing Tool</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              type="button" 
              onClick={() => setType('discount')} 
              className={`flex-1 py-2 rounded-md font-bold text-xs flex items-center justify-center gap-2 transition-all ${type === 'discount' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}
            >
              <Ticket size={16} /> Discount
            </button>
            <button 
              type="button" 
              onClick={() => setType('banner')} 
              className={`flex-1 py-2 rounded-md font-bold text-xs flex items-center justify-center gap-2 transition-all ${type === 'banner' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}
            >
              <ImageIcon size={16} /> Banner
            </button>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Title</label>
            <input 
              placeholder="e.g. Eid Sale" 
              className="w-full mt-1 border p-3 rounded-xl outline-none focus:border-green-500 transition-colors" 
              onChange={e => setForm({...form, title: e.target.value})} 
              required 
            />
          </div>
          
          {type === 'discount' ? (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Code</label>
                <input 
                  placeholder="SAVE30" 
                  className="w-full mt-1 border p-3 rounded-xl outline-none uppercase font-mono focus:border-green-500" 
                  onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} 
                />
              </div>
              <div className="w-24">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Value %</label>
                <input 
                  type="number" 
                  placeholder="30" 
                  className="w-full mt-1 border p-3 rounded-xl outline-none focus:border-green-500" 
                  onChange={e => setForm({...form, value: Number(e.target.value)})} 
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Banner Image</label>
              <input 
                type="file" 
                className="w-full mt-1 border p-3 rounded-xl border-dashed hover:bg-gray-50 cursor-pointer" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            Save Marketing Tool
          </button>
        </form>
      </div>
    </div>
  );
}