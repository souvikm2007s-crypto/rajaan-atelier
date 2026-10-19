import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { StoreProvider } from './store/StoreContext';
import { Header } from './components/Header';
import { DeliveryBanner } from './components/DeliveryBanner';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { Heritage } from './components/Atelier';
import { OurStory } from './components/OurStory';
import { ArtisanGuilds } from './components/ArtisanGuilds';
import { CraftChronicles } from './components/CraftChronicles';
import { Sustainability } from './components/Sustainability';
import { Lookbook, Reviews } from './components/Lookbook';
import { Concierge, Footer } from './components/Concierge';
import { Favourites } from './components/Favourites';
import { Checkout } from './components/Checkout';
import { AuthModal } from './components/AuthModal';
import { Account } from './components/Account';

import { useStore } from './store/StoreContext';

function AppContent() {
  const { state, dispatch } = useStore();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.section-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-parchment overflow-x-hidden pb-16 md:pb-0">
      {/* Header / Navigation */}
      <Header />

      {/* All India Delivery Banner */}
      <DeliveryBanner />

      {/* Hero Section */}
      <Hero />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Curated Collections */}
      <Collections />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Our Story */}
      <OurStory />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Artisan Guilds */}
      <ArtisanGuilds />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Craft Chronicles */}
      <CraftChronicles />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Heritage & Master Craftsmanship */}
      <Heritage />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Sustainability & Ethics */}
      <Sustainability />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Shoppable Editorial Lookbook */}
      <Lookbook />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* Reviews & Testimonials */}
      <Reviews />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-foil/20 to-transparent" />
      </div>

      {/* VIP Concierge & Gifting */}
      <Concierge />

      {/* Footer */}
      <Footer />

      {/* Favourites Drawer */}
      <Favourites />

      {/* Auth Modal */}
      <AuthModal />

      {/* Account Modal */}
      <Account />

      {/* Checkout Flow */}
      <Checkout />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 md:bottom-8 right-4 z-40 flex flex-col gap-3">
        {/* WhatsApp Concierge */}
        <a
          href="#"
          className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-110 transition-transform"
          title="VIP Concierge WhatsApp"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gold-foil hover:bg-gold-foil/10 transition-all hidden md:flex"
          title="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="mobile-bottom-bar md:hidden">
        <div className="flex items-center justify-around">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-champagne/50 hover:text-gold-foil transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[9px] tracking-wider">Home</span>
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
            className="flex flex-col items-center gap-1 text-champagne/50 hover:text-gold-foil transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[9px] tracking-wider">Search</span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: document.querySelector('section')?.offsetTop || 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-gold-foil"
          >
            <div className="w-10 h-10 bg-gold-foil rounded-full flex items-center justify-center">
              <span className="font-display text-obsidian text-xs">R</span>
            </div>
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_FAVOURITES' })}
            className="flex flex-col items-center gap-1 text-champagne/50 hover:text-gold-foil transition-colors relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-[9px] tracking-wider">Vault</span>
            {state.favourites.length > 0 && (
              <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 bg-ruby text-[8px] text-white rounded-full flex items-center justify-center">{state.favourites.length}</span>
            )}
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="flex flex-col items-center gap-1 text-champagne/50 hover:text-gold-foil transition-colors relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[9px] tracking-wider">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 bg-gold-foil text-[8px] text-obsidian rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
      <Analytics />
    </StoreProvider>
  );
}

export default App;
