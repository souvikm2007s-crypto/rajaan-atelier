import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Calendar, Award, ChevronRight } from 'lucide-react';

export function ArtisanGuilds() {
  const [selectedGuild, setSelectedGuild] = useState<number | null>(null);

  const guilds = [
    {
      id: 1,
      name: 'The Bengal Zari Guild',
      location: 'Murshidabad, West Bengal',
      established: '1690',
      artisans: '120+',
      specialty: 'Pure Zari & Gold Thread Weaving',
      description: 'For over 300 years, the Zari weavers of Bengal have spun pure gold and silver threads into fabrics worn by Mughal emperors and British viceroys alike. Each sari border takes 45 days of meticulous hand-weaving.',
      techniques: ['Zari Weaving', 'Gold Thread Spinning', 'Silver Thread Work', 'Brocade Creation'],
      image: 'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
      icon: '✦',
    },
    {
      id: 2,
      name: 'Kashmir Crewel Needlework',
      location: 'Srinagar, Jammu & Kashmir',
      established: '1586',
      artisans: '85+',
      specialty: 'Aari Chain-Stitch Embroidery',
      description: 'In the valleys of Kashmir, artisans practice the ancient art of crewel embroidery — a chain-stitch technique using an aari needle that creates flowing botanical motifs inspired by Mughal garden designs.',
      techniques: ['Aari Needle Work', 'Chain Stitch', 'Botanical Motifs', 'Crewel Embroidery'],
      image: 'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
      icon: '❋',
    },
    {
      id: 3,
      name: 'Awadh Chikankari',
      location: 'Lucknow, Uttar Pradesh',
      established: '1730',
      artisans: '200+',
      specialty: 'Shadow Stitch & White Embroidery',
      description: 'The ethereal white-on-white embroidery of Lucknow traces its origins to the court of the Nawabs of Awadh. Each motif — from the beloved "bakhiya" shadow stitch to the intricate "murri" rice-grain pattern — is a meditation in patience.',
      techniques: ['Bakhiya Shadow Stitch', 'Murri Rice-Grain', 'Phanda French Knot', 'Teepa Direct Stitch'],
      image: 'https://image.qwenlm.ai/generated-images/9c60e8a2-8dcc-47d8-9343-9ee47c87f8e4/_result.png',
      icon: '✿',
    },
    {
      id: 4,
      name: 'Banarasi Silk Weavers',
      location: 'Varanasi, Uttar Pradesh',
      established: '1600',
      artisans: '150+',
      specialty: 'Brocade & Silk Weaving',
      description: 'The legendary Banarasi silk weavers of Varanasi create some of the finest textiles in the world. Their brocade work, featuring intricate gold and silver zari patterns, has adorned royalty for centuries.',
      techniques: ['Jacquard Weaving', 'Brocade Creation', 'Zari Integration', 'Silk Dyeing'],
      image: 'https://image.qwenlm.ai/generated-images/bb51b308-0a5f-47f7-927b-912fa3f6fa69/_result.png',
      icon: '❂',
    },
    {
      id: 5,
      name: 'Rajputi Block Printers',
      location: 'Jaipur, Rajasthan',
      established: '1750',
      artisans: '90+',
      specialty: 'Hand Block Printing',
      description: 'The master block printers of Rajasthan create stunning patterns using hand-carved wooden blocks. Each design is a masterpiece of precision, with natural dyes that age beautifully over time.',
      techniques: ['Wood Block Carving', 'Natural Dyeing', 'Multi-Color Printing', 'Resist Dyeing'],
      image: 'https://image.qwenlm.ai/generated-images/7a6b585d-5604-4b64-a286-0b09aa486122/_result.png',
      icon: '✺',
    },
    {
      id: 6,
      name: 'Pashmina Artisans',
      location: 'Kashmir Valley',
      established: '1500',
      artisans: '75+',
      specialty: 'Pashmina & Cashmere',
      description: 'The pashmina artisans of Kashmir work with the finest cashmere wool, creating shawls and garments of unparalleled softness. Each piece takes months to complete, with some featuring intricate embroidery.',
      techniques: ['Pashmina Weaving', 'Cashmere Spinning', 'Sozni Embroidery', 'Kani Weaving'],
      image: 'https://image.qwenlm.ai/generated-images/238c8191-7e5f-47c4-9092-f5e76c2f402d/_result.png',
      icon: '❄',
    },
  ];

  return (
    <section id="artisan-guilds" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-emerald-royal/5 to-obsidian" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Our Partners</span>
          <h2 className="font-display text-4xl md:text-6xl text-parchment mt-4 mb-6">
            Artisan Guilds
          </h2>
          <p className="text-champagne/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We partner with six prestigious guilds across India, each with centuries of expertise in their craft. 
            These partnerships ensure authentic craftsmanship and fair wages for master artisans.
          </p>
        </motion.div>

        {/* Guilds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guilds.map((guild, idx) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedGuild(guild.id)}
              className="glass-card rounded-sm overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={guild.image}
                  alt={guild.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gold-foil">{guild.icon}</span>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-champagne/80">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{guild.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-lg text-parchment mb-2 group-hover:text-gold-foil transition-colors">
                  {guild.name}
                </h3>
                <p className="text-xs text-champagne/60 mb-4 line-clamp-2">{guild.description}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gold-foil/10">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gold-foil" />
                    <span className="text-xs text-champagne/60">{guild.artisans} Artisans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gold-foil" />
                    <span className="text-xs text-champagne/60">Est. {guild.established}</span>
                  </div>
                </div>

                {/* Learn More */}
                <div className="mt-4 flex items-center gap-2 text-gold-foil text-xs group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guild Detail Modal */}
        <AnimatePresence>
          {selectedGuild && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              onClick={() => setSelectedGuild(null)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-obsidian border border-gold-foil/20 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const guild = guilds.find(g => g.id === selectedGuild);
                  if (!guild) return null;
                  
                  return (
                    <>
                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedGuild(null)}
                        className="absolute top-4 right-4 w-10 h-10 glass-card rounded-full flex items-center justify-center text-champagne/60 hover:text-gold-foil z-10"
                      >
                        ✕
                      </button>

                      {/* Image */}
                      <div className="aspect-[16/9] relative">
                        <img src={guild.image} alt={guild.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center">
                              <span className="text-3xl text-gold-foil">{guild.icon}</span>
                            </div>
                            <div>
                              <h2 className="font-heading text-2xl text-parchment">{guild.name}</h2>
                              <div className="flex items-center gap-2 text-champagne/60">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{guild.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="glass-card rounded-sm p-4 text-center">
                            <Users className="w-6 h-6 text-gold-foil mx-auto mb-2" />
                            <p className="text-lg font-heading text-gold-foil">{guild.artisans}</p>
                            <p className="text-[10px] text-champagne/60">Master Artisans</p>
                          </div>
                          <div className="glass-card rounded-sm p-4 text-center">
                            <Calendar className="w-6 h-6 text-gold-foil mx-auto mb-2" />
                            <p className="text-lg font-heading text-gold-foil">{guild.established}</p>
                            <p className="text-[10px] text-champagne/60">Established</p>
                          </div>
                          <div className="glass-card rounded-sm p-4 text-center">
                            <Award className="w-6 h-6 text-gold-foil mx-auto mb-2" />
                            <p className="text-xs font-heading text-gold-foil">{guild.specialty}</p>
                            <p className="text-[10px] text-champagne/60">Specialty</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                          <h3 className="font-heading text-xl text-parchment mb-4">About the Guild</h3>
                          <p className="text-sm text-champagne/70 leading-relaxed">{guild.description}</p>
                        </div>

                        {/* Techniques */}
                        <div className="mb-8">
                          <h3 className="font-heading text-xl text-parchment mb-4">Traditional Techniques</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {guild.techniques.map((tech) => (
                              <div key={tech} className="glass-card rounded-sm p-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-gold-foil rounded-full" />
                                <span className="text-xs text-champagne/70">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certification */}
                        <div className="glass-card rounded-sm p-6 border-l-2 border-gold-foil/30">
                          <div className="flex items-start gap-4">
                            <Award className="w-8 h-8 text-gold-foil flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gold-foil font-medium mb-1">GI-Certified Authentic</p>
                              <p className="text-xs text-champagne/60">
                                This guild is certified by the Textile Ministry of India for authentic traditional craftsmanship.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
