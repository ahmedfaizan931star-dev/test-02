import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(
    selectedProduct?.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  if (!selectedProduct) return null;

  const currentVariant = selectedVariant || selectedProduct.variants[0];
  const isWishlisted = wishlist.includes(selectedProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Gallery Column */}
          <div className="p-6 bg-slate-950 flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-4">
              <img
                src={selectedProduct.images[selectedImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Info Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>{selectedProduct.brand}</span>
                <span className="text-emerald-400">In Stock ({selectedProduct.stockCount} left)</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {selectedProduct.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-200">{selectedProduct.rating}</span>
                <span className="text-slate-500">({selectedProduct.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ${selectedProduct.originalPrice}
                  </span>
                )}
              </div>

              {/* Tabs Switcher */}
              <div className="flex border-b border-slate-800 mb-4 text-xs font-semibold text-slate-400">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 pr-4 transition-colors ${
                    activeTab === 'overview' ? 'text-amber-400 border-b-2 border-amber-400' : ''
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-4 transition-colors ${
                    activeTab === 'specs' ? 'text-amber-400 border-b-2 border-amber-400' : ''
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-4 transition-colors ${
                    activeTab === 'reviews' ? 'text-amber-400 border-b-2 border-amber-400' : ''
                  }`}
                >
                  Reviews ({selectedProduct.reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Variant Selection */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-2">
                      Finish / Variant: <span className="text-white">{currentVariant.name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {selectedProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                            currentVariant.id === v.id
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: v.colorHex }} />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2 text-xs">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">{key}</span>
                      <span className="font-semibold text-slate-200">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 text-xs">
                  {selectedProduct.reviews.length === 0 ? (
                    <p className="text-slate-500 italic">No customer reviews written yet.</p>
                  ) : (
                    selectedProduct.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="flex justify-between items-center text-slate-400">
                          <span className="font-bold text-slate-200">{rev.userName}</span>
                          <span className="text-[10px]">{rev.date}</span>
                        </div>
                        <p className="font-semibold text-amber-400">{rev.title}</p>
                        <p className="text-slate-300">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-slate-400 hover:text-white font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-slate-400 hover:text-white font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(selectedProduct, currentVariant, quantity);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart • ${(selectedProduct.price * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 rounded-2xl border transition-colors ${
                    isWishlisted ? 'bg-rose-500 border-rose-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 pt-2">
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Returns</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};