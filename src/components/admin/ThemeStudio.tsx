import React from 'react';
import { Sliders, Palette, Type, Sparkles, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ThemeStudio: React.FC = () => {
  const { theme, updateTheme, setActiveTab } = useStore();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Online Store Theme Studio</h1>
          <p className="text-xs text-slate-400">Customize visual design system and hero banner settings live.</p>
        </div>
        <button
          onClick={() => setActiveTab('storefront')}
          className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Storefront</span>
        </button>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 text-xs text-slate-200">
        
        {/* Brand Name */}
        <div className="space-y-2">
          <label className="font-semibold text-slate-300 block">Store Brand Name</label>
          <input
            type="text"
            value={theme.brandName}
            onChange={(e) => updateTheme({ brandName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Brand Accent Color */}
        <div className="space-y-2">
          <label className="font-semibold text-slate-300 block flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Brand Accent Color Scheme</span>
          </label>
          <div className="flex items-center gap-3">
            {[
              { id: 'amber', name: 'Amber Gold', hex: '#f59e0b' },
              { id: 'emerald', name: 'Emerald', hex: '#10b981' },
              { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
              { id: 'rose', name: 'Rose Red', hex: '#f43f5e' },
              { id: 'cyan', name: 'Cyan Tech', hex: '#06b6d4' }
            ].map((col) => (
              <button
                key={col.id}
                onClick={() => updateTheme({ accentColor: col.id as any })}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  theme.accentColor === col.id ? 'border-white bg-slate-800 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col.hex }} />
                <span>{col.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-300">Top Announcement Bar</label>
            <input
              type="checkbox"
              checked={theme.showAnnouncementBar}
              onChange={(e) => updateTheme({ showAnnouncementBar: e.target.checked })}
              className="accent-amber-500 rounded"
            />
          </div>
          <input
            type="text"
            value={theme.announcementBarText}
            onChange={(e) => updateTheme({ announcementBarText: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Hero Banner Headings */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-white text-sm">Hero Banner Copy</h3>
          <input
            type="text"
            value={theme.heroHeadline}
            onChange={(e) => updateTheme({ heroHeadline: e.target.value })}
            placeholder="Headline"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
          />
          <textarea
            value={theme.heroSubheadline}
            onChange={(e) => updateTheme({ heroSubheadline: e.target.value })}
            placeholder="Subheadline"
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
          />
        </div>

        {/* Free Shipping threshold */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <label className="font-semibold text-slate-300 block">Free Shipping Threshold ($)</label>
          <input
            type="number"
            value={theme.freeShippingThreshold}
            onChange={(e) => updateTheme({ freeShippingThreshold: Number(e.target.value) })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
          />
        </div>

      </div>
    </div>
  );
};