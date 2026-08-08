import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface Props {
  products: Product[];
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  const { wishlist, toggleWishlist, addToCart, setSelectedProduct } = useStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
        <p className="text-slate-400 text-base font-medium">No products match your criteria.</p>
        <span className="text-xs text-slate-500 block mt-1">Try resetting your filters or search term.</span>
      </div>
    );
  }

  return (
    <div id="catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => {
        const isWishlisted = wishlist.includes(product.id);
        const isJustAdded = addedItems[product.id];

        return (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-3xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-950">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isNew && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/90 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                      SALE
                    </span>
                  )}
                </div>

                {/* Quick Actions (Wishlist & Quick View) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`p-2.5 rounded-full backdrop-blur-md border transition-colors shadow ${
                      isWishlisted
                        ? 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:text-white'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="p-2.5 rounded-full bg-slate-950/70 border border-slate-800 backdrop-blur-md text-slate-200 hover:text-white transition-colors shadow"
                    title="Quick Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Color Swatch Dots */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800">
                  {product.variants.map((v) => (
                    <span
                      key={v.id}
                      className="w-2.5 h-2.5 rounded-full border border-slate-600"
                      style={{ backgroundColor: v.colorHex }}
                      title={v.name}
                    />
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{product.brand}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-slate-200">{product.rating}</span>
                    <span className="text-slate-500">({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors">
                  {product.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>
            </div>

            {/* Card Footer Price & Add */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-800/60 mt-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-white font-mono">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-500 line-through font-mono">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  {product.stockCount > 0 ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                </span>
              </div>

              <button
                onClick={(e) => handleQuickAdd(product, e)}
                disabled={!product.inStock}
                className={`p-3 rounded-2xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
                  isJustAdded
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};