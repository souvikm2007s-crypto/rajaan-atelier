import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Heart } from 'lucide-react';
import { useStore, formatPrice } from '../store/StoreContext';

export function Favourites() {
  const { state, dispatch } = useStore();

  if (!state.showFavourites) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch({ type: 'TOGGLE_FAVOURITES' })}
          className="fixed inset-0 bg-obsidian/95 z-[60]"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-obsidian border-l-2 border-gold-foil/30 z-[70] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-gold-foil fill-gold-foil" />
                <h2 className="font-heading text-lg text-gold-foil tracking-wider">Royal Vault</h2>
                <span className="text-xs text-champagne/40">({state.favourites.length})</span>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_FAVOURITES' })}
                className="text-parchment/70 hover:text-gold-foil transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Empty State */}
            {state.favourites.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold-foil/5 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-gold-foil/30" />
                </div>
                <h3 className="text-sm text-parchment mb-2">Your vault is empty</h3>
                <p className="text-xs text-champagne/40 max-w-xs mx-auto">
                  Save your favourite pieces here for easy access. Tap the heart icon on any product to add it to your collection.
                </p>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_FAVOURITES' })}
                  className="mt-6 text-xs text-gold-foil border-b border-gold-foil/30 pb-0.5 hover:border-gold-foil transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            )}

            {/* Favourites List */}
            <div className="space-y-4">
              {state.favourites.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex gap-4 p-4 glass-card rounded-sm group"
                >
                  {/* Image */}
                  <div className={`w-24 h-28 bg-gradient-to-b ${item.bgGradient} rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden relative`}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gold-foil/30 text-3xl">✦</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-parchment font-medium truncate">{item.name}</h3>
                    <p className="text-xs text-champagne/40 mt-1">{item.color}</p>
                    <p className="text-[10px] text-gold-foil/60 mt-1">{item.tag}</p>
                    
                    {/* Sizes */}
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[9px] text-champagne/30 mr-1">Size:</span>
                      {item.sizes.slice(0, 4).map((size) => (
                        <span key={size} className="text-[10px] text-champagne/40 hover:text-gold-foil hover:bg-gold-foil/10 px-1.5 py-0.5 cursor-pointer transition-colors rounded-sm">
                          {size}
                        </span>
                      ))}
                      {item.sizes.length > 4 && (
                        <span className="text-[10px] text-champagne/30">+{item.sizes.length - 4}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm text-gold-foil font-medium">{formatPrice(item.price, state.currency)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: item.id })}
                          className="text-champagne/30 hover:text-ruby transition-colors p-1"
                          title="Remove from favourites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            dispatch({ type: 'ADD_TO_CART', payload: item });
                            dispatch({ type: 'TOGGLE_FAVOURITES' });
                            dispatch({ type: 'TOGGLE_CART' });
                          }}
                          className="bg-gold-foil text-obsidian px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium hover:bg-gold-light transition-colors flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions */}
            {state.favourites.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gold-foil/10">
                <button
                  onClick={() => {
                    state.favourites.forEach((item) => {
                      dispatch({ type: 'ADD_TO_CART', payload: item });
                    });
                    dispatch({ type: 'TOGGLE_FAVOURITES' });
                    dispatch({ type: 'TOGGLE_CART' });
                  }}
                  className="w-full btn-magnetic bg-gold-foil text-obsidian py-4 font-heading text-xs tracking-wider hover:bg-gold-light transition-colors"
                >
                  ADD ALL TO BAG ({state.favourites.length} items)
                </button>
                <p className="text-center text-[10px] text-champagne/30 mt-3 tracking-wider">
                  Total: {formatPrice(state.favourites.reduce((sum, item) => sum + item.price, 0), state.currency)}
                </p>
              </div>
            )}

            {/* Recommendations */}
            {state.favourites.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gold-foil/10">
                <h3 className="text-xs uppercase tracking-wider text-champagne/50 mb-4">You May Also Love</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 100, name: 'Banarasi Silk Dhoti', price: 45000, emoji: '👖', color: 'Gold' },
                    { id: 101, name: 'Pearl Button Set', price: 12000, emoji: '💎', color: 'Ivory' },
                  ].map((rec) => (
                    <div key={rec.id} className="glass-card rounded-sm p-3 text-center">
                      <div className="w-full aspect-square bg-emerald-royal/20 rounded-sm flex items-center justify-center mb-2">
                        <span className="text-2xl">{rec.emoji}</span>
                      </div>
                      <p className="text-[10px] text-parchment truncate">{rec.name}</p>
                      <p className="text-[10px] text-gold-foil mt-1">{formatPrice(rec.price, state.currency)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
