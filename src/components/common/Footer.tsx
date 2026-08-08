import React from 'react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { theme } = useStore();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <span className="text-lg font-bold text-white tracking-wider uppercase font-mono">{theme.brandName}</span>
          <p className="text-slate-400 leading-relaxed">
            Engineered for high performance audio, design minimalist wearables, and acoustic space integration.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">Store Sections</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Audio Equipment</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Wearables</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Smart Home</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Accessories</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">Customer Care</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Warranty & Service</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Studio</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono">Newsletter</h4>
          <p className="text-slate-400">Receive early access to limited edition drops.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email..."
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
            />
            <button className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
        <span>© 2025 {theme.brandName} Inc. Powered by Shopify-like Storefront Architecture.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
};