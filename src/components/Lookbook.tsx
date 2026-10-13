import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CheckCircle, Filter, ShoppingBag } from 'lucide-react';
import { useStore, formatPrice } from '../store/StoreContext';
import { products } from '../data/products';

export function Lookbook() {
  const { state, dispatch } = useStore();
  const looks = [
    {
      id: 1,
      title: 'The Maharaja\'s Soirée',
      description: 'An ivory zardozi kurta paired with gold-threaded churidar and a silk stole',
      items: ['Imperial Zardozi Kurta', 'Gold Churidar', 'Silk Stole', 'Mojari Shoes'],
      totalPrice: 1800,
      gradient: 'from-amber-900/20 to-emerald-950/30',
      image: 'https://image.qwenlm.ai/generated-images/a5e2dd8e-08d6-4358-9c2e-ecc86c0fb35d/_result.png',
    },
    {
      id: 2,
      title: 'The Diplomat\'s Evening',
      description: 'A midnight bandhgala with subtle silver embroidery and silk pocket square',
      items: ['Midnight Bandhgala', 'Silk Pocket Square', 'Leather Mojari', 'Cufflinks Set'],
      totalPrice: 1800,
      gradient: 'from-indigo-950/20 to-obsidian',
      image: 'https://image.qwenlm.ai/generated-images/3bee8937-8723-482b-9bae-9a1c18d8442d/_result.png',
    },
    {
      id: 3,
      title: 'The Festive Radiance',
      description: 'A chikankari ensemble with pearl buttons and handwoven silk drape',
      items: ['Chikankari Kurta', 'Silk Drape', 'Pearl Buttons Set', 'Embroidered Jutti'],
      totalPrice: 1800,
      gradient: 'from-stone-800/20 to-emerald-950/20',
      image: 'https://image.qwenlm.ai/generated-images/426a07b7-4b52-48a1-92fe-5bbbd323988e/_result.png',
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">Shoppable Editorial</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            The Maharaja's Soirée
          </h2>
          <p className="text-champagne/50 max-w-lg mx-auto text-sm leading-relaxed">
            Curated ensembles for every royal occasion. Shop complete looks with a 10% bespoke ensemble courtesy.
          </p>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: look.id * 0.1 }}
              className="group"
            >
              {/* Look Image */}
              <div className={`relative aspect-[3/4] bg-gradient-to-b ${look.gradient} rounded-sm overflow-hidden border border-gold-foil/5 mb-6`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={look.image} alt={look.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Pulsing Gold Pins */}
                <div className="absolute top-1/4 left-1/3 lookbook-pin">
                  <div className="w-4 h-4 bg-gold-foil rounded-full opacity-80 flex items-center justify-center">
                    <div className="w-2 h-2 bg-obsidian rounded-full" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 lookbook-pin" style={{ animationDelay: '0.5s' }}>
                  <div className="w-4 h-4 bg-gold-foil rounded-full opacity-80 flex items-center justify-center">
                    <div className="w-2 h-2 bg-obsidian rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/2 lookbook-pin" style={{ animationDelay: '1s' }}>
                  <div className="w-4 h-4 bg-gold-foil rounded-full opacity-80 flex items-center justify-center">
                    <div className="w-2 h-2 bg-obsidian rounded-full" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div>
                    <h3 className="font-heading text-lg text-parchment">{look.title}</h3>
                    <p className="text-xs text-champagne/60 mt-2">{look.description}</p>
                    <div className="mt-4 space-y-1">
                      {look.items.map((item) => (
                        <p key={item} className="text-[11px] text-gold-foil/80 flex items-center gap-1">
                          <span className="w-1 h-1 bg-gold-foil rounded-full" /> {item}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gold-foil font-heading">{formatPrice(look.totalPrice, state.currency)}</span>
                      <span className="text-[10px] text-emerald-400">10% ensemble courtesy applied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Look Info */}
              <div className="text-center">
                <h3 className="font-heading text-sm text-parchment tracking-wider">{look.title}</h3>
                <button
                  onClick={() => {
                    // Add first item from each look to cart as a demo
                    look.items.forEach((_, idx) => {
                      if (idx === 0) {
                        dispatch({ type: 'ADD_TO_CART', payload: { id: look.id + 100, name: look.title, price: look.totalPrice, category: 0, tag: 'Ensemble', sizes: [40, 42, 44], color: 'Multi', bgGradient: look.gradient, image: 'https://images.unsplash.com/photo-1617952739617-3a7c8f6d0e5e?auto=format&fit=crop&w=800&q=80' } });
                      }
                    });
                  }}
                  className="mt-3 text-xs text-gold-foil border-b border-gold-foil/30 pb-0.5 hover:border-gold-foil transition-colors flex items-center gap-1 mx-auto"
                >
                  <ShoppingBag className="w-3 h-3" /> Shop the Complete Look
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
  const filters = ['All', 'Groom', 'Groomsmen', 'Diwali Gala', 'Diplomatic Event'];

  const reviews = [
    {
      id: 1,
      name: 'Arjun Mehta',
      location: 'London, UK',
      occasion: 'Groom',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹2,03,350',
      product: 'Sovereign Zardozi Kurta',
      quote: 'The Zardozi work on my wedding kurta was nothing short of breathtaking. Every guest commented on the craftsmanship. The packaging alone felt like receiving a treasure from a bygone era. My wife was in tears when she saw the detail on the neckline.',
      date: '2 weeks ago',
      verified: true,
    },
    {
      id: 2,
      name: 'Vikram Singh',
      location: 'New Delhi, India',
      occasion: 'Diplomatic Event',
      rating: 5,
      height: '6\'0"',
      orderedSize: '44',
      fit: 'Perfect Drape',
      purchased: '₹2,65,600',
      product: 'Maharaja Bandhgala',
      quote: 'Wore the Bandhgala to a state dinner at the British High Commission. The fabric weight was substantial yet comfortable for a 6-hour event. The mother-of-pearl buttons caught the light beautifully. Three ambassadors asked where I got it tailored.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Rohan Kapoor',
      location: 'Dubai, UAE',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'9"',
      orderedSize: '40',
      fit: 'True to Royal Fit',
      purchased: '₹1,56,870',
      product: 'Awadhi Chikankari Ensemble',
      quote: 'The Chikankari detail is museum-quality. I could see every single stitch under magnification. The bespoke sizing was spot-on — no alterations needed. Wore it to a Diwali party at the Burj Al Arab and received endless compliments.',
      date: '3 weeks ago',
      verified: true,
    },
    {
      id: 4,
      name: 'Aditya Sharma',
      location: 'New York, USA',
      occasion: 'Groomsmen',
      rating: 5,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹3,40,300',
      product: 'Heritage Banarasi Wedding Set',
      quote: 'Ordered matching kurtas for 6 groomsmen. The consistency across all pieces was remarkable. The oud-scented packaging made each groomsmen feel individually honored. The wedding was in the Hamptons and we looked like royalty.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 5,
      name: 'Karan Patel',
      location: 'Mumbai, India',
      occasion: 'Groom',
      rating: 4,
      height: '5\'8"',
      orderedSize: '40',
      fit: 'Slightly Relaxed',
      purchased: '₹4,56,500',
      product: "The Nawab's Sherwani Coat",
      quote: 'Exceptional quality silk. The gold thread work is authentic and heavy — you can feel the heritage in every gram. Took one extra week for bespoke adjustments but worth every day. The fit was slightly relaxed but my tailor said it was easy to take in.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 6,
      name: 'Nikhil Reddy',
      location: 'Singapore',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'11"',
      orderedSize: '44',
      fit: 'True to Royal Fit',
      purchased: '₹1,12,050',
      product: 'Midnight Silk Soirée Kurta',
      quote: 'The virtual bespoke session was incredible. They understood my vision perfectly. The final garment exceeded even my elevated expectations. A true atelier experience. The silk has this beautiful sheen that photographs like nothing else.',
      date: '5 weeks ago',
      verified: true,
    },
    {
      id: 7,
      name: 'Siddharth Joshi',
      location: 'Bangalore, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'7"',
      orderedSize: '38',
      fit: 'Perfect Drape',
      purchased: '₹2,28,250',
      product: 'Lucknowi Zari Masterpiece',
      quote: 'I\'m shorter than average and was worried about the proportions. The team adjusted the kurta length and sleeve details perfectly. My mother cried seeing me in it. The zari work is so fine it looks like it was painted on.',
      date: '3 weeks ago',
      verified: true,
    },
    {
      id: 8,
      name: 'Rahul Desai',
      location: 'Pune, India',
      occasion: 'Groomsmen',
      rating: 5,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹81,340',
      product: 'Raw Silk Minimalist Kurta',
      quote: 'Bought this for my best friend\'s wedding reception. The raw silk has this beautiful texture that feels luxurious against the skin. Perfect for Indian weather — breathable yet structured. Got compliments all evening.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 9,
      name: 'Aarav Malhotra',
      location: 'Toronto, Canada',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '6\'1"',
      orderedSize: '46',
      fit: 'True to Royal Fit',
      purchased: '₹1,89,000',
      product: 'Kashmiri Pashmina Shawl',
      quote: 'The pashmina is impossibly soft. I wore it draped over my shoulders at a Diwali gala in Toronto and it kept me warm through the Canadian autumn evening. The embroidery is so delicate it looks like frost patterns.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 10,
      name: 'Ishaan Khanna',
      location: 'Chennai, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'9"',
      orderedSize: '40',
      fit: 'Perfect Drape',
      purchased: '₹5,25,000',
      product: 'The Darbar Sherwani',
      quote: 'This sherwani is a work of art. The midnight sapphire color is deep and rich, and the gold embroidery catches candlelight in the most magical way. Wore it for my sangeet and reception. Worth every rupee.',
      date: '6 weeks ago',
      verified: true,
    },
    {
      id: 11,
      name: 'Devang Shah',
      location: 'Ahmedabad, India',
      occasion: 'Groomsmen',
      rating: 4,
      height: '5\'11"',
      orderedSize: '44',
      fit: 'True to Royal Fit',
      purchased: '₹24,900',
      product: 'Imperial Mojari Collection',
      quote: 'The mojaris are handcrafted and you can tell. The leather is supple and the embroidery is intricate. Took about two weeks to break in but now they\'re the most comfortable shoes I own. Perfect complement to my wedding attire.',
      date: '3 months ago',
      verified: true,
    },
    {
      id: 12,
      name: 'Pranav Iyer',
      location: 'San Francisco, USA',
      occasion: 'Diplomatic Event',
      rating: 5,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹2,65,600',
      product: 'Maharaja Bandhgala',
      quote: 'Wore this to an Indian consulate reception in San Francisco. The bandhgala has this regal silhouette that commands respect. The emerald color is rich and the fit is impeccable. Felt like I was wearing a piece of history.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 13,
      name: 'Kabir Singhania',
      location: 'Kolkata, India',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'8"',
      orderedSize: '40',
      fit: 'Perfect Drape',
      purchased: '₹1,56,870',
      product: 'Awadhi Chikankari Ensemble',
      quote: 'The chikankari work is so fine it\'s almost invisible until you look closely. That\'s the mark of true craftsmanship. Wore it to a family Diwali puja and my grandmother said it reminded her of the kurtas from her youth in Lucknow.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 14,
      name: 'Yash Bhatia',
      location: 'Jaipur, India',
      occasion: 'Groom',
      rating: 5,
      height: '6\'2"',
      orderedSize: '46',
      fit: 'True to Royal Fit',
      purchased: '₹3,40,300',
      product: 'Heritage Banarasi Wedding Set',
      quote: 'I\'m tall and broad-shouldered, so finding well-proportioned ethnic wear is always a challenge. Rajaan nailed it. The banarasi silk has this beautiful weight and the gold zari work is authentic, not cheap imitation. My wedding photos look like they\'re from a period film.',
      date: '5 weeks ago',
      verified: true,
    },
    {
      id: 15,
      name: 'Harsh Vardhan',
      location: 'Hyderabad, India',
      occasion: 'Diplomatic Event',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'Perfect Drape',
      purchased: '₹2,03,350',
      product: 'Sovereign Zardozi Kurta',
      quote: 'Wore this to a business dinner with potential investors from the Middle East. The zardozi work impressed them more than my pitch deck. The ivory gold color is sophisticated and the fit is regal without being costume-y.',
      date: '3 weeks ago',
      verified: true,
    },
    {
      id: 16,
      name: 'Manish Agarwal',
      location: 'Surat, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'9"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹4,56,500',
      product: "The Nawab's Sherwani Coat",
      quote: 'As a diamond merchant, I know quality when I see it. The obsidian black silk is flawless, the stitching is precise, and the overall construction is museum-grade. This sherwani is an heirloom piece. My son will wear it someday.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 17,
      name: 'Armaan Gill',
      location: 'Melbourne, Australia',
      occasion: 'Diwali Gala',
      rating: 4,
      height: '5\'10"',
      orderedSize: '40',
      fit: 'Slightly Relaxed',
      purchased: '₹1,12,050',
      product: 'Midnight Silk Soirée Kurta',
      quote: 'The silk quality is exceptional and the midnight indigo color is stunning. Shipping to Australia took 12 days which was faster than expected. The fit was slightly relaxed but that\'s actually comfortable for our warmer climate.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 18,
      name: 'Vihaan Rao',
      location: 'Goa, India',
      occasion: 'Groomsmen',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'Perfect Drape',
      purchased: '₹31,540',
      product: 'Royal Silk Stole',
      quote: 'Bought the emerald silk stole to complement my friend\'s wedding sherwani. The silk has this beautiful drape and the color is rich. It added the perfect finishing touch. The packaging was so beautiful I kept the box.',
      date: '6 weeks ago',
      verified: true,
    },
    {
      id: 19,
      name: 'Tanmay Deshmukh',
      location: 'Nagpur, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'8"',
      orderedSize: '40',
      fit: 'True to Royal Fit',
      purchased: '₹2,28,250',
      product: 'Lucknowi Zari Masterpiece',
      quote: 'The champagne silk color is perfect for daytime weddings. The zari work is subtle but catches the light beautifully in photographs. My photographer said it was the best-dressed groom he\'d ever shot. That says it all.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 20,
      name: 'Kunal Mehra',
      location: 'Zurich, Switzerland',
      occasion: 'Diplomatic Event',
      rating: 5,
      height: '6\'0"',
      orderedSize: '44',
      fit: 'Perfect Drape',
      purchased: '₹5,25,000',
      product: 'The Darbar Sherwani',
      quote: 'Wore this to an Indian Embassy gala in Zurich. The midnight sapphire color is so deep it almost looks black in low light, but the gold embroidery creates this magical contrast. Felt like royalty. The Swiss guests were mesmerized.',
      date: '3 weeks ago',
      verified: true,
    },
    {
      id: 21,
      name: 'Ritvik Saxena',
      location: 'Lucknow, India',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹1,56,870',
      product: 'Awadhi Chikankari Ensemble',
      quote: 'Being from Lucknow, I know authentic chikankari. This is the real deal — the bakhiya stitch is perfect, the murri work is precise. It reminded me of the pieces my grandmother used to commission from the old city karigars. Truly authentic.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 22,
      name: 'Aryan Bhatt',
      location: 'Dehradun, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'Perfect Drape',
      purchased: '₹2,03,350',
      product: 'Sovereign Zardozi Kurta',
      quote: 'Got married in Rishikesh and wore this kurta for the reception. The ivory gold color looked stunning against the Himalayan backdrop. The zardozi work is so intricate my mother-in-law said it must have taken months to complete.',
      date: '5 weeks ago',
      verified: true,
    },
    {
      id: 23,
      name: 'Dhruv Malhotra',
      location: 'Amritsar, India',
      occasion: 'Groomsmen',
      rating: 5,
      height: '5\'9"',
      orderedSize: '40',
      fit: 'True to Royal Fit',
      purchased: '₹81,340',
      product: 'Raw Silk Minimalist Kurta',
      quote: 'Bought this for my cousin\'s wedding at the Golden Temple. The raw silk is perfect for Punjab weather — breathable but structured. The sand dune color complemented the marble architecture beautifully. Simple yet regal.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 24,
      name: 'Neil Fernandes',
      location: 'Mumbai, India',
      occasion: 'Diplomatic Event',
      rating: 4,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹2,65,600',
      product: 'Maharaja Bandhgala',
      quote: 'Wore this to a film premiere in Mumbai. The bandhgala has this classic silhouette that works for both traditional and contemporary events. The royal emerald color photographs beautifully. Only giving 4 stars because delivery took 3 weeks.',
      date: '3 months ago',
      verified: true,
    },
    {
      id: 25,
      name: 'Shaurya Chauhan',
      location: 'Udaipur, India',
      occasion: 'Groom',
      rating: 5,
      height: '6\'1"',
      orderedSize: '44',
      fit: 'Perfect Drape',
      purchased: '₹3,40,300',
      product: 'Heritage Banarasi Wedding Set',
      quote: 'Had my destination wedding at a palace in Udaipur and this banarasi set was perfect. The crimson gold color matched the palace interiors. The silk has this rich texture that feels like wearing liquid gold. My bride was speechless.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 26,
      name: 'Reyansh Gupta',
      location: 'Kochi, India',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'8"',
      orderedSize: '40',
      fit: 'True to Royal Fit',
      purchased: '₹1,12,050',
      product: 'Midnight Silk Soirée Kurta',
      quote: 'The midnight indigo silk is perfect for Kerala\'s humid climate — lightweight but luxurious. Wore it to a Diwali celebration at a heritage hotel in Fort Kochi. The silk draped beautifully and the color looked stunning in the candlelight.',
      date: '6 weeks ago',
      verified: true,
    },
    {
      id: 27,
      name: 'Advait Kulkarni',
      location: 'Paris, France',
      occasion: 'Diplomatic Event',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'Perfect Drape',
      purchased: '₹4,56,500',
      product: "The Nawab's Sherwani Coat",
      quote: 'Wore this to an Indian cultural evening at the UNESCO headquarters in Paris. The obsidian black sherwani with its subtle gold work was the perfect blend of tradition and sophistication. The French attendees were genuinely impressed by the craftsmanship.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 28,
      name: 'Vivaan Nair',
      location: 'Thiruvananthapuram, India',
      occasion: 'Groom',
      rating: 5,
      height: '5\'9"',
      orderedSize: '40',
      fit: 'True to Royal Fit',
      purchased: '₹2,28,250',
      product: 'Lucknowi Zari Masterpiece',
      quote: 'The champagne silk kurta was perfect for my beach wedding in Kovalam. The zari work is so fine it doesn\'t feel heavy in the humidity. My wife said I looked like a prince from a royal painting. Best compliment I could ask for.',
      date: '3 weeks ago',
      verified: true,
    },
    {
      id: 29,
      name: 'Kabir Ansari',
      location: 'Varanasi, India',
      occasion: 'Diwali Gala',
      rating: 5,
      height: '5\'10"',
      orderedSize: '42',
      fit: 'Perfect Drape',
      purchased: '₹1,89,000',
      product: 'Kashmiri Pashmina Shawl',
      quote: 'Being from Varanasi, I know textiles. This pashmina is the real deal — the weave is so fine it\'s almost translucent. The ivory color is pure and the embroidery is delicate. Wore it draped over my shoulders during Diwali prayers. Absolutely divine.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 30,
      name: 'Arjun Reddy',
      location: 'Birmingham, UK',
      occasion: 'Groom',
      rating: 5,
      height: '5\'11"',
      orderedSize: '42',
      fit: 'True to Royal Fit',
      purchased: '₹5,25,000',
      product: 'The Darbar Sherwani',
      quote: 'Had my wedding in Birmingham and wanted something that would stand out. This midnight sapphire sherwani did exactly that. The gold embroidery is so detailed it looks like it was embroidered by machines, but it\'s all handwork. Absolutely worth the investment.',
      date: '5 weeks ago',
      verified: true,
    },
  ];

  const filteredReviews = (filter === 'All' ? reviews : reviews.filter((r) => r.occasion === filter))
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : 0);

  return (
    <section className="py-24 px-4 relative noise-texture">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-foil/60">The Royal Guild</span>
          <h2 className="font-display text-3xl md:text-5xl text-parchment mt-4 mb-4">
            Verified Testimonials
          </h2>
          
          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="text-center">
              <p className="font-display text-4xl text-gold-foil">4.94</p>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 royal-star fill-gold-foil" />
                ))}
              </div>
              <p className="text-xs text-champagne/50 mt-1">Based on 312 verified royal clients</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {['GQ India', 'Vogue Bridal', 'Forbes Luxury', 'Harper\'s Bazaar'].map((press) => (
              <span key={press} className="text-xs text-champagne/40 border border-champagne/10 px-3 py-1 rounded-sm">
                As featured in {press}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-champagne/40" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === f
                  ? 'border-gold-foil bg-gold-foil/10 text-gold-foil'
                  : 'border-gold-foil/15 text-champagne/50 hover:border-gold-foil/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="text-[10px] uppercase tracking-wider text-champagne/40">Sort by:</span>
          <button
            onClick={() => setSortBy('recent')}
            className={`text-xs px-3 py-1 transition-colors ${sortBy === 'recent' ? 'text-gold-foil' : 'text-champagne/50 hover:text-champagne'}`}
          >
            Most Recent
          </button>
          <span className="text-champagne/20">|</span>
          <button
            onClick={() => setSortBy('rating')}
            className={`text-xs px-3 py-1 transition-colors ${sortBy === 'rating' ? 'text-gold-foil' : 'text-champagne/50 hover:text-champagne'}`}
          >
            Highest Rated
          </button>
          <span className="text-champagne/20">|</span>
          <span className="text-xs text-champagne/40">
            Showing {filteredReviews.length} of {reviews.length}
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-sm p-6 hover:border-gold-foil/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm text-parchment font-medium">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-champagne/30" />
                    <span className="text-[10px] text-champagne/40">{review.location}</span>
                  </div>
                </div>
                <span className="text-[10px] text-champagne/30">{review.date}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'royal-star fill-gold-foil' : 'text-champagne/20'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-champagne/70 leading-relaxed mb-4">"{review.quote}"</p>

              {/* Specs */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gold-foil/5">
                <span className="text-[10px] text-champagne/40 bg-obsidian-light px-2 py-1 rounded-sm">
                  Height: {review.height}
                </span>
                <span className="text-[10px] text-champagne/40 bg-obsidian-light px-2 py-1 rounded-sm">
                  Size: {review.orderedSize}
                </span>
                <span className="text-[10px] text-gold-foil/70 bg-gold-foil/5 px-2 py-1 rounded-sm">
                  {review.fit}
                </span>
                <span className="text-[10px] text-champagne/40 bg-obsidian-light px-2 py-1 rounded-sm">
                  {review.occasion}
                </span>
              </div>

              {/* Purchase Info */}
              <div className="mt-3 pt-3 border-t border-gold-foil/5 flex items-center justify-between">
                <span className="text-[10px] text-champagne/30">Purchased: {review.product}</span>
                <span className="text-[10px] text-gold-foil/50">{review.purchased}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
