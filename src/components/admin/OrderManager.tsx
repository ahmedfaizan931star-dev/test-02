import React from 'react';
import { PackageCheck, Truck, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Order Fulfillment System</h1>
        <p className="text-xs text-slate-400">Track and fulfill incoming customer orders.</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono font-bold text-amber-400 text-sm">{ord.id}</span>
                <span className="text-slate-400 ml-3">Placed on {new Date(ord.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Status:</span>
                <select
                  value={ord.status}
                  onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                  className="bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-1">Customer</h4>
                <p className="font-bold text-white">{ord.customerName}</p>
                <p className="text-slate-400">{ord.customerEmail}</p>
                <p className="text-slate-400">{ord.shippingAddress.address}, {ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.zip}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-1">Items Summary</h4>
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 text-slate-300">
                    <span>{it.quantity}x {it.product.title} ({it.selectedVariant.name})</span>
                    <span className="font-mono">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-amber-400 pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="font-mono">${ord.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};