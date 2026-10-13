import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CreditCard, Shield, Truck, Check, Lock } from 'lucide-react';
import { useStore, formatPrice, getCartTotal, generateOrderId, generateTrackingId } from '../store/StoreContext';

export function Checkout() {
  const { state, dispatch } = useStore();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const [shipping, setShipping] = useState({
    firstName: state.user?.name.split(' ')[0] || '',
    lastName: state.user?.name.split(' ').slice(1).join(' ') || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    upiId: '',
  });

  const subtotal = getCartTotal(state.cart);
  const shippingCost = subtotal > 50000 ? 0 : 1500;
  const giftBoxCost = state.giftBox ? 2500 : 0;
  const total = subtotal + shippingCost + giftBoxCost;

  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' },
  ];

  const handlePlaceOrder = () => {
    const order = {
      id: 'order_' + Date.now(),
      orderNumber: generateOrderId(),
      items: [...state.cart],
      shippingAddress: {
        id: 'addr_' + Date.now(),
        label: 'Home',
        fullName: `${shipping.firstName} ${shipping.lastName}`,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        pincode: shipping.pincode,
        country: shipping.country,
        isDefault: false,
      },
      paymentMethod: payment.method,
      subtotal,
      shippingCost,
      giftBoxCost,
      total,
      status: 'Processing' as const,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      trackingId: generateTrackingId(),
    };

    setLastOrder(order);
    dispatch({ type: 'PLACE_ORDER', payload: order });
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setStep(1);
      setLastOrder(null);
      dispatch({ type: 'TOGGLE_CHECKOUT', payload: false });
    }, 5000);
  };

  if (!state.showCheckout) return null;

  // Require login before checkout
  if (!state.user) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-obsidian overflow-y-auto"
        >
          <div className="sticky top-0 z-10 glass-nav px-4 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <h1 className="font-heading text-lg text-gold-foil tracking-wider">Checkout</h1>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CHECKOUT', payload: false })}
                className="text-champagne/60 hover:text-gold-foil transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-w-md mx-auto py-24 px-4 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gold-foil/10 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-gold-foil" />
            </div>
            <h2 className="font-display text-2xl text-parchment mb-4">Sign In Required</h2>
            <p className="text-champagne/60 text-sm mb-8">
              Please sign in to complete your purchase and track your orders
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  dispatch({ type: 'TOGGLE_CHECKOUT', payload: false });
                  dispatch({ type: 'TOGGLE_AUTH', payload: { mode: 'login' } });
                }}
                className="w-full bg-gold-foil text-obsidian py-3 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  dispatch({ type: 'TOGGLE_CHECKOUT', payload: false });
                  dispatch({ type: 'TOGGLE_AUTH', payload: { mode: 'signup' } });
                }}
                className="w-full border border-gold-foil/30 text-gold-foil py-3 font-heading text-sm tracking-wider hover:bg-gold-foil/5 transition-colors"
              >
                Create Account
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CHECKOUT', payload: false })}
                className="w-full text-champagne/50 py-3 text-xs hover:text-champagne transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-obsidian overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass-nav px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {step > 1 && !orderPlaced && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-champagne/60 hover:text-gold-foil transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="font-heading text-lg text-gold-foil tracking-wider">
                {orderPlaced ? 'Order Confirmed' : 'Secure Checkout'}
              </h1>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CHECKOUT', payload: false })}
              className="text-champagne/60 hover:text-gold-foil transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Success */}
        {orderPlaced && lastOrder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-16 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 bg-gold-foil/10 rounded-full flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-gold-foil" />
            </motion.div>
            <h2 className="font-display text-3xl text-parchment mb-4">Order Placed Successfully!</h2>
            <p className="text-champagne/60 text-sm mb-6">
              Thank you for shopping with Rajaan Atelier. A confirmation email has been sent to{' '}
              <span className="text-gold-foil">{state.user?.email || shipping.email}</span>
            </p>

            {/* Order Details Card */}
            <div className="glass-card rounded-sm p-6 text-left mb-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gold-foil/10">
                <div>
                  <p className="text-xs text-champagne/50">Order Number</p>
                  <p className="text-gold-foil font-heading text-lg">{lastOrder.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-champagne/50">Total Amount</p>
                  <p className="text-parchment font-heading text-lg">{formatPrice(lastOrder.total, state.currency)}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {lastOrder.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-emerald-royal/30 rounded-sm overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gold-foil/30">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-parchment">{item.name}</p>
                      <p className="text-xs text-champagne/40">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-gold-foil">{formatPrice(item.price * item.quantity, state.currency)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gold-foil/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-champagne/50">Shipping Address</span>
                  <span className="text-parchment text-right">
                    {lastOrder.shippingAddress.address}, {lastOrder.shippingAddress.city}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-champagne/50">Payment Method</span>
                  <span className="text-parchment capitalize">{lastOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-champagne/50">Tracking ID</span>
                  <span className="text-gold-foil">{lastOrder.trackingId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-champagne/50">Estimated Delivery</span>
                  <span className="text-parchment">
                    {new Date(lastOrder.estimatedDelivery).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  dispatch({ type: 'TOGGLE_CHECKOUT', payload: false });
                  dispatch({ type: 'TOGGLE_ACCOUNT' });
                }}
                className="flex-1 border border-gold-foil/30 text-gold-foil py-3 font-heading text-xs tracking-wider hover:bg-gold-foil/5 transition-colors"
              >
                View My Orders
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CHECKOUT', payload: false })}
                className="flex-1 bg-gold-foil text-obsidian py-3 font-heading text-xs tracking-wider hover:bg-gold-light transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}

        {!orderPlaced && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      step >= s.num
                        ? 'bg-gold-foil text-obsidian'
                        : 'border border-gold-foil/20 text-champagne/40'
                    }`}>
                      {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`text-xs tracking-wider hidden sm:block ${
                      step >= s.num ? 'text-gold-foil' : 'text-champagne/40'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-12 h-px ${step > s.num ? 'bg-gold-foil' : 'bg-gold-foil/20'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {/* Step 1: Shipping */}
                  {step === 1 && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="font-heading text-xl text-parchment mb-6 tracking-wider">Shipping Details</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">First Name</label>
                          <input
                            type="text"
                            value={shipping.firstName}
                            onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="Arjun"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Last Name</label>
                          <input
                            type="text"
                            value={shipping.lastName}
                            onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="Mehta"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Email</label>
                          <input
                            type="email"
                            value={shipping.email}
                            onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="arjun@email.com"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Phone</label>
                          <input
                            type="tel"
                            value={shipping.phone}
                            onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Address</label>
                          <input
                            type="text"
                            value={shipping.address}
                            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="123, Royal Avenue, Bandra West"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">City</label>
                          <input
                            type="text"
                            value={shipping.city}
                            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="Mumbai"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">State</label>
                          <input
                            type="text"
                            value={shipping.state}
                            onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="Maharashtra"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Pincode</label>
                          <input
                            type="text"
                            value={shipping.pincode}
                            onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                            placeholder="400050"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Country</label>
                          <select
                            value={shipping.country}
                            onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                          >
                            <option>India</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>UAE</option>
                            <option>Singapore</option>
                            <option>Australia</option>
                          </select>
                        </div>
                      </div>

                      {/* Shipping Options */}
                      <div className="mt-8 space-y-3">
                        <h3 className="text-xs uppercase tracking-wider text-champagne/60 mb-3">Delivery Method</h3>
                        <label className="flex items-center gap-4 p-4 border border-gold-foil/20 rounded-sm cursor-pointer hover:border-gold-foil/40 transition-colors">
                          <input type="radio" name="shipping" defaultChecked className="accent-gold-foil" />
                          <div className="flex-1">
                            <p className="text-sm text-parchment">Complimentary Express Delivery</p>
                            <p className="text-xs text-champagne/40">7-10 business days</p>
                          </div>
                          <span className="text-sm text-gold-foil">Free</span>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-gold-foil/20 rounded-sm cursor-pointer hover:border-gold-foil/40 transition-colors">
                          <input type="radio" name="shipping" className="accent-gold-foil" />
                          <div className="flex-1">
                            <p className="text-sm text-parchment">Priority White-Glove Delivery</p>
                            <p className="text-xs text-champagne/40">3-5 business days • Personal handover</p>
                          </div>
                          <span className="text-sm text-gold-foil">₹5,000</span>
                        </label>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="mt-8 w-full btn-magnetic bg-gold-foil text-obsidian py-4 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                      >
                        Continue to Payment <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Payment */}
                  {step === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="font-heading text-xl text-parchment mb-6 tracking-wider">Payment Method</h2>
                      
                      {/* Payment Methods */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {[
                          { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                          { id: 'upi', label: 'UPI', icon: '📱' },
                          { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                          { id: 'wallet', label: 'Wallet', icon: '👛' },
                          { id: 'emi', label: 'EMI / Klarna', icon: '📊' },
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPayment({ ...payment, method: method.id })}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-sm text-xs transition-all ${
                              payment.method === method.id
                                ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                                : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                            }`}
                          >
                            <span>{method.icon}</span>
                            <span>{method.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Card Form */}
                      {payment.method === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Card Number</label>
                            <input
                              type="text"
                              value={payment.cardNumber}
                              onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                              placeholder="4242 4242 4242 4242"
                              maxLength={19}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Expiry</label>
                              <input
                                type="text"
                                value={payment.expiry}
                                onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                                className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">CVV</label>
                              <input
                                type="text"
                                value={payment.cvv}
                                onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                                className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Name on Card</label>
                            <input
                              type="text"
                              value={payment.nameOnCard}
                              onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                              placeholder="ARJUN MEHTA"
                            />
                          </div>
                        </div>
                      )}

                      {/* UPI Form */}
                      {payment.method === 'upi' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">UPI ID</label>
                            <input
                              type="text"
                              value={payment.upiId}
                              onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50 transition-colors"
                              placeholder="yourname@upi"
                            />
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                              <span key={app} className="text-xs px-3 py-2 border border-gold-foil/15 text-champagne/50 rounded-sm">{app}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* EMI Options */}
                      {payment.method === 'emi' && (
                        <div className="space-y-3">
                          {[
                            { months: 3, interest: 'No Cost EMI' },
                            { months: 6, interest: 'No Cost EMI' },
                            { months: 9, interest: 'Low Interest' },
                            { months: 12, interest: 'Standard' },
                          ].map((emi) => (
                            <label key={emi.months} className="flex items-center gap-4 p-4 border border-gold-foil/20 rounded-sm cursor-pointer hover:border-gold-foil/40 transition-colors">
                              <input type="radio" name="emi" className="accent-gold-foil" />
                              <div className="flex-1">
                                <p className="text-sm text-parchment">{emi.months} Months EMI</p>
                                <p className="text-xs text-champagne/40">
                                  ₹{Math.round(total / emi.months).toLocaleString('en-IN')}/month • {emi.interest}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-8">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 border border-gold-foil/30 text-gold-foil py-4 font-heading text-sm tracking-wider hover:bg-gold-foil/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          className="flex-[2] btn-magnetic bg-gold-foil text-obsidian py-4 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                        >
                          Review Order <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Review */}
                  {step === 3 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="font-heading text-xl text-parchment mb-6 tracking-wider">Review Your Order</h2>
                      
                      {/* Shipping Summary */}
                      <div className="glass-card rounded-sm p-5 mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs uppercase tracking-wider text-gold-foil">Shipping Address</h3>
                          <button onClick={() => setStep(1)} className="text-xs text-champagne/50 hover:text-gold-foil">Edit</button>
                        </div>
                        <p className="text-sm text-parchment">{shipping.firstName} {shipping.lastName}</p>
                        <p className="text-xs text-champagne/50 mt-1">{shipping.address}</p>
                        <p className="text-xs text-champagne/50">{shipping.city}, {shipping.state} - {shipping.pincode}</p>
                        <p className="text-xs text-champagne/50">{shipping.country} • {shipping.phone}</p>
                      </div>

                      {/* Payment Summary */}
                      <div className="glass-card rounded-sm p-5 mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs uppercase tracking-wider text-gold-foil">Payment Method</h3>
                          <button onClick={() => setStep(2)} className="text-xs text-champagne/50 hover:text-gold-foil">Edit</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-champagne/60" />
                          <span className="text-sm text-parchment capitalize">
                            {payment.method === 'card' ? `Card ending ${payment.cardNumber.slice(-4) || '****'}` : payment.method}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="glass-card rounded-sm p-5 mb-6">
                        <h3 className="text-xs uppercase tracking-wider text-gold-foil mb-4">Items ({state.cart.length})</h3>
                        <div className="space-y-3">
                          {state.cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="w-12 h-14 bg-emerald-royal/30 rounded-sm flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-gold-foil/30 text-lg">✦</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-parchment">{item.name}</p>
                                <p className="text-[10px] text-champagne/40">Size {item.selectedSize} • Qty {item.quantity}</p>
                              </div>
                              <span className="text-sm text-gold-foil">{formatPrice(item.price * item.quantity, state.currency)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gift Box */}
                      <div className="flex items-center gap-3 p-4 glass-card rounded-sm mb-6">
                        <input
                          type="checkbox"
                          id="checkout-giftbox"
                          checked={state.giftBox}
                          onChange={() => dispatch({ type: 'TOGGLE_GIFT_BOX' })}
                          className="accent-gold-foil w-4 h-4"
                        />
                        <label htmlFor="checkout-giftbox" className="flex-1">
                          <p className="text-sm text-parchment">Luxury Gift Packaging</p>
                          <p className="text-xs text-champagne/40">Velvet keepsake box with oud-scented tag & wax-sealed certificate</p>
                        </label>
                        <span className="text-sm text-gold-foil">₹2,500</span>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button
                          onClick={() => setStep(2)}
                          className="flex-1 border border-gold-foil/30 text-gold-foil py-4 font-heading text-sm tracking-wider hover:bg-gold-foil/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          onClick={handlePlaceOrder}
                          className="flex-[2] btn-magnetic bg-gold-foil text-obsidian py-4 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4" /> Place Order • {formatPrice(total, state.currency)}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-sm p-6 sticky top-24">
                  <h3 className="font-heading text-sm text-gold-foil tracking-wider mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    {state.cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="text-champagne/60 truncate mr-2">{item.name} × {item.quantity}</span>
                        <span className="text-parchment whitespace-nowrap">{formatPrice(item.price * item.quantity, state.currency)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gold-foil/10 pt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-champagne/50">Subtotal</span>
                      <span className="text-parchment">{formatPrice(subtotal, state.currency)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-champagne/50">Shipping</span>
                      <span className="text-gold-foil">{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost, state.currency)}</span>
                    </div>
                    {state.giftBox && (
                      <div className="flex justify-between text-xs">
                        <span className="text-champagne/50">Gift Packaging</span>
                        <span className="text-parchment">{formatPrice(giftBoxCost, state.currency)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gold-foil/10 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-heading text-gold-foil">Total</span>
                      <span className="font-heading text-gold-foil text-lg">{formatPrice(total, state.currency)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[10px] text-champagne/40">
                    <Shield className="w-3 h-3" />
                    <span>SSL Encrypted • Secure Payment</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-champagne/40">
                    <Truck className="w-3 h-3" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
