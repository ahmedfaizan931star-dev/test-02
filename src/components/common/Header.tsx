import React from 'react';
import { ShoppingBag, Search, Heart, LayoutDashboard, Sliders, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const { theme, cartItemCount, wishlist, setIsCartOpen, setIsSearchOpen, activeTab, setActiveTab } = useStore();

  const getAccentClass = () => {
    switch (theme.accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      case 'rose': return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'cyan': return 'bg-cyan-600 hover:bg-cyan-700 text-slate-950';
      default: return 'bg-amber-500 hover:bg-amber-600 text-slate-950';
    }
  };

  const getBadgeClass = () => {
    switch (theme.accentColor) {
      case 'emerald': return 'bg-emerald-500 text-white';
      case 'indigo': return 'bg-indigo-500 text-white';
      case 'rose': return 'bg-rose-500 text-white';
      case 'cyan': return 'bg-cyan-400 text-slate-950';
      default: return 'bg-amber-500 text-slate-950';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-colors">
      {/* Announcement Bar */}
      {theme.showAnnouncementBar && (
        <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 text-center text-xs tracking-wide text-slate-300 font-medium flex items-center justify-center gap-2">
          <span>{theme.announcementBarText}</span>
        </div>
      )}

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Store/Admin Switcher */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('storefront')}
            className="group flex items-center gap-2 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-xl tracking-tighter text-amber-400 group-hover:scale-105 transition-transform">
              {theme.brandName.charAt(0)}
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight uppercase text-slate-100 font-mono block">
                {theme.brandName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase block -mt-1">
                E-Commerce Storefront
              </span>
            </div>
          </button>

          {/* Mode Switch Pills */}
          <div className="hidden lg:flex items-center bg-slate-900/90 p-1.5 rounded-full border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('storefront')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'storefront'
                  ? 'bg-slate-800 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Storefront
            </button>

            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab.startsWith('admin')
                  ? 'bg-slate-800 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              Merchant Admin
            </button>
          </div>
        </div>

        {/* Store Navigation links */}
        {activeTab === 'storefront' ? (
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800/80 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-800 text-xs transition-all"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search store...</span>
              <kbd className="hidden sm:inline bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setActiveTab('storefront')}
              className="relative p-2.5 rounded-xl text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-medium text-xs shadow-lg transition-all ${getAccentClass()}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-semibold">Cart</span>
              <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${getBadgeClass()}`}>
                {cartItemCount}
              </span>
            </button>
          </div>
        ) : (
          /* Admin Navigation Sub-Bar */
          <div className="flex items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'admin-dashboard' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('admin-products')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'admin-products' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="w-3.5 h-3.5" /> Products
            </button>
            <button
              onClick={() => setActiveTab('admin-orders')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'admin-orders' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('admin-theme')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'admin-theme' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Theme Studio
            </button>
          </div>
        )}
      </div>
    </header>
  );
};