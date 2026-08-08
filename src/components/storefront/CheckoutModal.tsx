import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, theme, placeOrder } = useStore();
  
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alexander.wright@example.com',
    address: '500 Market Street, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    paymentMethod: 'Credit Card (**** 4242)'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(
      { firstName: formData.firstName, lastName: formData.lastName, email: formData.email },
      { address: formData.address, city: formData.city, state: formData.state, zip: formData.zip, country: formData.country },
      formData.paymentMethod
    );
    setCompletedOrder(order);
    setStep('success');
  };

  const shippingCost = cartSubtotal >= theme.freeShippingThreshold ? 0 : 15;
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = +(cartSubtotal + shippingCost + tax).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        
        {/* Close */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setStep('details');
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold uppercase tracking-wider font-mono">Express Checkout</h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">1. Contact Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">2. Shipping Address</h3>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Order Summary & Payment Button */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Items ({cart.length})</span>
                  <span className="font-mono text-slate-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="font-mono text-slate-200">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax</span>
                  <span className="font-mono text-slate-200">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay & Complete Order (${total.toFixed(2)})</span>
              </button>

            </form>
          </div>
        ) : (
          /* Order Success Confirmation */
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-extrabold text-white">Order Confirmed!</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Thank you for shopping with {theme.brandName}. We have sent an email receipt to <strong className="text-slate-200">{completedOrder?.customerEmail}</strong>.
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Order Reference:</span>
                <span className="font-mono font-bold text-amber-400">{completedOrder?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-emerald-400">{completedOrder?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Charged:</span>
                <span className="font-mono text-slate-200">${completedOrder?.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep('details');
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-semibold"
            >
              Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};