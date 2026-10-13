import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe, Award, Users } from 'lucide-react';

export function Sustainability() {
  const initiatives = [
    {
      icon: Leaf,
      title: 'Eco-Friendly Dyes',
      description: 'We use only natural, plant-based dyes that are safe for artisans and the environment.',
      stat: '100%',
      statLabel: 'Natural Dyes',
    },
    {
      icon: Recycle,
      title: 'Zero Waste Production',
      description: 'Fabric scraps are repurposed into accessories, ensuring minimal waste in our production.',
      stat: '95%',
      statLabel: 'Waste Recycled',
    },
    {
      icon: Heart,
      title: 'Fair Wages',
      description: 'Every artisan receives fair compensation, 40% above industry standard, with healthcare benefits.',
      stat: '400+',
      statLabel: 'Artisans Supported',
    },
    {
      icon: Globe,
      title: 'Carbon Neutral',
      description: 'We offset 100% of our carbon footprint through verified environmental projects.',
      stat: '100%',
      statLabel: 'Carbon Offset',
    },
    {
      icon: Award,
      title: 'Heritage Preservation',
      description: 'Active documentation and teaching of traditional techniques to prevent craft extinction.',
      stat: '6',
      statLabel: 'Crafts Preserved',
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Investing in artisan communities through education, healthcare, and infrastructure.',
      stat: '₹2Cr+',
      statLabel: 'Community Investment',
    },
  ];

  const certifications = [
    'GI Certified Handloom',
    'Fair Trade Certified',
    'Organic Textile Standard',
    'Carbon Neutral Certified',
    'Handmade Heritage Mark',
    'Ethical Fashion Guide',
  ];

  return (
    <section id="sustainability" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/f5811ce6-a6a3-41ae-9814-ef2ca7d155fd/_result.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-obsidian/85" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Our Commitment</span>
          <h2 className="font-display text-4xl md:text-6xl text-parchment mt-4 mb-6">
            Sustainability & Ethics
          </h2>
          <p className="text-champagne/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            At Rajaan Atelier, luxury and responsibility go hand in hand. We're committed to preserving 
            both our cultural heritage and our planet for future generations.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] glass-card rounded-sm overflow-hidden relative">
              <img
                src="https://image.qwenlm.ai/generated-images/dccb3419-bc36-4f59-9a39-d67bfc213b33/_result.png"
                alt="Sustainable Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="w-6 h-6 text-gold-foil" />
                    <h3 className="font-heading text-lg text-parchment">Our Promise</h3>
                  </div>
                  <p className="text-xs text-champagne/70 leading-relaxed">
                    Every Rajaan piece is crafted with respect for artisans, tradition, and the environment. 
                    We believe true luxury cannot exist without responsibility.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Initiatives Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {initiatives.map((initiative, idx) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-sm p-5"
              >
                <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center mb-3">
                  <initiative.icon className="w-5 h-5 text-gold-foil" />
                </div>
                <h4 className="font-heading text-sm text-parchment mb-2">{initiative.title}</h4>
                <p className="text-[10px] text-champagne/60 leading-relaxed mb-3">
                  {initiative.description}
                </p>
                <div className="pt-3 border-t border-gold-foil/10">
                  <p className="text-lg font-heading text-gold-foil">{initiative.stat}</p>
                  <p className="text-[9px] text-champagne/40 uppercase tracking-wider">{initiative.statLabel}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-sm p-8 md:p-12"
        >
          <h3 className="font-heading text-2xl text-gold-foil text-center mb-8">Our Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 border border-gold-foil/20 rounded-sm hover:border-gold-foil/40 transition-all cursor-pointer"
              >
                <Award className="w-6 h-6 text-gold-foil mx-auto mb-2" />
                <p className="text-[10px] text-champagne/70 leading-tight">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '400+', label: 'Artisan Families Supported' },
            { value: '6', label: 'Traditional Crafts Preserved' },
            { value: '₹2Cr+', label: 'Community Investment' },
            { value: '100%', label: 'Carbon Neutral Operations' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card rounded-sm p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-heading text-gold-foil mb-2">{stat.value}</p>
              <p className="text-xs text-champagne/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
