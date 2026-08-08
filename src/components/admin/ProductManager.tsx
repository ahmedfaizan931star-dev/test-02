import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Tag, Image, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';

export const ProductManager: React.FC = () => {
  const { products, addProduct, deleteProduct } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Audio');
  const [newBrand, setNewBrand] = useState('AURA Studio');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      subtitle: 'Premium Studio Grade Hardware',
      description: 'Masterfully built with precision acoustic dynamic calibration.',
      price: Number(newPrice),
      category: newCategory,
      brand: newBrand,
      images: [newImageUrl],
      inStock: true,
      stockCount: 20,
      rating: 5.0,
      reviewCount: 1,
      variants: [{ id: 'v-def', name: 'Default Finish', colorHex: '#000000', inStock: true }],
      specs: { 'Brand': newBrand },
      tags: ['New Release'],
      reviews: []
    };

    addProduct(created);
    setIsAdding(false);
    setNewTitle('');
    setNewPrice('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-slate-400">Add, update, or edit live items in your storefront.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Add Product Modal */}
      {isAdding && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Add New Item to Storefront</h3>
          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <input
              type="text"
              placeholder="Product Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none"
            >
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input
              type="text"
              placeholder="Brand Name"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
            />

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Catalog Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Stock</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-950 border border-slate-800" />
                  <div>
                    <h4 className="font-bold text-white">{p.title}</h4>
                    <span className="text-[10px] text-slate-500">{p.brand}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-400">{p.category}</td>
                <td className="py-3 px-4 font-mono font-bold text-amber-400">${p.price}</td>
                <td className="py-3 px-4">{p.stockCount} units</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};