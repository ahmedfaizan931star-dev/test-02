import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Hero } from './components/storefront/Hero';
import { ProductFilters } from './components/storefront/ProductFilters';
import { ProductGrid } from './components/storefront/ProductGrid';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { QuickSearchModal } from './components/storefront/QuickSearchModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductManager } from './components/admin/ProductManager';
import { OrderManager } from './components/admin/OrderManager';
import { ThemeStudio } from './components/admin/ThemeStudio';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { products, selectedCategory, searchQuery, activeTab } = useStore();

  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(800);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter Catalog
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange;
    const matchesStock = !inStockOnly || product.inStock;

    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        {activeTab === 'storefront' && (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <ProductFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
              />
              <ProductGrid products={filteredProducts} />
            </div>
          </>
        )}

        {activeTab.startsWith('admin') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {activeTab === 'admin-dashboard' && <AdminDashboard />}
            {activeTab === 'admin-products' && <ProductManager />}
            {activeTab === 'admin-orders' && <OrderManager />}
            {activeTab === 'admin-theme' && <ThemeStudio />}
          </div>
        )}
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <QuickSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}