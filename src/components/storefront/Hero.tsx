import React from 'react';
import { ArrowRight, Sparkles, Shield, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { InteractiveProduct3D } from './InteractiveProduct3D';

export const Hero: React.FC = () => {
  const { theme, setSelectedCategory } = useStore();

  const getAccentHex = () => {
    switch (theme.accentColor) {
      case 'emerald': return '#10b981';
      case 'indigo': return '#6366f1';
      case 'rose': return '#f43f5e';
      case 'cyan': return '#22d3ee';
      default: return '#f59e0b';
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800 text-slate-100 py-16 lg:py-24">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2025 Flagship Collection • Powered by AURA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {theme.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {theme.heroSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  const catalogElem = document.getElementById('catalog-grid');
                  catalogElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-amber-500/10 flex items-center gap-2 group"
              >
                <span>{theme.heroCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setSelectedCategory('Audio')}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-all"
              >
                Browse Audio Gear
              </button>
            </div>

            {/* Value Props Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">Free Worldwide Express</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">2-Year Studio Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <RefreshCw className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">30-Day Risk-Free Trial</span>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive 3D Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractiveProduct3D accentColor={getAccentHex()} />
          </div>

        </div>
      </div>
    </section>
  );
};