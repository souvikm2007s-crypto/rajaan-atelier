import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pen, Gift, Shield, Truck, CreditCard, Leaf, Lock } from 'lucide-react';
import { useStore } from '../store/StoreContext';

export function Concierge() {
  const { dispatch } = useStore();
  const [initials, setInitials] = useState('');
  const [fontStyle, setFontStyle] = useState('classic');
  const [threadColor, setThreadColor] = useState('gold');
  const [placement, setPlacement] = useState('left-cuff');
  const [added, setAdded] = useState(false);

  const fontStyles = [
    { id: 'classic', name: 'Classic Serif', preview: 'font-serif' },
    { id: 'modern', name: 'Modern Sans', preview: 'font-sans' },
    { id: 'script', name: 'Elegant Script', preview: 'font-display' },
  ];

  const threadColors = [
    { id: 'gold', name: 'Royal Gold', color: '#D4AF37', bg: 'bg-gold-foil' },
    { id: 'silver', name: 'Platinum Silver', color: '#C0C0C0', bg: 'bg-gray-300' },
    { id: 'rose', name: 'Rose Gold', color: '#B76E79', bg: 'bg-rose-400' },
    { id: 'emerald', name: 'Emerald', color: '#0A231C', bg: 'bg-emerald-700' },
  ];

  const placements = [
    { id: 'left-cuff', name: 'Left Cuff' },
    { id: 'right-cuff', name: 'Right Cuff' },
    { id: 'collar', name: 'Collar' },
    { id: 'hem', name: 'Hem Line' },
  ];

  const handleAddToCart = () => {
    if (!initials) return;
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: Date.now(),
        name: `Bespoke Monogram - ${initials}`,
        price: 500,
        category: 4,
        tag: 'Personalized',
        sizes: [1],
        color: threadColors.find(c => c.id === threadColor)?.name || 'Gold',
        bgGradient: 'from-gold-foil/10 to-obsidian',
      },
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getThreadColorStyle = () => {
    const color = threadColors.find(c => c.id === threadColor);
    return color ? { color: color.color } : { color: '#D4AF37' };
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/21715f12-4e80-437d-8685-682a4d2e2e0a/_result.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-obsidian/90" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">White-Glove Service</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            VIP Concierge & Gifting
          </h2>
          <p className="text-champagne/50 max-w-lg mx-auto text-sm leading-relaxed">
            Personalized monogramming, luxury packaging, and a dedicated concierge for every royal client.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Monogramming Tool */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-sm p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Pen className="w-5 h-5 text-gold-foil" />
              <h3 className="font-heading text-lg text-parchment tracking-wider">Bespoke Monogramming</h3>
            </div>
            <p className="text-sm text-champagne/60 mb-6">
              Customize your monogram with up to 3 initials. Choose your preferred font style, thread color, and placement for exquisite zari embroidery.
            </p>
            
            {/* Initials Input */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-champagne/50 mb-2 block">Your Initials</label>
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                placeholder="ABC"
                className="w-full bg-obsidian border border-gold-foil/30 rounded-sm px-4 py-3 text-center text-gold-foil font-display text-2xl tracking-[0.3em] focus:outline-none focus:border-gold-foil/50"
              />
            </div>

            {/* Font Style Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-champagne/50 mb-3 block">Font Style</label>
              <div className="grid grid-cols-3 gap-2">
                {fontStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFontStyle(style.id)}
                    className={`p-3 border rounded-sm transition-all ${
                      fontStyle === style.id
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    <span className={`${style.preview} text-sm`}>{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Thread Color Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-champagne/50 mb-3 block">Thread Color</label>
              <div className="grid grid-cols-4 gap-2">
                {threadColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setThreadColor(color.id)}
                    className={`p-3 border rounded-sm transition-all ${
                      threadColor === color.id
                        ? 'border-gold-foil bg-gold-foil/10'
                        : 'border-gold-foil/20 hover:border-gold-foil/40'
                    }`}
                  >
                    <div className={`w-6 h-6 ${color.bg} rounded-full mx-auto mb-1 border border-obsidian`} />
                    <span className="text-[10px] text-champagne/60">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-champagne/50 mb-3 block">Placement</label>
              <div className="grid grid-cols-2 gap-2">
                {placements.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => setPlacement(place.id)}
                    className={`p-3 border rounded-sm text-xs transition-all ${
                      placement === place.id
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    {place.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-champagne/50 mb-3 block">Live Preview</label>
              <div className="h-24 border border-gold-foil/30 rounded-sm flex items-center justify-center bg-obsidian relative overflow-hidden">
                <span 
                  className={`text-4xl tracking-[0.3em] ${
                    fontStyle === 'classic' ? 'font-serif' : 
                    fontStyle === 'modern' ? 'font-sans' : 'font-display'
                  }`}
                  style={getThreadColorStyle()}
                >
                  {initials || '...'}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-foil/30" />
              </div>
              <p className="text-[10px] text-champagne/50 mt-2 text-center">
                {placements.find(p => p.id === placement)?.name} • {threadColors.find(c => c.id === threadColor)?.name} Thread
              </p>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={!initials}
              className={`w-full py-3 text-xs tracking-wider uppercase transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : initials
                  ? 'bg-gold-foil/10 border border-gold-foil/30 text-gold-foil hover:bg-gold-foil/20'
                  : 'bg-obsidian-light/50 border border-gold-foil/10 text-champagne/30 cursor-not-allowed'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add Monogram to Cart - ₹500'}
            </button>
          </motion.div>

          {/* Luxury Packaging */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-sm p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-5 h-5 text-gold-foil" />
              <h3 className="font-heading text-lg text-parchment tracking-wider">Royal Packaging</h3>
            </div>
            <p className="text-sm text-champagne/60 mb-6">
              Every RAJAAN garment arrives in our signature keepsake packaging — a testament to the art within.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-obsidian-light/50 rounded-sm">
                <div className="w-12 h-12 bg-emerald-royal/30 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <h4 className="text-sm text-parchment font-medium">Handcrafted Velvet Keepsake Box</h4>
                  <p className="text-xs text-champagne/40 mt-1">Deep emerald velvet with gold-embossed monogram lid</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-obsidian-light/50 rounded-sm">
                <div className="w-12 h-12 bg-emerald-royal/30 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🪷</span>
                </div>
                <div>
                  <h4 className="text-sm text-parchment font-medium">Scented Oud Tag</h4>
                  <p className="text-xs text-champagne/40 mt-1">Hand-tied silk ribbon with aged oud-infused parchment</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-obsidian-light/50 rounded-sm">
                <div className="w-12 h-12 bg-emerald-royal/30 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📜</span>
                </div>
                <div>
                  <h4 className="text-sm text-parchment font-medium">Wax-Sealed Certificate</h4>
                  <p className="text-xs text-champagne/40 mt-1">Personalized certificate of authenticity with artisan signature</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 px-4 border-t border-gold-foil/10">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian to-emerald-deep/20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 pb-16 border-b border-gold-foil/10"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Exclusive Access</span>
          <h3 className="font-display text-2xl md:text-3xl text-parchment mt-4 mb-3">
            Join The Royal Assembly
          </h3>
          <p className="text-champagne/50 text-sm max-w-md mx-auto mb-6">
            Priority access to limited edition drops, private atelier events, and bespoke collection previews.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 w-full bg-obsidian border border-gold-foil/20 rounded-sm px-4 py-3 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
            />
            <button className="w-full sm:w-auto btn-magnetic bg-gold-foil text-obsidian px-6 py-3 font-heading text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-colors whitespace-nowrap">
              Request Invitation
            </button>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="font-display text-gold-foil text-lg tracking-wider mb-4">RAJAAN</h4>
            <p className="text-xs text-champagne/40 leading-relaxed">
              Where centuries of royal Indian craftsmanship converge with contemporary luxury.
            </p>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-champagne/60 mb-4">Atelier</h5>
            <ul className="space-y-2">
              {['Bespoke Services', 'Virtual Fitting', 'Fabric Library', 'Monogramming'].map((link) => (
                <li key={link}><a href="#" className="text-xs text-champagne/40 hover:text-gold-foil transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-champagne/60 mb-4">Services</h5>
            <ul className="space-y-2">
              {['Global Logistics', 'Fabric Care Almanac', 'Alterations', 'Gift Registry'].map((link) => (
                <li key={link}><a href="#" className="text-xs text-champagne/40 hover:text-gold-foil transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-champagne/60 mb-4">Heritage</h5>
            <ul className="space-y-2">
              {['Our Story', 'Artisan Guilds', 'Sustainability Charter', 'Press Room'].map((link) => (
                <li key={link}><a href="#" className="text-xs text-champagne/40 hover:text-gold-foil transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-champagne/60 mb-4">Legal</h5>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Certificates'].map((link) => (
                <li key={link}><a href="#" className="text-xs text-champagne/40 hover:text-gold-foil transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Strip */}
        <div className="border-t border-gold-foil/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-champagne/40" />
              <span className="text-[10px] text-champagne/40 tracking-wider">UPI • Razorpay • Stripe • Apple Pay</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-champagne/40" />
              <span className="text-[10px] text-champagne/40 tracking-wider">No Cost EMI Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-champagne/40" />
              <span className="text-[10px] text-champagne/40 tracking-wider">SSL Military-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-champagne/40" />
              <span className="text-[10px] text-champagne/40 tracking-wider">Climate-Neutral Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-champagne/40" />
              <span className="text-[10px] text-champagne/40 tracking-wider">Free Delivery above ₹50,000</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center">
            <p className="font-display text-gold-foil/40 text-sm tracking-[0.3em] mb-2">RAJAAN ATELIER</p>
            <p className="text-[10px] text-champagne/30 tracking-wider mb-2">
              © 2026 Rajaan Atelier. All rights reserved. Handcrafted with reverence in India.
            </p>
            <p className="text-[10px] text-champagne/40 tracking-wider">
              Curated by <span className="text-gold-foil/60">Souvik</span> • Founder & Creative Director
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
