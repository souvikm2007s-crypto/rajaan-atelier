import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Check, X } from 'lucide-react';
import { useStore, formatPrice } from '../store/StoreContext';
import { products, categories } from '../data/products';

export function Collections() {
  const { state, dispatch } = useStore();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number>>({});
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = showAll ? products : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    const size = selectedSizes[product.id] || product.sizes[2] || product.sizes[0];
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        tag: product.tag,
        sizes: product.sizes,
        color: product.color,
        bgGradient: product.bgGradient,
        image: product.image,
        selectedSize: size,
      },
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleSizeSelect = (productId: number, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const isFavourite = (id: number) => state.favourites.some((f) => f.id === id);

  return (
    <section id="collections" className="py-24 px-4 relative noise-texture">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Curated For Royalty</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            The Royal Collections
          </h2>
          <p className="text-champagne/50 max-w-lg mx-auto text-sm leading-relaxed">
            Each piece is a testament to India's rich textile heritage, crafted by master artisans
            whose lineage spans generations of imperial patronage.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(idx);
                setShowAll(false);
              }}
              className={`text-xs md:text-sm tracking-wider uppercase pb-2 transition-all duration-300 ${
                activeCategory === idx && !showAll
                  ? 'text-gold-foil border-b-2 border-gold-foil'
                  : 'text-champagne/50 hover:text-champagne border-b-2 border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-xs md:text-sm tracking-wider uppercase pb-2 transition-all duration-300 ${
              showAll
                ? 'text-gold-foil border-b-2 border-gold-foil'
                : 'text-champagne/50 hover:text-champagne border-b-2 border-transparent'
            }`}
          >
            All Collections
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[2] || product.sizes[0];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="product-card group"
              >
                {/* Product Image */}
                <div className={`relative aspect-[3/4] bg-gradient-to-b ${product.bgGradient} rounded-sm overflow-hidden border border-gold-foil/5`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gold-foil/10 to-obsidian flex items-center justify-center">
                      <span className="text-gold-foil/30 text-4xl">✦</span>
                    </div>
                  )}
                </div>
                  {/* Top Actions - Always visible */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_FAVOURITE', payload: product })}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isFavourite(product.id)
                          ? 'bg-ruby text-white border border-ruby'
                          : 'bg-obsidian/80 text-champagne hover:text-gold-foil border border-gold-foil/30'
                      }`}
                      title="Add to Favourites"
                    >
                      <Heart className={`w-4 h-4 ${isFavourite(product.id) ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-9 h-9 bg-obsidian/80 rounded-full flex items-center justify-center text-champagne hover:text-gold-foil border border-gold-foil/30 transition-all shadow-lg"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-wider bg-obsidian/80 text-gold-foil px-2 py-1 rounded-sm border border-gold-foil/30 shadow-md">
                      {product.tag}
                    </span>
                  </div>

                  {/* Added to cart notification */}
                  {addedToCart === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 right-3 bg-gold-foil text-obsidian text-xs text-center py-2 rounded-sm font-medium z-10"
                    >
                      ✓ Added to Bag
                    </motion.div>
                  )}
                </div>

                {/* Product Info - Always Visible */}
                <div className="mt-4 px-1">
                  <h3 className="text-sm text-parchment font-medium group-hover:text-gold-foil transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-xs text-champagne/40 mt-1">{product.color}</p>

                  {/* Size Picker - Always Visible */}
                  <div className="mt-3">
                    <p className="text-[10px] text-champagne/40 mb-1.5 uppercase tracking-wider">Select Size</p>
                    <div className="flex flex-wrap items-center gap-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`text-[11px] px-2 py-1 rounded-sm border transition-all ${
                            currentSize === size
                              ? 'border-gold-foil bg-gold-foil/10 text-gold-foil font-medium'
                              : 'border-gold-foil/15 text-champagne/50 hover:border-gold-foil/40 hover:text-champagne'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price + Add to Cart */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-gold-foil font-heading text-sm tracking-wider">
                      {formatPrice(product.price, state.currency)}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gold-foil text-obsidian px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium hover:bg-gold-light transition-colors flex items-center gap-1 rounded-sm"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setShowAll(!showAll);
              // Scroll to top of collections section
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-magnetic border border-gold-foil/30 text-gold-foil px-10 py-4 font-heading text-xs tracking-[0.2em] uppercase hover:bg-gold-foil/5 hover:border-gold-foil transition-all duration-300"
          >
            {showAll ? 'View Filtered Collections' : 'View All Collections'}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          selectedSize={selectedSizes[quickViewProduct.id] || quickViewProduct.sizes[2] || quickViewProduct.sizes[0]}
          onSizeSelect={(size) => handleSizeSelect(quickViewProduct.id, size)}
          isFavourite={isFavourite(quickViewProduct.id)}
          onToggleFavourite={() => dispatch({ type: 'TOGGLE_FAVOURITE', payload: quickViewProduct })}
        />
      )}
    </section>
  );
}

