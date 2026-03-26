"use client";
import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { Product } from '../../../types/admin';
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPencilAlt, 
  faTimes, 
  faImage, 
  faCheck,
  faTag,
  faDollarSign,
  faBoxesStacked
} from "@fortawesome/free-solid-svg-icons";

interface EditProps {
  product: Product;
  onUpdated: () => void;
  onCancel: () => void;
}

const EditProduct = ({ product, onUpdated, onCancel }: EditProps) => {
  const [form, setForm] = useState<Partial<Product>>(product);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5000';

  useEffect(() => {
    setForm(product);
    if (product.image) {
      const cleanPath = product.image.replace(/\\/g, '/');
      setPreview(`${IMG_BASE_URL}/${cleanPath}`);
    } else {
      setPreview(null);
    }
  }, [product, IMG_BASE_URL]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product._id) return;

    setLoading(true);
    const data = new FormData();
    data.append('name', form.name || '');
    data.append('category', form.category || '');
    data.append('price', String(form.price || 0));
    data.append('stock', String(form.stock || 0));
    if (file) data.append('image', file);

    try {
      const response = await adminService.updateProduct(product._id, data);
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        setTimeout(() => {
          onUpdated();
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 max-w-lg mx-auto">
      <Toaster position="top-right" />
      
      <div className="bg-linear-to-r from-green-500 to-yellow-500 p-5 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faPencilAlt} />
          <h2 className="text-lg font-bold">Edit Product</h2>
        </div>
        <button onClick={onCancel} className="hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleUpdate} className="p-6 space-y-5">
        <div className="relative group h-40 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center transition-all hover:border-green-500">
          {preview ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="h-full w-full object-cover" 
              onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com"; }}
            />
          ) : (
            <div className="text-center">
              <FontAwesomeIcon icon={faImage} className="text-gray-300 text-3xl mb-2" />
              <p className="text-xs text-gray-400">No image available</p>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold bg-green-600 px-3 py-1 rounded">Change Photo</span>
          </div>

          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const selected = e.target.files[0];
                setFile(selected);
                setPreview(URL.createObjectURL(selected));
              }
            }} 
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              <FontAwesomeIcon icon={faTag} className="mr-2 text-gray-400 w-3.5" />
              Product Name
            </label>
            <input 
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-gray-400 w-3.5" />
                Price
              </label>
              <input 
                type="number" 
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                value={form.price} 
                onChange={e => setForm({...form, price: Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                <FontAwesomeIcon icon={faBoxesStacked} className="mr-2 text-gray-400 w-3.5" />
                Stock
              </label>
              <input 
                type="number" 
                className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                value={form.stock} 
                onChange={e => setForm({...form, stock: Number(e.target.value)})} 
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={onCancel} 
            className="flex-1 py-3 text-gray-500 font-bold border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            Discard
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white py-3 rounded font-bold transition-all shadow-md transform hover:scale-[1.02]"
          >
            {loading ? "Updating..." : <><FontAwesomeIcon icon={faCheck} className="mr-2" /> Update Now</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
