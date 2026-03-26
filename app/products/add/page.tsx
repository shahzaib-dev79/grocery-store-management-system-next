"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTag, 
  faLayerGroup, 
  faDollarSign, 
  faBoxesStacked, 
  faImage,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

const AddProductPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', category: '', price: 0, stock: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.category || !form.price) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', form.name);
    data.append('category', form.category);
    data.append('price', String(form.price));
    data.append('stock', String(form.stock));
    if (file) data.append('image', file);

    try {
      const res = await adminService.addProduct(data);
      if (res.status === 201 || res.status === 200) {
        toast.success("Product added successfully!");
        setTimeout(() => {
          router.push('/products');
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <Toaster position="top-right" />
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </button>
          <h2 className="text-3xl font-bold text-center">
            <span className="bg-linear-to-r text-transparent from-green-500 to-yellow-500 bg-clip-text">
              Add New Product
            </span>
          </h2>
          <div className="w-10"></div> 
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FontAwesomeIcon icon={faTag} className="mr-2 inline-block w-3.5" />
                Product Name
              </label>
              <input 
                required
                type="text"
                placeholder="Enter product name"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => setForm({...form, name: e.target.value})} 
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2 inline-block w-3.5" />
                Category
              </label>
              <input 
                required
                type="text"
                placeholder="e.g. Electronics"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => setForm({...form, category: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2 inline-block w-3.5" />
                  Price
                </label>
                <input 
                  required
                  type="number"
                  placeholder="0.00"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={e => setForm({...form, price: Number(e.target.value)})} 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon={faBoxesStacked} className="mr-2 inline-block w-3.5" />
                  Stock
                </label>
                <input 
                  type="number"
                  placeholder="Qty"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={e => setForm({...form, stock: Number(e.target.value)})} 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 relative group transition-all hover:border-green-500">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-md mb-2" />
            ) : (
              <div className="text-center py-10">
                <FontAwesomeIcon icon={faImage} className="text-gray-400 text-5xl mb-2" />
                <p className="text-sm text-gray-500">Click to upload image</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
            {preview && (
               <p className="text-xs text-green-600 font-semibold uppercase">Change Image</p>
            )}
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="transform hover:scale-[1.02] transition duration-400 bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full shadow-lg"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
