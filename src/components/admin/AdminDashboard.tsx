import React from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users, ArrowUpRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminDashboard: React.FC = () => {
  const { orders, products, setActiveTab } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0';

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Merchant Control Center</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time revenue, order processing, and catalog inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('admin-products')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </button>
          <button
            onClick={() => setActiveTab('admin-theme')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all"
          >
            Customize Theme
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Sales Revenue</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">${totalRevenue.toFixed(2)}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% from last month
          </span>
        </div>

        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Orders</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalOrders}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12% order velocity
          </span>
        </div>

        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average Order Value</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">${avgOrderValue}</div>
          <span className="text-[10px] text-slate-400">Based on processed carts</span>
        </div>

        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Products</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{products.length}</div>
          <span className="text-[10px] text-amber-400">All live in store</span>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Recent Store Orders</span>
          </h2>
          <button
            onClick={() => setActiveTab('admin-orders')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            View All Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">{ord.id}</td>
                  <td className="py-3 px-4 text-white font-medium">{ord.customerName}</td>
                  <td className="py-3 px-4">{ord.items.length} item(s)</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-100">${ord.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ord.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      ord.status === 'Processing' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};