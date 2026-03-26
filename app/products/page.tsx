"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '../../services/adminService';
import { Product } from '../../types/admin';
import EditProduct from '../products/editProducts/page'; 
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, faSearch, faFilter, faPencilAlt, faTrashAlt,
  faSortAmountDown, faChartLine, faBoxOpen, faLayerGroup,
  faArrowLeft 
} from "@fortawesome/free-solid-svg-icons";

const ProductGallery = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortType, setSortType] = useState("none");

  const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5000';
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  const loadData = async () => {
    try {
      const res = await adminService.getProducts();
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) { toast.error("Failed to load products"); }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    let result = [...products].filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter === "available") result = result.filter(p => p.stock > 0);
    else if (statusFilter === "out") result = result.filter(p => p.stock === 0);
    if (categoryFilter !== "all") result = result.filter(p => p.category === categoryFilter);

    if (sortType === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortType === "price-desc") result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [search, statusFilter, categoryFilter, sortType, products]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      try {
        await adminService.deleteProduct(id);
        toast.success("Deleted!");
        loadData();
      } catch { toast.error("Delete failed"); }
    }
  };

  return (
    <div className="w-full"> 
      <Toaster position="top-right" />
      
    
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div className="flex items-center gap-5">
          <button onClick={() => router.push('/admin')} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent italic">
              PRODUCT GALLERY
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Inventory Management</p>
          </div>
        </div>
        <button onClick={() => router.push('/products/add')} className="bg-gradient-to-r from-green-600 to-yellow-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-100 hover:scale-105 transition-all flex items-center gap-2">
          <FontAwesomeIcon icon={faPlus} /> ADD PRODUCT
        </button>
      </div>

      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px] relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3.5 text-gray-300" />
          <input type="text" placeholder="Search product..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-400 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        
        <select className="bg-gray-50 px-4 py-3 rounded-xl font-bold text-gray-600 text-xs outline-none" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">ALL CATEGORIES</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
        </select>

        <select className="bg-gray-50 px-4 py-3 rounded-xl font-bold text-gray-600 text-xs outline-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">STOCK: ALL</option>
          <option value="available">IN STOCK</option>
          <option value="out">OUT OF STOCK</option>
        </select>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className={`col-span-12 ${selectedProduct ? 'lg:col-span-8' : ''} transition-all duration-500`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p._id} className="bg-white p-3 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-2xl transition-all group">
                <div className="relative h-48 rounded-[2rem] overflow-hidden bg-gray-100 mb-4">
                  <img src={`${IMG_URL}/${p.image?.replace(/\\/g, '/')}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black text-white uppercase ${p.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {p.stock > 0 ? 'Available' : 'Sold Out'}
                  </div>
                </div>
                <div className="px-3 pb-2">
                  <h3 className="font-black text-gray-800 text-lg line-clamp-1">{p.name}</h3>
                  <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">{p.category}</p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                    <span className="text-xl font-black text-gray-900">${p.price}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedProduct(p)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-500 hover:text-white transition-all"><FontAwesomeIcon icon={faPencilAlt} /></button>
                      <button onClick={() => p._id && handleDelete(p._id)} className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <div className="col-span-12 lg:col-span-4 sticky top-4 animate-in slide-in-from-right duration-300">
             <EditProduct product={selectedProduct} onUpdated={() => { setSelectedProduct(null); loadData(); }} onCancel={() => setSelectedProduct(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
