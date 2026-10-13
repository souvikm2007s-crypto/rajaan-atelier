import { motion } from 'framer-motion';
import { Crown, Heart, Award, Users } from 'lucide-react';

export function OurStory() {
  const milestones = [
    { year: '2018', title: 'The Beginning', desc: 'Founded with a vision to preserve India\'s royal textile heritage' },
    { year: '2020', title: 'First Guild Partnership', desc: 'Partnered with Bengal Zari Guild, bringing 300-year-old craftsmanship to modern fashion' },
    { year: '2022', title: 'National Recognition', desc: 'Awarded "Best Heritage Fashion Brand" by Fashion Council of India' },
    { year: '2024', title: 'Global Expansion', desc: 'Launched international shipping, bringing Indian royalty to the world' },
  ];

  const values = [
    { icon: Crown, title: 'Royal Heritage', desc: 'Every piece carries the legacy of Indian royalty' },
    { icon: Heart, title: 'Artisan First', desc: 'Fair wages and preservation of traditional crafts' },
    { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in every stitch' },
    { icon: Users, title: 'Community', desc: 'Supporting 400+ artisan families across India' },
  ];

  return (
    <section id="our-story" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/21715f12-4e80-437d-8685-682a4d2e2e0a/_result.png"
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
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Our Journey</span>
          <h2 className="font-display text-4xl md:text-6xl text-parchment mt-4 mb-6">
            The Rajaan Story
          </h2>
          <p className="text-champagne/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-4">
            Born from a passion for India's rich textile heritage, Rajaan Atelier bridges centuries of royal craftsmanship 
            with contemporary luxury. We don't just create garments; we preserve legacies.
          </p>
          <p className="text-gold-foil/60 max-w-xl mx-auto text-xs italic">
            Founded by <span className="text-gold-foil font-medium">Souvik</span> — A curator of India's finest textile traditions
          </p>
        </motion.div>

        {/* Story Content */}
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
                src="https://image.qwenlm.ai/generated-images/fa791e14-7abf-441c-a770-168ca30b9f33/_result.png"
                alt="Rajaan Atelier Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-heading text-gold-foil">400+</p>
                    <p className="text-[10px] text-champagne/60">Artisans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading text-gold-foil">6</p>
                    <p className="text-[10px] text-champagne/60">Guilds</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading text-gold-foil">300+</p>
                    <p className="text-[10px] text-champagne/60">Years Legacy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-heading text-2xl text-parchment mb-4">Preserving Legacy, Creating Future</h3>
              <p className="text-champagne/60 text-sm leading-relaxed mb-4">
                Rajaan Atelier was founded with a singular mission: to preserve India's endangered textile heritage while 
                creating contemporary luxury that resonates with the modern connoisseur.
              </p>
              <p className="text-champagne/60 text-sm leading-relaxed">
                We work directly with master artisans from six prestigious guilds across India, each with centuries of 
                expertise in their craft. From the intricate zari work of Bengal to the ethereal chikankari of Lucknow, 
                every Rajaan piece is a testament to India's unparalleled craftsmanship.
              </p>
            </div>

            <div className="glass-card rounded-sm p-6 border-l-2 border-gold-foil/30">
              <p className="text-sm text-champagne/70 italic leading-relaxed">
                "Our commitment goes beyond fashion. We're preserving cultural heritage, supporting artisan communities, 
                and ensuring these ancient crafts survive for generations to come. Every piece in our collection tells 
                a story of India's rich textile legacy, and I'm honored to be the custodian of these timeless traditions."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-foil/20 flex items-center justify-center">
                  <span className="text-sm font-heading text-gold-foil">S</span>
                </div>
                <div>
                  <p className="text-xs text-gold-foil font-medium">Souvik</p>
                  <p className="text-[10px] text-champagne/50">Founder & Curator, Rajaan Atelier</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-heading text-2xl text-gold-foil text-center mb-12">Our Journey</h3>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold-foil/40 via-gold-foil/20 to-gold-foil/40" />
            
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className={`flex items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="glass-card rounded-sm p-6 inline-block"
                    >
                      <p className="text-gold-foil font-heading text-2xl mb-2">{milestone.year}</p>
                      <p className="text-parchment font-medium mb-1">{milestone.title}</p>
                      <p className="text-xs text-champagne/60">{milestone.desc}</p>
                    </motion.div>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="w-4 h-4 md:w-5 md:h-5 bg-gold-foil rounded-full border-2 border-obsidian"
                    />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-heading text-2xl text-gold-foil text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-sm p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-foil/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-gold-foil" />
                </div>
                <h4 className="font-heading text-parchment mb-2">{value.title}</h4>
                <p className="text-xs text-champagne/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
