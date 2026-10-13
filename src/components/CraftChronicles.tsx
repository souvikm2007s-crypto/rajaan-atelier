import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, Users, X } from 'lucide-react';

export function CraftChronicles() {
  const [selectedChronicle, setSelectedChronicle] = useState<number | null>(null);

  const chronicles = [
    {
      id: 1,
      title: 'The Art of Zari Weaving',
      guild: 'Bengal Zari Guild',
      description: 'Master weavers create intricate gold thread patterns that have adorned royalty for centuries. Each piece takes 45 days of meticulous hand-weaving.',
      fullDescription: 'The Bengal Zari Guild represents over 300 years of textile excellence. Master weavers in Murshidabad create intricate gold and silver thread patterns that have adorned Mughal emperors and British viceroys. Each piece requires 45 days of meticulous hand-weaving, with artisans working 8-10 hours daily to achieve perfection. The zari threads are made from pure gold and silver, drawn into fine wires and wrapped around silk cores. This ancient craft has been passed down through generations, with each weaver adding their unique touch to the timeless patterns.',
      image: 'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
      artisans: '120+',
      established: '1690',
      techniques: ['Zari Weaving', 'Gold Thread Spinning', 'Silver Thread Work', 'Brocade Creation'],
    },
    {
      id: 2,
      title: 'Chikankari: White on White',
      guild: 'Awadh Chikankari',
      description: 'The ethereal beauty of Lucknow\'s signature white embroidery technique. Each motif is a meditation in patience, passed down through generations.',
      fullDescription: 'Chikankari, the ethereal white-on-white embroidery of Lucknow, traces its origins to the court of the Nawabs of Awadh. Legend attributes its creation to Nur Jahan, wife of Emperor Jahangir. This delicate art form features over 30 different stitch types, each requiring years of practice to master. The "bakhiya" (shadow stitch) creates a subtle effect visible only when light hits the fabric at certain angles. Artisans work on fine muslin or cotton, creating motifs inspired by nature - flowers, vines, and geometric patterns. Each piece takes 2-6 months to complete, depending on complexity.',
      image: 'https://image.qwenlm.ai/generated-images/9c60e8a2-8dcc-47d8-9343-9ee47c87f8e4/_result.png',
      artisans: '200+',
      established: '1730',
      techniques: ['Bakhiya Shadow Stitch', 'Murri Rice-Grain', 'Phanda French Knot', 'Teepa Direct Stitch'],
    },
    {
      id: 3,
      title: 'Kashmiri Crewel Embroidery',
      guild: 'Kashmir Crewel',
      description: 'Journey through the valleys of Kashmir to witness the ancient art of crewel needlework, creating flowing botanical motifs inspired by Mughal gardens.',
      fullDescription: 'Kashmiri crewel embroidery is an ancient art form introduced by Persian artisans during Emperor Akbar\'s reign. Using a special hooked needle called "aari," artisans create chain stitches that form flowing botanical motifs inspired by the famous Mughal gardens of Kashmir. The designs typically feature chinar leaves, almond blossoms, and intricate vine patterns. Each piece is worked on a wooden frame called a "khatka," which keeps the fabric taut. The wool or silk threads are dyed with natural colors extracted from local plants and minerals. A single shawl can take 3-12 months to complete.',
      image: 'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
      artisans: '85+',
      established: '1586',
      techniques: ['Aari Needle Work', 'Chain Stitch', 'Botanical Motifs', 'Crewel Embroidery'],
    },
    {
      id: 4,
      title: 'Banarasi Silk: The Royal Weave',
      guild: 'Banarasi Weavers',
      description: 'The legendary silk weaving traditions of Varanasi that have dressed emperors. Each saree takes 15 days to 6 months to complete.',
      fullDescription: 'Banarasi silk weaving is one of India\'s most prestigious textile traditions, dating back over 400 years. The weavers of Varanasi create intricate brocade patterns using gold and silver zari threads on pure silk. Each saree requires 15 days to 6 months of work, depending on the complexity of the design. The patterns are inspired by Mughal architecture, featuring motifs like paisleys, floral designs, and geometric patterns. The weaving process involves multiple artisans - the designer, the warp setter, and the weaver - each contributing their expertise. Genuine Banarasi silk is identified by its distinctive zari work and dense weave.',
      image: 'https://image.qwenlm.ai/generated-images/bb51b308-0a5f-47f7-927b-912fa3f6fa69/_result.png',
      artisans: '150+',
      established: '1600',
      techniques: ['Jacquard Weaving', 'Brocade Creation', 'Zari Integration', 'Silk Dyeing'],
    },
    {
      id: 5,
      title: 'Block Printing: Nature\'s Patterns',
      guild: 'Rajputi Printers',
      description: 'Master artisans carve wooden blocks to create stunning natural patterns using techniques passed down for over 500 years.',
      fullDescription: 'Rajputi block printing is a 500-year-old tradition from Rajasthan, where master artisans carve intricate designs into teak wood blocks. Each block is hand-carved by skilled craftsmen, a process that can take 2-3 weeks for a single design. The printing process involves multiple blocks for each color, applied in sequence with perfect alignment. Natural dyes extracted from plants, minerals, and insects create vibrant, colorfast patterns. The fabric is stretched on long printing tables, and artisans work with remarkable precision, stamping each block by hand. Popular motifs include flowers, peacocks, and geometric patterns inspired by Rajasthani architecture.',
      image: 'https://image.qwenlm.ai/generated-images/7a6b585d-5604-4b64-a286-0b09aa486122/_result.png',
      artisans: '90+',
      established: '1750',
      techniques: ['Wood Block Carving', 'Natural Dyeing', 'Multi-Color Printing', 'Resist Dyeing'],
    },
    {
      id: 6,
      title: 'Pashmina: The Soft Gold',
      guild: 'Pashmina Artisans',
      description: 'The meticulous process of creating the world\'s finest cashmere garments, spun from the undercoat of Himalayan mountain goats.',
      fullDescription: 'Pashmina, known as "soft gold," comes from the undercoat of the Changthangi goat found at altitudes above 14,000 feet in the Himalayas. Each goat produces only 100-200 grams of pashmina per year, making it one of the world\'s rarest fibers. The wool is hand-combed during spring molting, then cleaned and spun by hand into fine yarn. Weaving is done on traditional handlooms, with artisans creating intricate patterns using techniques passed down for centuries. Some pashmina shawls feature "kani" weaving, where small wooden bobbins called "kanis" are used to create complex patterns. A single shawl can take 6-18 months to complete.',
      image: 'https://image.qwenlm.ai/generated-images/238c8191-7e5f-47c4-9092-f5e76c2f402d/_result.png',
      artisans: '75+',
      established: '1500',
      techniques: ['Pashmina Weaving', 'Cashmere Spinning', 'Sozni Embroidery', 'Kani Weaving'],
    },
  ];

  return (
    <section id="craft-chronicles" className="py-24 px-4 relative overflow-hidden bg-obsidian">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-foil/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil">Artisan Heritage</span>
          <h2 className="font-display text-4xl md:text-6xl text-parchment mt-4 mb-6">
            Craft Chronicles
          </h2>
          <p className="text-champagne/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Immerse yourself in the stories behind our crafts. Each chronicle captures the dedication, 
            skill, and heritage of our master artisans.
          </p>
        </motion.div>

        {/* Featured Chronicle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div 
            className="glass-card rounded-sm overflow-hidden cursor-pointer group"
            onClick={() => setSelectedChronicle(chronicles[0].id)}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-square md:aspect-auto relative">
                <img
                  src={chronicles[0].image}
                  alt={chronicles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-foil mb-3">Featured Chronicle</span>
                <h3 className="font-display text-2xl md:text-3xl text-parchment mb-4 group-hover:text-gold-foil transition-colors">
                  {chronicles[0].title}
                </h3>
                <p className="text-champagne/70 text-sm leading-relaxed mb-6">
                  {chronicles[0].description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-foil" />
                    <span className="text-xs text-champagne/60">{chronicles[0].artisans} Artisans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-foil" />
                    <span className="text-xs text-champagne/60">Est. {chronicles[0].established}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-champagne/50">
                  <Award className="w-4 h-4 text-gold-foil" />
                  <span>{chronicles[0].guild}</span>
                </div>
                <div className="mt-4 text-xs text-gold-foil group-hover:underline">Click to learn more →</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chronicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chronicles.slice(1).map((chronicle, idx) => (
            <motion.div
              key={chronicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedChronicle(chronicle.id)}
              className="glass-card rounded-sm overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={chronicle.image}
                  alt={chronicle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-lg text-parchment mb-2 group-hover:text-gold-foil transition-colors">
                    {chronicle.title}
                  </h3>
                  <p className="text-xs text-champagne/80 mb-3 line-clamp-2">
                    {chronicle.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gold-foil/20">
                    <span className="text-xs text-champagne/60">{chronicle.guild}</span>
                    <span className="text-xs text-gold-foil">{chronicle.artisans} Artisans</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chronicle Detail Modal */}
        <AnimatePresence>
          {selectedChronicle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              onClick={() => setSelectedChronicle(null)}
            >
              <div className="absolute inset-0 bg-obsidian/95" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-obsidian border-2 border-gold-foil/30 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const chronicle = chronicles.find(c => c.id === selectedChronicle);
                  if (!chronicle) return null;

                  return (
                    <>
                      <button
                        onClick={() => setSelectedChronicle(null)}
                        className="absolute top-4 right-4 w-10 h-10 bg-obsidian-light rounded-full flex items-center justify-center text-champagne/60 hover:text-gold-foil z-10"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="aspect-square md:aspect-auto relative">
                          <img src={chronicle.image} alt={chronicle.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-foil mb-3">{chronicle.guild}</span>
                          <h2 className="font-display text-2xl md:text-3xl text-parchment mb-4">{chronicle.title}</h2>
                          <p className="text-champagne/70 text-sm leading-relaxed mb-6">{chronicle.fullDescription}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gold-foil" />
                              <span className="text-xs text-champagne/60">{chronicle.artisans} Artisans</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gold-foil" />
                              <span className="text-xs text-champagne/60">Est. {chronicle.established}</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <p className="text-xs uppercase tracking-wider text-gold-foil mb-3">Traditional Techniques</p>
                            <div className="flex flex-wrap gap-2">
                              {chronicle.techniques.map((tech) => (
                                <span key={tech} className="text-[10px] px-3 py-1 border border-gold-foil/20 text-champagne/60 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-champagne/50 pt-4 border-t border-gold-foil/20">
                            <Award className="w-4 h-4 text-gold-foil" />
                            <span>GI-Certified Authentic Craft</span>
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
