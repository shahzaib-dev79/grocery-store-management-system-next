"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
      await marketingService.create(data);
      Swal.fire('Zabardast!', 'Marketing tool create ho gaya.', 'success');
      onClose();
      refresh();
    } catch (err) {
      Swal.fire('Error', 'Create karne mein masla hua.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add Marketing Tool</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button type="button" onClick={() => setType('discount')} className={`flex-1 py-2 rounded-md font-bold text-xs flex items-center justify-center gap-2 ${type === 'discount' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}><Ticket size={16} /> Discount</button>
            <button type="button" onClick={() => setType('banner')} className={`flex-1 py-2 rounded-md font-bold text-xs flex items-center justify-center gap-2 ${type === 'banner' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}><ImageIcon size={16} /> Banner</button>
          </div>

          <input placeholder="Title (e.g. Eid Sale)" className="w-full border p-3 rounded-xl outline-none focus:border-green-500" onChange={e => setForm({...form, title: e.target.value})} required />
          
          {type === 'discount' ? (
            <div className="flex gap-3">
              <input placeholder="Code (SAVE30)" className="flex-1 border p-3 rounded-xl outline-none uppercase font-mono" onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} />
              <input type="number" placeholder="Value %" className="w-24 border p-3 rounded-xl outline-none" onChange={e => setForm({...form, value: Number(e.target.value)})} />
            </div>
          ) : (
            <input type="file" className="w-full border p-3 rounded-xl border-dashed" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          )}

          <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition">
            Save Marketing Tool
          </button>
        </form>
      </div>
    </div>
  );
}
