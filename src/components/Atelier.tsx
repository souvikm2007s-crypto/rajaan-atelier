import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Sparkles, Ruler, Volume2, ChevronDown } from 'lucide-react';
import { useStore } from '../store/StoreContext';

export function Atelier() {
  const { dispatch } = useStore();
  const [collar, setCollar] = useState('Mandarin');
  const [placket, setPlacket] = useState('Mother-of-Pearl');
  const [hemline, setHemline] = useState('Classic Straight');
  const [rotation, setRotation] = useState(0);
  const [added, setAdded] = useState(false);

  const collars = ['Mandarin', 'Angrakha', 'Classic Bandhgala'];
  const plackets = ['Mother-of-Pearl', 'Antique Gold Enamel', 'Hand-Twisted Thread'];
  const hemlines = ['Classic Straight', 'Asymmetric Cowl', 'Royal Curved Flare'];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-emerald-deep/20 to-obsidian" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">The Bespoke Experience</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            Atelier 3D Customizer
          </h2>
          <p className="text-champagne/50 max-w-lg mx-auto text-sm leading-relaxed">
            Design your sovereign garment. Choose every detail from collar to hemline, 
            and let our AI recommend your perfect royal fit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model View */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] glass-card rounded-sm relative overflow-hidden flex items-center justify-center">
              {/* Rotating Model */}
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-8xl md:text-9xl mb-4">👘</div>
                <div className="space-y-2">
                  <div className="w-32 h-1 bg-gold-foil/20 mx-auto rounded-full" />
                  <div className="w-24 h-1 bg-gold-foil/10 mx-auto rounded-full" />
                </div>
              </motion.div>

              {/* 360 Rotate Control */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={() => setRotation(rotation - 45)}
                  className="w-10 h-10 rounded-full border border-gold-foil/30 flex items-center justify-center text-gold-foil hover:bg-gold-foil/10 transition-all"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-champagne/40 tracking-wider">360° VIEW</span>
                <button
                  onClick={() => setRotation(rotation + 45)}
                  className="w-10 h-10 rounded-full border border-gold-foil/30 flex items-center justify-center text-gold-foil hover:bg-gold-foil/10 transition-all rotate-180"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Corner Labels */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] uppercase tracking-widest text-gold-foil/50">Live Preview</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-[9px] uppercase tracking-widest text-gold-foil/50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Enhanced
                </span>
              </div>
            </div>
          </motion.div>

          {/* Customizer Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Collar Style */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-gold-foil mb-3 block">Collar Style</label>
              <div className="flex flex-wrap gap-2">
                {collars.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCollar(c)}
                    className={`px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-300 ${
                      collar === c
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Placket Detailing */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-gold-foil mb-3 block">Placket Detailing</label>
              <div className="flex flex-wrap gap-2">
                {plackets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlacket(p)}
                    className={`px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-300 ${
                      placket === p
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Hemline Geometry */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-gold-foil mb-3 block">Hemline Geometry</label>
              <div className="flex flex-wrap gap-2">
                {hemlines.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHemline(h)}
                    className={`px-4 py-2 text-xs tracking-wider border rounded-sm transition-all duration-300 ${
                      hemline === h
                        ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                        : 'border-gold-foil/20 text-champagne/60 hover:border-gold-foil/40'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Size Recommender */}
            <div className="glass-card rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-4 h-4 text-gold-foil" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold-foil">AI Smart Size Recommender</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-champagne/50 block mb-1">Height (cm)</label>
                  <input type="number" placeholder="178" className="w-full bg-obsidian border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50" />
                </div>
                <div>
                  <label className="text-[10px] text-champagne/50 block mb-1">Weight (kg)</label>
                  <input type="number" placeholder="75" className="w-full bg-obsidian border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50" />
                </div>
                <div>
                  <label className="text-[10px] text-champagne/50 block mb-1">Chest (inches)</label>
                  <input type="number" placeholder="40" className="w-full bg-obsidian border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50" />
                </div>
                <div>
                  <label className="text-[10px] text-champagne/50 block mb-1">Preferred Drape</label>
                  <select className="w-full bg-obsidian border border-gold-foil/20 rounded-sm px-3 py-2 text-sm text-parchment focus:outline-none focus:border-gold-foil/50">
                    <option>Tailored Slim</option>
                    <option>Royal Relaxed</option>
                  </select>
                </div>
              </div>
              <button className="w-full mt-4 bg-gold-foil/10 border border-gold-foil/30 text-gold-foil py-3 text-xs tracking-wider uppercase hover:bg-gold-foil/20 transition-all">
                Get My Royal Fit
              </button>
            </div>

            {/* Current Selection Summary */}
            <div className="flex items-center gap-4 p-4 border border-gold-foil/10 rounded-sm">
              <div className="flex-1">
                <p className="text-xs text-champagne/50">Your Configuration</p>
                <p className="text-sm text-parchment mt-1">{collar} • {placket} • {hemline}</p>
              </div>
              <button
                onClick={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: {
                      id: 999,
                      name: `Bespoke ${collar} Kurta`,
                      price: 1800,
                      category: 0,
                      tag: 'Bespoke',
                      sizes: [42],
                      color: 'Custom',
                      bgGradient: 'from-gold-foil/10 to-obsidian',
                      image: 'https://images.unsplash.com/photo-1617952739617-3a7c8f6d0e5e?auto=format&fit=crop&w=800&q=80',
                    },
                  });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`px-6 py-3 text-xs tracking-wider uppercase font-heading transition-colors ${
                  added ? 'bg-emerald-600 text-white' : 'bg-gold-foil text-obsidian hover:bg-gold-light'
                }`}
              >
                {added ? '✓ Added' : 'Add to Vault'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Heritage() {
  const [activeGuild, setActiveGuild] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showProcess, setShowProcess] = useState(false);

  const guilds = [
    {
      name: 'The Bengal Zari Guild',
      region: 'Murshidabad, West Bengal',
      description: 'For over 300 years, the Zari weavers of Bengal have spun pure gold and silver threads into fabrics worn by Mughal emperors and British viceroys alike. Each sari border takes 45 days of meticulous hand-weaving.',
      specialty: 'Pure Zari & Gold Thread Weaving',
      artisans: '120+ Master Weavers',
      heritage: 'Est. 1690',
      techniques: ['Zari Weaving', 'Gold Thread Spinning', 'Silver Thread Work', 'Brocade Creation'],
      historicalNote: 'Patronized by the Nawabs of Bengal, this guild supplied textiles to the Mughal court and later to European trading companies.',
      images: [
        'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
        'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
        'https://image.qwenlm.ai/generated-images/9c60e8a2-8dcc-47d8-9343-9ee47c87f8e4/_result.png',
      ],
      icon: '✦',
      process: [
        { step: 1, title: 'Thread Preparation', desc: 'Pure gold/silver threads are carefully drawn and prepared' },
        { step: 2, title: 'Loom Setup', desc: 'Traditional pit looms are prepared with precision' },
        { step: 3, title: 'Weaving', desc: 'Master weavers create intricate patterns over 45 days' },
        { step: 4, title: 'Finishing', desc: 'Final touches and quality inspection by guild masters' },
      ],
    },
    {
      name: 'Kashmir Crewel Needlework',
      region: 'Srinagar, Jammu & Kashmir',
      description: 'In the valleys of Kashmir, artisans practice the ancient art of crewel embroidery — a chain-stitch technique using an aari needle that creates flowing botanical motifs inspired by Mughal garden designs.',
      specialty: 'Aari Chain-Stitch Embroidery',
      artisans: '85+ Artisan Families',
      heritage: 'Est. 1586',
      techniques: ['Aari Needle Work', 'Chain Stitch', 'Botanical Motifs', 'Crewel Embroidery'],
      historicalNote: 'Introduced by Persian artisans during Emperor Akbar\'s reign, this craft flourished under royal patronage in the Kashmir Valley.',
      images: [
        'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
        'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
        'https://image.qwenlm.ai/generated-images/9c60e8a2-8dcc-47d8-9343-9ee47c87f8e4/_result.png',
      ],
      icon: '❋',
      process: [
        { step: 1, title: 'Design Tracing', desc: 'Intricate patterns are traced onto fabric using traditional methods' },
        { step: 2, title: 'Frame Mounting', desc: 'Fabric is stretched on wooden frames for precision work' },
        { step: 3, title: 'Aari Embroidery', desc: 'Artisans use hooked needles to create chain stitches' },
        { step: 4, title: 'Quality Check', desc: 'Each piece is inspected by master craftsmen' },
      ],
    },
    {
      name: 'Awadh Chikankari',
      region: 'Lucknow, Uttar Pradesh',
      description: 'The ethereal white-on-white embroidery of Lucknow traces its origins to the court of the Nawabs of Awadh. Each motif — from the beloved "bakhiya" shadow stitch to the intricate "murri" rice-grain pattern — is a meditation in patience.',
      specialty: 'Shadow Stitch & White Embroidery',
      artisans: '200+ Karigars',
      heritage: 'Est. 1730',
      techniques: ['Bakhiya Shadow Stitch', 'Murri Rice-Grain', 'Phanda French Knot', 'Teepa Direct Stitch'],
      historicalNote: 'Legend attributes the origin to Nur Jahan, wife of Emperor Jahangir, who created this delicate embroidery style for royal garments.',
      images: [
        'https://image.qwenlm.ai/generated-images/9c60e8a2-8dcc-47d8-9343-9ee47c87f8e4/_result.png',
        'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
        'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
      ],
      icon: '✿',
      process: [
        { step: 1, title: 'Block Printing', desc: 'Designs are printed on fabric using wooden blocks' },
        { step: 2, title: 'Embroidery Distribution', desc: 'Work is distributed among specialized karigars' },
        { step: 3, title: 'Hand Embroidery', desc: 'Each stitch is meticulously hand-embroidered' },
        { step: 4, title: 'Washing & Finishing', desc: 'Fabric is washed and finished to reveal the ethereal effect' },
      ],
    },
    {
      name: 'Banarasi Silk Weavers',
      region: 'Varanasi, Uttar Pradesh',
      description: 'The legendary Banarasi silk weavers of Varanasi create some of the finest textiles in the world. Their brocade work, featuring intricate gold and silver zari patterns, has adorned royalty for centuries.',
      specialty: 'Brocade & Silk Weaving',
      artisans: '150+ Master Weavers',
      heritage: 'Est. 1600',
      techniques: ['Jacquard Weaving', 'Brocade Creation', 'Zari Integration', 'Silk Dyeing'],
      historicalNote: 'Banarasi silk has been the preferred choice for Indian royalty and weddings for over 400 years, with each piece taking 15 days to 6 months to complete.',
      images: [
        'https://image.qwenlm.ai/generated-images/bb51b308-0a5f-47f7-927b-912fa3f6fa69/_result.png',
        'https://image.qwenlm.ai/generated-images/22aa732b-fe08-40dd-b5fe-d072432446be/_result.png',
        'https://image.qwenlm.ai/generated-images/7a6b585d-5604-4b64-a286-0b09aa486122/_result.png',
      ],
      icon: '❂',
      process: [
        { step: 1, title: 'Silk Preparation', desc: 'Pure silk threads are carefully prepared and dyed' },
        { step: 2, title: 'Design Mapping', desc: 'Intricate patterns are mapped onto the loom' },
        { step: 3, title: 'Brocade Weaving', desc: 'Gold/silver zari is woven into the silk base' },
        { step: 4, title: 'Quality Inspection', desc: 'Each meter is inspected for perfection' },
      ],
    },
    {
      name: 'Rajputi Block Printers',
      region: 'Jaipur, Rajasthan',
      description: 'The master block printers of Rajasthan create stunning patterns using hand-carved wooden blocks. Each design is a masterpiece of precision, with natural dyes that age beautifully over time.',
      specialty: 'Hand Block Printing',
      artisans: '90+ Master Printers',
      heritage: 'Est. 1750',
      techniques: ['Wood Block Carving', 'Natural Dyeing', 'Multi-Color Printing', 'Resist Dyeing'],
      historicalNote: 'Rajputi block printing dates back to the 12th century, with patterns passed down through generations of artisan families.',
      images: [
        'https://image.qwenlm.ai/generated-images/7a6b585d-5604-4b64-a286-0b09aa486122/_result.png',
        'https://image.qwenlm.ai/generated-images/bb51b308-0a5f-47f7-927b-912fa3f6fa69/_result.png',
        'https://image.qwenlm.ai/generated-images/238c8191-7e5f-47c4-9092-f5e76c2f402d/_result.png',
      ],
      icon: '✺',
      process: [
        { step: 1, title: 'Block Carving', desc: 'Intricate designs are hand-carved into teak wood' },
        { step: 2, title: 'Fabric Preparation', desc: 'Fabric is washed and treated for dye absorption' },
        { step: 3, title: 'Block Printing', desc: 'Each color is applied separately with precision' },
        { step: 4, title: 'Fixing & Finishing', desc: 'Colors are fixed and fabric is finished' },
      ],
    },
    {
      name: 'Pashmina Artisans',
      region: 'Kashmir Valley',
      description: 'The pashmina artisans of Kashmir work with the finest cashmere wool, creating shawls and garments of unparalleled softness. Each piece takes months to complete, with some featuring intricate embroidery.',
      specialty: 'Pashmina & Cashmere',
      artisans: '75+ Master Weavers',
      heritage: 'Est. 1500',
      techniques: ['Pashmina Weaving', 'Cashmere Spinning', 'Sozni Embroidery', 'Kani Weaving'],
      historicalNote: 'Pashmina shawls have been treasured by Mughal emperors and European royalty for centuries, with genuine pashmina coming from the undercoat of Himalayan mountain goats.',
      images: [
        'https://image.qwenlm.ai/generated-images/238c8191-7e5f-47c4-9092-f5e76c2f402d/_result.png',
        'https://image.qwenlm.ai/generated-images/ac5288c3-b19b-46c4-9cd3-33cb8e91fa51/_result.png',
        'https://image.qwenlm.ai/generated-images/7a6b585d-5604-4b64-a286-0b09aa486122/_result.png',
      ],
      icon: '❄',
      process: [
        { step: 1, title: 'Wool Collection', desc: 'Fine pashmina wool is collected from Himalayan goats' },
        { step: 2, title: 'Spinning', desc: 'Wool is hand-spun into fine yarn' },
        { step: 3, title: 'Weaving', desc: 'Yarn is woven on traditional handlooms' },
        { step: 4, title: 'Finishing', desc: 'Fabric is washed, stretched, and finished' },
      ],
    },
  ];

  const timeline = [
    { year: '1500', event: 'Pashmina Artisans begin crafting in Kashmir Valley', guild: 5 },
    { year: '1586', event: 'Kashmir Crewel introduced by Persian artisans', guild: 1 },
    { year: '1600', event: 'Banarasi Silk Weavers establish in Varanasi', guild: 3 },
    { year: '1690', event: 'Bengal Zari Guild established in Murshidabad', guild: 0 },
    { year: '1730', event: 'Awadh Chikankari flourishes under Nawabi patronage', guild: 2 },
    { year: '1750', event: 'Rajputi Block Printers master their craft in Jaipur', guild: 4 },
    { year: '1850', event: 'Textile trade expands during British Raj', guild: -1 },
    { year: '1947', event: 'Independence - guilds preserve traditional crafts', guild: -1 },
    { year: '2024', event: 'Rajaan Atelier partners with master artisans', guild: -1 },
  ];

  return (
    <section id="heritage" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-emerald-royal/10 to-obsidian" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Generations of Mastery</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            Master Craftsmanship Chronicle
          </h2>
          <p className="text-champagne/50 max-w-lg mx-auto text-sm leading-relaxed">
            Journey through the guilds that have preserved India's textile soul for centuries.
          </p>
        </motion.div>

        {/* Interactive Timeline - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-card rounded-sm p-6 md:p-8">
            <h3 className="font-heading text-xl text-gold-foil mb-8 text-center">Historical Timeline</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold-foil/40 via-gold-foil/20 to-gold-foil/40" />
              
              <div className="space-y-6 md:space-y-8">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-4 md:gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`inline-block p-4 glass-card rounded-sm cursor-pointer transition-all ${
                          item.guild >= 0 ? 'hover:border-gold-foil/40' : ''
                        }`}
                        onClick={() => item.guild >= 0 && setActiveGuild(item.guild)}
                      >
                        <p className="text-gold-foil font-heading text-lg md:text-xl">{item.year}</p>
                        <p className="text-xs text-champagne/60 mt-1">{item.event}</p>
                        {item.guild >= 0 && (
                          <p className="text-[10px] text-gold-foil/60 mt-2 uppercase tracking-wider">
                            Click to explore →
                          </p>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-obsidian ${
                          item.guild >= 0 ? 'bg-gold-foil cursor-pointer' : 'bg-champagne/40'
                        }`}
                        onClick={() => item.guild >= 0 && setActiveGuild(item.guild)}
                      />
                    </div>
                    
                    {/* Empty space for alignment */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guild Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {guilds.map((guild, idx) => (
            <motion.button
              key={guild.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveGuild(idx);
                setActiveImageIndex(0);
              }}
              className={`px-4 py-3 text-xs tracking-wider uppercase border rounded-sm transition-all duration-300 ${
                activeGuild === idx
                  ? 'border-gold-foil bg-gold-foil/10 text-gold-foil shadow-lg shadow-gold-foil/20'
                  : 'border-gold-foil/20 text-champagne/50 hover:border-gold-foil/40 hover:text-champagne'
              }`}
            >
              <span className="mr-2">{guild.icon}</span>
              {guild.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Guild Content */}
        <motion.div
          key={activeGuild}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Visual with Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] glass-card rounded-sm relative overflow-hidden group">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={guilds[activeGuild].images[activeImageIndex]}
                alt={guilds[activeGuild].name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              
              {/* Guild Icon Overlay */}
              <div className="absolute top-4 left-4">
                <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center">
                  <span className="text-3xl text-gold-foil">{guilds[activeGuild].icon}</span>
                </div>
              </div>

              {/* Region Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-champagne/80 tracking-wider uppercase">{guilds[activeGuild].region}</p>
              </div>
              
              {/* Audio Toggle */}
              <button
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 glass-card rounded-full hover:border-gold-foil/40 transition-all group"
              >
                <Volume2 className={`w-3.5 h-3.5 ${audioPlaying ? 'text-gold-foil animate-pulse' : 'text-champagne/50'}`} />
                <span className="text-[10px] text-champagne/50 group-hover:text-champagne/70">
                  {audioPlaying ? 'Playing...' : 'Sounds of the Loom'}
                </span>
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {guilds[activeGuild].images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-gold-foil shadow-lg shadow-gold-foil/20'
                      : 'border-gold-foil/20 hover:border-gold-foil/40'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>

            {/* Craft Process Toggle */}
            <button
              onClick={() => setShowProcess(!showProcess)}
              className="w-full glass-card rounded-sm p-4 hover:border-gold-foil/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold-foil" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-parchment font-medium">View Craft Process</p>
                    <p className="text-[10px] text-champagne/40">Discover the 4-step creation journey</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: showProcess ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gold-foil" />
                </motion.div>
              </div>
            </button>

            {/* Craft Process Steps */}
            <AnimatePresence>
              {showProcess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3">
                    {guilds[activeGuild].process.map((step, idx) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card rounded-sm p-4 border-l-2 border-gold-foil/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold-foil/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm text-gold-foil font-heading">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-parchment font-medium">{step.title}</p>
                            <p className="text-xs text-champagne/60 mt-1">{step.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-heading text-2xl md:text-3xl text-parchment mb-4">{guilds[activeGuild].name}</h3>
            <p className="text-champagne/60 text-sm leading-relaxed mb-6">{guilds[activeGuild].description}</p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-sm p-3 text-center"
              >
                <p className="text-gold-foil text-lg font-heading">{guilds[activeGuild].artisans}</p>
                <p className="text-[10px] text-champagne/40 mt-1">Artisans</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-sm p-3 text-center"
              >
                <p className="text-gold-foil text-lg font-heading">{guilds[activeGuild].heritage}</p>
                <p className="text-[10px] text-champagne/40 mt-1">Heritage</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-sm p-3 text-center"
              >
                <p className="text-[10px] text-gold-foil mt-1">{guilds[activeGuild].specialty}</p>
                <p className="text-[10px] text-champagne/40 mt-1">Specialty</p>
              </motion.div>
            </div>

            {/* Techniques */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gold-foil mb-3">Traditional Techniques</p>
              <div className="flex flex-wrap gap-2">
                {guilds[activeGuild].techniques.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="text-[10px] px-3 py-1 border border-gold-foil/20 text-champagne/60 rounded-full hover:border-gold-foil/40 hover:text-gold-foil transition-all cursor-pointer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Historical Note */}
            <div className="glass-card rounded-sm p-4 mb-6 border-l-2 border-gold-foil/30">
              <p className="text-xs text-champagne/60 italic leading-relaxed">
                "{guilds[activeGuild].historicalNote}"
              </p>
            </div>

            {/* Authenticity Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 border border-gold-foil/20 rounded-sm hover:border-gold-foil/40 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-foil" />
              </div>
              <div>
                <p className="text-xs text-gold-foil font-medium">GI-Certified Authentic</p>
                <p className="text-[10px] text-champagne/40">Verified by the Textile Ministry of India</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
