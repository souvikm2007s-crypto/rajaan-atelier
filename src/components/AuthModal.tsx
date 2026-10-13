import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/StoreContext';

export function AuthModal() {
  const { state, dispatch } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!state.showAuth) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (state.authMode === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Enter valid 10-digit phone';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: 'user_' + Date.now(),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '+91 98765 43210',
        addresses: [],
        joinDate: new Date().toISOString(),
      };

      dispatch({ type: 'LOGIN', payload: user });
      setIsLoading(false);
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }, 1200);
  };

  const switchMode = (mode: 'login' | 'signup') => {
    dispatch({ type: 'TOGGLE_AUTH', payload: { mode } });
    setErrors({});
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-obsidian/95"
          onClick={() => dispatch({ type: 'TOGGLE_AUTH' })}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-obsidian border-2 border-gold-foil/30 rounded-sm max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUTH' })}
            className="absolute top-4 right-4 w-8 h-8 bg-obsidian-light rounded-full flex items-center justify-center text-champagne/60 hover:text-gold-foil z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="p-8 pb-4 text-center border-b border-gold-foil/10">
            <h2 className="font-display text-2xl text-gold-foil tracking-wider mb-2">
              {state.authMode === 'login' ? 'Welcome Back' : 'Join The Royal Assembly'}
            </h2>
            <p className="text-xs text-champagne/50">
              {state.authMode === 'login'
                ? 'Sign in to access your royal vault and orders'
                : 'Create your account for exclusive access'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {state.authMode === 'signup' && (
              <>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-foil/50" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-3 pl-10 pr-4 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
                      placeholder="Souvik Mondal"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-ruby mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-foil/50" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-3 pl-10 pr-4 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-ruby mt-1">{errors.phone}</p>}
                </div>
              </>
            )}

            <div>
              <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-foil/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-3 pl-10 pr-4 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
                  placeholder="souvik@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-ruby mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-foil/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-3 pl-10 pr-10 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne/40 hover:text-gold-foil"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-ruby mt-1">{errors.password}</p>}
            </div>

            {state.authMode === 'signup' && (
              <div>
                <label className="text-[10px] uppercase tracking-wider text-champagne/50 mb-1 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-foil/50" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-obsidian-light border border-gold-foil/20 rounded-sm py-3 pl-10 pr-4 text-sm text-parchment placeholder:text-champagne/30 focus:outline-none focus:border-gold-foil/50"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-ruby mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {state.authMode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-gold-foil hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-magnetic bg-gold-foil text-obsidian py-3 font-heading text-sm tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                  <span>{state.authMode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{state.authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gold-foil/10" />
              <span className="text-xs text-champagne/40">OR</span>
              <div className="flex-1 h-px bg-gold-foil/10" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gold-foil/20 rounded-sm py-2.5 text-xs text-champagne/70 hover:border-gold-foil/40 hover:text-gold-foil transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gold-foil/20 rounded-sm py-2.5 text-xs text-champagne/70 hover:border-gold-foil/40 hover:text-gold-foil transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Switch Mode */}
            <p className="text-center text-xs text-champagne/50 mt-6">
              {state.authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => switchMode(state.authMode === 'login' ? 'signup' : 'login')}
                className="text-gold-foil hover:underline font-medium"
              >
                {state.authMode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
