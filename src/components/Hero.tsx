import { motion } from 'framer-motion';
import { Play, Calendar } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background with gradient overlay simulating cinematic video */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/4e6a10ae-edd3-44ec-9f7f-fa50687768ee/_result.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/80 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.15)_0%,transparent_70%)]" />
        
        {/* Animated gold particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-foil/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${8 + Math.random() * 12}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Decorative embroidery pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-foil" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil">Autumn Winter 2026</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-foil" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-parchment leading-tight mb-4">
            <span className="block">Regal Heritage.</span>
            <span className="block gold-shimmer mt-2">Modern Sovereignty.</span>
          </h1>

          <p className="text-champagne/80 text-sm md:text-base max-w-xl mx-auto mt-6 leading-relaxed tracking-wide">
            Where centuries of royal Indian craftsmanship converge with contemporary luxury. 
            Each garment, a sovereign statement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic bg-gold-foil text-obsidian px-8 py-4 font-heading text-sm tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold-foil/20"
            >
              Explore the Autumn-Winter Darbar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic border border-gold-foil/40 text-gold-foil px-8 py-4 font-heading text-sm tracking-[0.15em] uppercase hover:border-gold-foil hover:bg-gold-foil/5 transition-all duration-300 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book a Virtual Bespoke Session
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full"
        >
          <div className="w-2 h-2 bg-gold-foil rounded-full animate-pulse" />
          <span className="text-xs text-champagne/60 tracking-wider">
            Handcrafted across <span className="text-gold-foil font-medium">1,200</span> artisanal hours
          </span>
          <div className="h-4 w-px bg-gold-foil/20" />
          <span className="text-xs text-champagne/60 tracking-wider">
            <span className="text-gold-foil font-medium">48</span> Master Artisans
          </span>
          <div className="h-4 w-px bg-gold-foil/20" />
          <span className="text-xs text-champagne/60 tracking-wider">
            Starting <span className="text-gold-foil font-medium">₹81,340</span>
          </span>
        </motion.div>

        {/* Video Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-12 right-8 hidden lg:block"
        >
          <button className="w-16 h-16 rounded-full border border-gold-foil/30 flex items-center justify-center hover:border-gold-foil hover:bg-gold-foil/10 transition-all duration-300 group">
            <Play className="w-5 h-5 text-gold-foil group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-[9px] text-champagne/40 tracking-widest uppercase mt-2 text-center block">Watch Film</span>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
