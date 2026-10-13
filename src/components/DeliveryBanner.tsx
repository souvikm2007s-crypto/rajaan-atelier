import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Shield } from 'lucide-react';

export function DeliveryBanner() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-obsidian border-y border-gold-foil/20 py-4 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-gold-foil" />
            </div>
            <div>
              <p className="text-xs text-gold-foil font-medium">Free All-India Delivery</p>
              <p className="text-[10px] text-champagne/50">On orders above ₹50,000</p>
            </div>
          </motion.div>

          <div className="hidden md:block w-px h-8 bg-gold-foil/20" />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold-foil" />
            </div>
            <div>
              <p className="text-xs text-gold-foil font-medium">Pan-India Coverage</p>
              <p className="text-[10px] text-champagne/50">28 States • 8 Union Territories</p>
            </div>
          </motion.div>

          <div className="hidden md:block w-px h-8 bg-gold-foil/20" />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold-foil" />
            </div>
            <div>
              <p className="text-xs text-gold-foil font-medium">Express Delivery</p>
              <p className="text-[10px] text-champagne/50">7-10 Business Days</p>
            </div>
          </motion.div>

          <div className="hidden md:block w-px h-8 bg-gold-foil/20" />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold-foil" />
            </div>
            <div>
              <p className="text-xs text-gold-foil font-medium">Secure Packaging</p>
              <p className="text-[10px] text-champagne/50">Insurance Included</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