function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  selectedSize,
  onSizeSelect,
  isFavourite,
  onToggleFavourite,
}: {
  product: typeof products[0];
  onClose: () => void;
  onAddToCart: (p: typeof products[0]) => void;
  selectedSize: number;
  onSizeSelect: (size: number) => void;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}) {
  const { state } = useStore();
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-obsidian/95" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-obsidian border-2 border-gold-foil/30 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-obsidian-light rounded-full flex items-center justify-center text-champagne/60 hover:text-gold-foil z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className={`aspect-square md:aspect-auto bg-gradient-to-b ${product.bgGradient} flex items-center justify-center relative overflow-hidden`}>
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gold-foil/30 text-8xl">✦</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="text-[9px] uppercase tracking-wider bg-obsidian/80 backdrop-blur-sm text-gold-foil px-2 py-1 rounded-sm border border-gold-foil/20">
                {product.tag}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-foil/60 mb-2">{product.color}</p>
            <h2 className="font-heading text-2xl text-parchment mb-4">{product.name}</h2>
            <p className="text-gold-foil font-heading text-2xl mb-6">
              {formatPrice(product.price, state.currency)}
            </p>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-champagne/50 mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => onSizeSelect(size)}
                    className={`min-w-[44px] px-3 py-2 text-sm border rounded-sm transition-all ${
                      selectedSize === size
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil font-medium'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-champagne/50 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 border border-gold-foil/20 rounded-sm flex items-center justify-center text-champagne hover:text-gold-foil hover:border-gold-foil/40 transition-colors"
                >
                  -
                </button>
                <span className="text-parchment w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 border border-gold-foil/20 rounded-sm flex items-center justify-center text-champagne hover:text-gold-foil hover:border-gold-foil/40 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-gold-foil text-obsidian py-3 font-heading text-xs tracking-wider uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
              <button
                onClick={onToggleFavourite}
                className={`w-12 h-12 border rounded-sm flex items-center justify-center transition-all ${
                  isFavourite
                    ? 'border-ruby bg-ruby/10 text-ruby'
                    : 'border-gold-foil/20 text-champagne hover:text-gold-foil hover:border-gold-foil/40'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavourite ? 'fill-ruby' : ''}`} />
              </button>
            </div>

            {/* Details */}
            <div className="mt-8 pt-6 border-t border-gold-foil/10 space-y-3">
              <div className="flex items-center gap-2 text-xs text-champagne/50">
                <Check className="w-3.5 h-3.5 text-gold-foil" />
                <span>Complimentary shipping above ₹50,000</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-champagne/50">
                <Check className="w-3.5 h-3.5 text-gold-foil" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-champagne/50">
                <Check className="w-3.5 h-3.5 text-gold-foil" />
                <span>Certificate of authenticity included</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-champagne/50">
                <Check className="w-3.5 h-3.5 text-gold-foil" />
                <span>GI-Certified handloom heritage</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
