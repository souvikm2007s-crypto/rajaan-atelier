import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, X, Menu, ChevronDown, Globe, Truck, MessageCircle, Minus, Plus } from 'lucide-react';
import { useStore, formatPrice, getCartTotal } from '../store/StoreContext';
import { products } from '../data/products';

const currencies = ['INR', 'USD', 'GBP', 'AED', 'EUR'];
const navItems = [
  { label: 'Collections', submenu: ['Imperial Wedding', 'Chikankari & Zari', 'Silk Soirées', 'Bandhgalas & Bundis', 'Festive Edit'], links: ['#collections', '#collections', '#collections', '#collections', '#collections'] },
  { label: 'Fabrics', submenu: ['Banarasi Silk', 'Chanderi', 'Raw Silk', 'Tussar', 'Organza'], links: ['#artisan-guilds', '#artisan-guilds', '#artisan-guilds', '#artisan-guilds', '#artisan-guilds'] },
  { label: 'Occasions', submenu: ['Wedding', 'Reception', 'Diwali Gala', 'Diplomatic', 'Festive'], links: ['#collections', '#collections', '#collections', '#collections', '#collections'] },
  { label: 'Bespoke Atelier', submenu: ['Virtual Fitting', 'Custom Embroidery', 'Monogramming', 'Fabric Selection'], links: ['#atelier', '#atelier', '#atelier', '#atelier'] },
  { label: 'Heritage', submenu: ['Our Story', 'Artisan Guilds', 'Craft Chronicles', 'Sustainability'], links: ['#our-story', '#artisan-guilds', '#craft-chronicles', '#sustainability'] },
];

