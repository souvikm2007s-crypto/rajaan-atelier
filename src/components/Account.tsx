import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Package, MapPin, Heart, LogOut, Edit, Trash2, Plus, ChevronRight, Truck, Check } from 'lucide-react';
import { useStore, formatPrice } from '../store/StoreContext';

export function Account() {
  const { state, dispatch } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile');

  if (!state.showAccount) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-obsidian/95"
          onClick={() => dispatch({ type: 'TOGGLE_ACCOUNT' })}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-obsidian border-2 border-gold-foil/30 rounded-sm max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gold-foil/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg text-gold-foil tracking-wider">My Account</h2>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ACCOUNT' })}
                className="md:hidden text-champagne/60 hover:text-gold-foil"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            {state.user && (
              <div className="mb-6 p-4 glass-card rounded-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold-foil/10 flex items-center justify-center">
                    <span className="text-lg font-heading text-gold-foil">
                      {state.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-parchment font-medium truncate">{state.user.name}</p>
                    <p className="text-xs text-champagne/50 truncate">{state.user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-gold-foil/10 text-gold-foil border border-gold-foil/20'
                      : 'text-champagne/60 hover:text-gold-foil hover:bg-gold-foil/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'orders' && state.orders.length > 0 && (
                    <span className="ml-auto text-xs bg-gold-foil/20 text-gold-foil px-2 py-0.5 rounded-full">
                      {state.orders.length}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={() => {
                  dispatch({ type: 'LOGOUT' });
                  dispatch({ type: 'TOGGLE_ACCOUNT' });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-ruby hover:bg-ruby/10 transition-all mt-4"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_ACCOUNT' })}
              className="hidden md:flex absolute top-4 right-4 w-8 h-8 bg-obsidian-light rounded-full items-center justify-center text-champagne/60 hover:text-gold-foil"
            >
              <X className="w-4 h-4" />
            </button>

            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'wishlist' && <WishlistTab />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProfileTab() {
  const { state, dispatch } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
  });

  if (!state.user) return null;

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: formData });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl text-parchment">Profile Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-gold-foil border border-gold-foil/30 px-3 py-1.5 rounded-sm hover:bg-gold-foil/10 transition-colors flex items-center gap-1"
        >
          <Edit className="w-3 h-3" />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
          ) : (
            <p className="text-sm text-parchment py-3 px-4 bg-obsidian-light rounded-sm">{state.user.name}</p>
          )}
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
          ) : (
            <p className="text-sm text-parchment py-3 px-4 bg-obsidian-light rounded-sm">{state.user.email}</p>
          )}
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
          ) : (
            <p className="text-sm text-parchment py-3 px-4 bg-obsidian-light rounded-sm">{state.user.phone}</p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-gold-foil text-obsidian py-3 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors"
          >
            Save Changes
          </button>
        )}

        <div className="pt-6 border-t border-gold-foil/10">
          <p className="text-xs text-champagne/40">
            Member since: {new Date(state.user.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const { state } = useStore();

  if (state.orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gold-foil/30 mx-auto mb-4" />
        <h3 className="text-parchment mb-2">No orders yet</h3>
        <p className="text-xs text-champagne/50">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading text-xl text-parchment mb-6">Order History</h3>
      <div className="space-y-4">
        {state.orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    'Processing': 'text-yellow-400 bg-yellow-400/10',
    'Shipped': 'text-blue-400 bg-blue-400/10',
    'Out for Delivery': 'text-purple-400 bg-purple-400/10',
    'Delivered': 'text-emerald-400 bg-emerald-400/10',
  };

  return (
    <div className="glass-card rounded-sm overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gold-foil/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-champagne/50">Order #{order.orderNumber}</p>
            <p className="text-sm text-parchment font-medium mt-1">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} • {formatPrice(order.total, 'INR')}
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
            {order.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-champagne/40">
          <span>Placed: {new Date(order.orderDate).toLocaleDateString('en-IN')}</span>
          <span>•</span>
          <span>Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 flex items-center gap-2">
          {['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, idx) => {
            const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
            const currentIdx = steps.indexOf(order.status);
            const isComplete = idx <= currentIdx;

            return (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-gold-foil' : 'bg-champagne/20'}`} />
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 ${isComplete && idx < currentIdx ? 'bg-gold-foil' : 'bg-champagne/10'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gold-foil/10 p-4 space-y-3">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-20 bg-emerald-royal/30 rounded-sm overflow-hidden flex-shrink-0">
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
                <p className="text-sm text-gold-foil mt-1">{formatPrice(item.price * item.quantity, 'INR')}</p>
              </div>
            </div>
          ))}

          {order.trackingId && (
            <div className="pt-3 border-t border-gold-foil/10">
              <p className="text-xs text-champagne/50">
                Tracking ID: <span className="text-gold-foil">{order.trackingId}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AddressesTab() {
  const { state, dispatch } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    fullName: state.user?.name || '',
    phone: state.user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: state.user?.addresses.length === 0,
  });

  const handleAddAddress = () => {
    const address = {
      ...newAddress,
      id: 'addr_' + Date.now(),
    };
    dispatch({ type: 'ADD_ADDRESS', payload: address });
    setShowAddForm(false);
    setNewAddress({
      label: 'Home',
      fullName: state.user?.name || '',
      phone: state.user?.phone || '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl text-parchment">Saved Addresses</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-gold-foil border border-gold-foil/30 px-3 py-1.5 rounded-sm hover:bg-gold-foil/10 transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Add New
        </button>
      </div>

      {showAddForm && (
        <div className="glass-card rounded-sm p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
              className="bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className="bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              className="bg-obsidian-light border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50"
            />
          </div>
          <button
            onClick={handleAddAddress}
            className="w-full bg-gold-foil text-obsidian py-2 text-xs tracking-wider uppercase font-heading hover:bg-gold-light transition-colors"
          >
            Save Address
          </button>
        </div>
      )}

      {state.user?.addresses.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gold-foil/30 mx-auto mb-3" />
          <p className="text-sm text-parchment mb-1">No addresses saved</p>
          <p className="text-xs text-champagne/50">Add a shipping address for faster checkout</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.user?.addresses.map((addr) => (
            <div key={addr.id} className="glass-card rounded-sm p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm text-parchment font-medium">{addr.label}</p>
                  {addr.isDefault && (
                    <span className="text-[9px] bg-gold-foil/10 text-gold-foil px-2 py-0.5 rounded-full">Default</span>
                  )}
                </div>
                <p className="text-xs text-champagne/60">{addr.fullName} • {addr.phone}</p>
                <p className="text-xs text-champagne/50 mt-1">
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_ADDRESS', payload: addr.id })}
                className="text-champagne/30 hover:text-ruby transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistTab() {
  const { state, dispatch } = useStore();

  if (state.favourites.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-gold-foil/30 mx-auto mb-4" />
        <h3 className="text-parchment mb-2">Your wishlist is empty</h3>
        <p className="text-xs text-champagne/50">Save your favourite pieces here</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading text-xl text-parchment mb-6">My Wishlist</h3>
      <div className="space-y-3">
        {state.favourites.map((item) => (
          <div key={item.id} className="flex gap-3 glass-card rounded-sm p-3">
            <div className="w-16 h-20 bg-emerald-royal/30 rounded-sm overflow-hidden flex-shrink-0">
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
              <p className="text-xs text-champagne/40">{item.color}</p>
              <p className="text-sm text-gold-foil mt-1">{formatPrice(item.price, state.currency)}</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: item.id })}
              className="text-champagne/30 hover:text-ruby transition-colors self-start"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
