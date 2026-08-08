import React from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useStore } from '../../context/StoreContext';

interface Props {
  sortBy: string;
  setSortBy: (val: string) => void;
  priceRange: number;
  setPriceRange: (val: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
}

const CATEGORIES: (ProductCategory | 'All')[] = ['All', 'Audio', 'Wearables', 'Smart Home', 'Accessories'];

export const ProductFilters: React.FC<Props> = ({
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly
}) => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 mb-8 backdrop-blur-md space-y-4">
      {/* Category Pills & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Secondary Controls Bar */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
        
        {/* Price Slider */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-slate-400">Max Price:</span>
          <span className="font-mono font-bold text-white">${priceRange}</span>
          <input
            type="range"
            min={100}
            max={800}
            step={25}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="accent-amber-500 cursor-pointer w-32 sm:w-40"
          />
        </div>

        {/* Stock Checkbox & Sort Dropdown */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded accent-amber-500 bg-slate-950 border-slate-800 w-4 h-4"
            />
            <span>In Stock Only</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};