export function Header() {
  const { state, dispatch } = useStore();
  const [showCurrency, setShowCurrency] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = getCartTotal(state.cart);
  const freeShippingThreshold = 50000;
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingAmount = Math.max(freeShippingThreshold - cartTotal, 0);

  // Search functionality
  const searchResults = searchQuery.trim() === '' ? [] : products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Top Ribbon */}
      <div className="bg-emerald-royal border-b border-gold-foil/20 py-2 px-4 text-xs tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowCurrency(!showCurrency)}
                className="flex items-center gap-1 text-champagne hover:text-gold-foil transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>{state.currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showCurrency && (
                <div className="absolute top-full left-0 mt-2 bg-obsidian border border-gold-foil/20 rounded-sm py-2 px-3 z-50">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => { dispatch({ type: 'SET_CURRENCY', payload: c }); setShowCurrency(false); }}
                      className={`block w-full text-left py-1 px-2 hover:text-gold-foil transition-colors ${c === state.currency ? 'text-gold-foil' : 'text-champagne'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-1 text-champagne/70">
              <Truck className="w-3 h-3 text-gold-foil" />
              <span>Complimentary Global Express Delivery</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:flex items-center gap-1 text-champagne hover:text-gold-foil transition-colors">
              <MessageCircle className="w-3 h-3" />
              <span>VIP Concierge</span>
            </a>
            <div className="text-champagne/60 hidden lg:block">
              <span className="inline-block">✦ Handcrafted across 1,200 artisanal hours ✦ Free shipping on orders above ₹50,000 ✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="mega-menu-trigger relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="text-parchment/80 hover:text-gold-foil text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {activeMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-4 bg-obsidian/95 backdrop-blur-xl border border-gold-foil/10 rounded-sm py-6 px-8 min-w-[240px]"
                    >
                      {item.submenu.map((sub, idx) => (
                        <a key={sub} href={item.links[idx]} className="block py-2 text-sm text-champagne/70 hover:text-gold-foil hover:pl-2 transition-all duration-300">
                          {sub}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Center Logo */}
            <div className="flex flex-col items-center">
              <h1 className="font-display text-gold-foil text-xl md:text-2xl tracking-[0.15em]">
                RAJAAN
              </h1>
              <span className="text-[9px] uppercase tracking-[0.4em] text-champagne/60 mt-0.5">Atelier</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })} className="text-parchment/70 hover:text-gold-foil transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => dispatch({ type: 'TOGGLE_FAVOURITES' })} className="text-parchment/70 hover:text-gold-foil transition-colors hidden sm:block relative">
                <Heart className="w-5 h-5" />
                {state.favourites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-ruby text-[9px] text-white rounded-full flex items-center justify-center">{state.favourites.length}</span>
                )}
              </button>
              <button
                onClick={() => {
                  if (state.user) {
                    dispatch({ type: 'TOGGLE_ACCOUNT' });
                  } else {
                    dispatch({ type: 'TOGGLE_AUTH', payload: { mode: 'login' } });
                  }
                }}
                className="text-parchment/70 hover:text-gold-foil transition-colors hidden sm:block relative"
                title={state.user ? `Hi, ${state.user.name}` : 'Sign In'}
              >
                {state.user ? (
                  <div className="w-7 h-7 rounded-full bg-gold-foil/10 border border-gold-foil/30 flex items-center justify-center">
                    <span className="text-xs font-heading text-gold-foil">
                      {state.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'TOGGLE_CART' });
                }} 
                className="text-parchment/70 hover:text-gold-foil transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-foil text-[9px] text-obsidian rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </button>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })} 
                className="lg:hidden text-parchment/70 hover:text-gold-foil transition-all relative group"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {state.mobileMenu && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-foil rounded-full animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {state.showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gold-foil/20 bg-obsidian"
            >
              <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-foil/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search royal collections, fabrics, bespoke services..."
                    className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-4 pl-12 pr-12 text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50 transition-colors"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-champagne/50 hover:text-gold-foil transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Search Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Kurta', 'Sherwani', 'Bandhgala', 'Chikankari', 'Zardozi', 'Silk', 'Wedding', 'Black', 'Gold'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs px-3 py-1 border border-gold-foil/20 text-champagne/60 rounded-full hover:border-gold-foil/50 hover:text-gold-foil cursor-pointer transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-6">
                    {searchResults.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-champagne/50 text-sm">No products found for "{searchQuery}"</p>
                        <p className="text-champagne/30 text-xs mt-2">Try searching for "kurta", "sherwani", or "silk"</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-champagne/50 mb-4">
                          Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                          {searchResults.map((product) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-3 p-3 glass-card rounded-sm hover:border-gold-foil/30 transition-all group"
                            >
                              {/* Product Image */}
                              <div className="w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-gradient-to-br from-gold-foil/10 to-obsidian">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gold-foil/30 text-2xl">✦</span>
                                  </div>
                                )}
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm text-parchment font-medium truncate group-hover:text-gold-foil transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-champagne/40 mt-1">{product.color}</p>
                                <p className="text-xs text-champagne/40 mt-0.5">{product.tag}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <p className="text-gold-foil font-heading text-sm">
                                    {formatPrice(product.price, state.currency)}
                                  </p>
                                  <button
                                    onClick={() => {
                                      dispatch({ type: 'ADD_TO_CART', payload: product });
                                      setSearchQuery('');
                                      dispatch({ type: 'TOGGLE_SEARCH' });
                                    }}
                                    className="text-[10px] bg-gold-foil text-obsidian px-2 py-1 rounded-sm hover:bg-gold-light transition-colors flex items-center gap-1"
                                  >
                                    <ShoppingBag className="w-3 h-3" />
                                    Add
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Recent Searches / Suggestions when no query */}
                {!searchQuery && (
                  <div className="mt-6">
                    <p className="text-xs text-champagne/50 mb-3">Popular Searches</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { term: 'Wedding Kurtas', icon: '👑' },
                        { term: 'Sherwani Collection', icon: '✨' },
                        { term: 'Chikankari Work', icon: '🪡' },
                        { term: 'Silk Kurtas', icon: '🎽' },
                      ].map((suggestion) => (
                        <button
                          key={suggestion.term}
                          onClick={() => setSearchQuery(suggestion.term.split(' ')[0])}
                          className="flex items-center gap-2 p-3 glass-card rounded-sm hover:border-gold-foil/30 transition-all text-left"
                        >
                          <span className="text-lg">{suggestion.icon}</span>
                          <span className="text-xs text-champagne/70">{suggestion.term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {state.mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
              className="fixed inset-0 bg-obsidian/90 z-[59] lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-full max-w-sm bg-obsidian border-r border-gold-foil/20 z-[60] overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="p-6 pb-24">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gold-foil/10">
                  <div>
                    <h2 className="font-display text-gold-foil text-2xl tracking-widest">RAJAAN</h2>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-champagne/60 mt-1">Atelier</p>
                  </div>
                  <button 
                    onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })} 
                    className="text-parchment/70 hover:text-gold-foil transition-colors p-2 hover:bg-gold-foil/5 rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-6">
                  {navItems.map((item, idx) => (
                    <MobileMenuSection 
                      key={item.label} 
                      item={item} 
                      index={idx}
                      onClose={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
                    />
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-gold-foil/10 space-y-3">
                  <a 
                    href="#" 
                    onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
                    className="flex items-center gap-3 p-3 glass-card rounded-sm hover:border-gold-foil/30 transition-all group"
                  >
                    <User className="w-5 h-5 text-gold-foil" />
                    <span className="text-sm text-champagne/80 group-hover:text-gold-foil transition-colors">My Account</span>
                  </a>
                  <a 
                    href="#" 
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_MOBILE_MENU' });
                      dispatch({ type: 'TOGGLE_FAVOURITES' });
                    }}
                    className="flex items-center gap-3 p-3 glass-card rounded-sm hover:border-gold-foil/30 transition-all group"
                  >
                    <Heart className="w-5 h-5 text-gold-foil" />
                    <span className="text-sm text-champagne/80 group-hover:text-gold-foil transition-colors">Royal Vault ({state.favourites.length})</span>
                  </a>
                  <a 
                    href="https://wa.me/" 
                    className="flex items-center gap-3 p-3 glass-card rounded-sm hover:border-gold-foil/30 transition-all group"
                  >
                    <MessageCircle className="w-5 h-5 text-gold-foil" />
                    <span className="text-sm text-champagne/80 group-hover:text-gold-foil transition-colors">VIP Concierge</span>
                  </a>
                </div>

                {/* Currency Selector */}
                <div className="mt-6 pt-6 border-t border-gold-foil/10">
                  <p className="text-xs uppercase tracking-wider text-champagne/50 mb-3">Currency</p>
                  <div className="flex flex-wrap gap-2">
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => dispatch({ type: 'SET_CURRENCY', payload: c })}
                        className={`px-3 py-1.5 text-xs border rounded-sm transition-all ${
                          c === state.currency
                            ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                            : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {state.showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'TOGGLE_CART' });
              }}
              className="fixed inset-0 bg-obsidian/95 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-obsidian border-l-2 border-gold-foil/30 z-[70] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-gold-foil" />
                    <h2 className="font-heading text-lg text-gold-foil tracking-wider">Shopping Bag</h2>
                    <span className="text-xs text-champagne/40">({cartCount})</span>
                  </div>
                  <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} className="text-parchment/70 hover:text-gold-foil">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress */}
                {cartCount > 0 && (
                  <div className="mb-6 p-4 glass-card rounded-sm">
                    {remainingAmount > 0 ? (
                      <p className="text-xs text-champagne/70 mb-2">
                        You're <span className="text-gold-foil font-medium">{formatPrice(remainingAmount, state.currency)} away</span> from complimentary express delivery
                      </p>
                    ) : (
                      <p className="text-xs text-gold-foil mb-2 flex items-center gap-1">
                        <Truck className="w-3 h-3" /> You've unlocked complimentary express delivery!
                      </p>
                    )}
                    <div className="w-full h-1 bg-obsidian-light rounded-full overflow-hidden">
                      <div className="shipping-progress h-full rounded-full" style={{ width: `${shippingProgress}%` }} />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <input
                        type="checkbox"
                        id="giftbox"
                        checked={state.giftBox}
                        onChange={() => dispatch({ type: 'TOGGLE_GIFT_BOX' })}
                        className="accent-gold-foil"
                      />
                      <label htmlFor="giftbox" className="text-xs text-champagne/70">Complimentary luxury gift-box wrapping (+₹2,500)</label>
                    </div>
                  </div>
                )}

                {/* Empty Cart */}
                {cartCount === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gold-foil/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-gold-foil/30" />
                    </div>
                    <h3 className="text-sm text-parchment mb-2">Your bag is empty</h3>
                    <p className="text-xs text-champagne/40 max-w-xs mx-auto">
                      Explore our royal collections and add pieces that speak to your sovereign style.
                    </p>
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                      className="mt-6 text-xs text-gold-foil border-b border-gold-foil/30 pb-0.5 hover:border-gold-foil transition-colors"
                    >
                      Explore Collections
                    </button>
                  </div>
                )}

                {/* Cart Items */}
                <div className="space-y-4 mb-8">
                  {state.cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-3 glass-card rounded-sm"
                    >
                      <div className="w-20 h-24 bg-emerald-royal rounded-sm flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gold-foil/30 text-2xl">✦</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-parchment font-medium truncate">{item.name}</h3>
                        <p className="text-xs text-champagne/50 mt-1">Size {item.selectedSize} • {item.color}</p>
                        <p className="text-sm text-gold-foil mt-2">{formatPrice(item.price, state.currency)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                            className="w-6 h-6 border border-gold-foil/20 rounded-sm flex items-center justify-center text-champagne/60 hover:text-gold-foil hover:border-gold-foil/40 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-parchment w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                            className="w-6 h-6 border border-gold-foil/20 rounded-sm flex items-center justify-center text-champagne/60 hover:text-gold-foil hover:border-gold-foil/40 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="text-champagne/30 hover:text-ruby transition-colors self-start"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Cart Summary */}
                {cartCount > 0 && (
                  <div className="border-t border-gold-foil/10 pt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-champagne/70">Subtotal</span>
                      <span className="text-sm text-parchment">{formatPrice(cartTotal, state.currency)}</span>
                    </div>
                    {state.giftBox && (
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-champagne/70">Gift Packaging</span>
                        <span className="text-sm text-parchment">₹2,500</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-champagne/70">Shipping</span>
                      <span className="text-sm text-gold-foil">{remainingAmount <= 0 ? 'Complimentary' : formatPrice(1500, state.currency)}</span>
                    </div>
                    <div className="flex justify-between mb-6 pt-3 border-t border-gold-foil/10">
                      <span className="font-heading text-gold-foil">Total</span>
                      <span className="font-heading text-gold-foil text-lg">
                        {formatPrice(cartTotal + (state.giftBox ? 2500 : 0) + (remainingAmount <= 0 ? 0 : 1500), state.currency)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (state.user) {
                          dispatch({ type: 'TOGGLE_CHECKOUT', payload: true });
                        } else {
                          dispatch({ type: 'TOGGLE_CART' });
                          dispatch({ type: 'TOGGLE_AUTH', payload: { mode: 'login' } });
                        }
                      }}
                      className="w-full btn-magnetic bg-gold-foil text-obsidian py-4 font-heading tracking-wider text-sm hover:bg-gold-light transition-colors"
                    >
                      {state.user ? 'PROCEED TO SECURE CHECKOUT' : 'SIGN IN TO CHECKOUT'}
                    </button>
                    <button
                      onClick={() => {
                        dispatch({ type: 'TOGGLE_CART' });
                        dispatch({ type: 'TOGGLE_FAVOURITES' });
                      }}
                      className="w-full mt-3 border border-gold-foil/20 text-gold-foil py-3 text-xs tracking-wider uppercase hover:bg-gold-foil/5 transition-colors"
                    >
                      View Favourites ({state.favourites.length})
                    </button>
                    <p className="text-center text-[10px] text-champagne/40 mt-3 tracking-wider">SSL ENCRYPTED • SECURE PAYMENT</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile Menu Section Component with expandable/collapsible functionality
function MobileMenuSection({ item, index, onClose }: { item: { label: string; submenu: string[]; links: string[] }; index: number; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gold-foil/10 pb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 group"
      >
        <h3 className="text-sm uppercase tracking-[0.15em] text-gold-foil font-medium group-hover:text-gold-light transition-colors">
          {item.label}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-champagne/60" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 space-y-1">
              {item.submenu.map((sub, subIdx) => (
                <motion.a
                  key={sub}
                  href={item.links[subIdx]}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: subIdx * 0.03 }}
                  className="flex items-center gap-3 py-2.5 px-3 text-sm text-champagne/70 hover:text-gold-foil hover:bg-gold-foil/5 rounded-sm transition-all group"
                >
                  <span className="w-1 h-1 bg-gold-foil/30 rounded-full group-hover:bg-gold-foil transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform">{sub}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
