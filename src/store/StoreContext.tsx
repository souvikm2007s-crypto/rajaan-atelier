import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: number;
  tag: string;
  sizes: number[];
  color: string;
  bgGradient: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface FavouriteItem extends Product {}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  joinDate: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  giftBoxCost: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  orderDate: string;
  estimatedDelivery: string;
  trackingId?: string;
}

interface StoreState {
  user: User | null;
  cart: CartItem[];
  favourites: FavouriteItem[];
  orders: Order[];
  currency: string;
  showCart: boolean;
  showFavourites: boolean;
  showCheckout: boolean;
  showSearch: boolean;
  showAuth: boolean;
  showAccount: boolean;
  authMode: 'login' | 'signup';
  mobileMenu: boolean;
  giftBox: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product & { selectedSize?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'ADD_TO_FAVOURITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVOURITES'; payload: number }
  | { type: 'TOGGLE_FAVOURITE'; payload: Product }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'TOGGLE_FAVOURITES' }
  | { type: 'TOGGLE_CHECKOUT'; payload?: boolean }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'TOGGLE_AUTH'; payload?: { mode?: 'login' | 'signup' } }
  | { type: 'TOGGLE_ACCOUNT' }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'TOGGLE_GIFT_BOX' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'REMOVE_ADDRESS'; payload: string }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'LOAD_STATE'; payload: Partial<StoreState> };

const initialState: StoreState = {
  user: null,
  cart: [],
  favourites: [],
  orders: [],
  currency: 'INR',
  showCart: false,
  showFavourites: false,
  showCheckout: false,
  showSearch: false,
  showAuth: false,
  showAccount: false,
  authMode: 'login',
  mobileMenu: false,
  giftBox: false,
};

function storeReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { selectedSize, ...productData } = action.payload;
      const finalSize = selectedSize || productData.sizes[2] || productData.sizes[0];
      const existing = state.cart.find((item) => item.id === productData.id && item.selectedSize === finalSize);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === productData.id && item.selectedSize === finalSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...productData, quantity: 1, selectedSize: finalSize }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'ADD_TO_FAVOURITES':
      if (state.favourites.find((f) => f.id === action.payload.id)) return state;
      return { ...state, favourites: [...state.favourites, action.payload] };
    case 'REMOVE_FROM_FAVOURITES':
      return { ...state, favourites: state.favourites.filter((f) => f.id !== action.payload) };
    case 'TOGGLE_FAVOURITE': {
      const exists = state.favourites.find((f) => f.id === action.payload.id);
      if (exists) {
        return { ...state, favourites: state.favourites.filter((f) => f.id !== action.payload.id) };
      }
      return { ...state, favourites: [...state.favourites, action.payload] };
    }
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'TOGGLE_CART':
      return { ...state, showCart: !state.showCart, showFavourites: false, showAuth: false, showAccount: false };
    case 'TOGGLE_FAVOURITES':
      return { ...state, showFavourites: !state.showFavourites, showCart: false, showAuth: false, showAccount: false };
    case 'TOGGLE_CHECKOUT':
      return { ...state, showCheckout: action.payload ?? !state.showCheckout, showCart: false };
    case 'TOGGLE_SEARCH':
      return { ...state, showSearch: !state.showSearch };
    case 'TOGGLE_AUTH':
      return {
        ...state,
        showAuth: !state.showAuth,
        authMode: action.payload?.mode || state.authMode,
        showCart: false,
        showFavourites: false,
        showAccount: false,
      };
    case 'TOGGLE_ACCOUNT':
      return {
        ...state,
        showAccount: !state.showAccount,
        showCart: false,
        showFavourites: false,
        showAuth: false,
      };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenu: !state.mobileMenu };
    case 'TOGGLE_GIFT_BOX':
      return { ...state, giftBox: !state.giftBox };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'LOGIN':
      return { ...state, user: action.payload, showAuth: false };
    case 'LOGOUT':
      return { ...state, user: null, showAccount: false, orders: [] };
    case 'UPDATE_USER':
      return state.user ? { ...state, user: { ...state.user, ...action.payload } } : state;
    case 'ADD_ADDRESS':
      return state.user
        ? { ...state, user: { ...state.user, addresses: [...state.user.addresses, action.payload] } }
        : state;
    case 'REMOVE_ADDRESS':
      return state.user
        ? { ...state, user: { ...state.user, addresses: state.user.addresses.filter((a) => a.id !== action.payload) } }
        : state;
    case 'PLACE_ORDER':
      return { ...state, orders: [action.payload, ...state.orders], cart: [], showCheckout: false };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rajaan_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: 'LOAD_STATE',
          payload: {
            user: parsed.user || null,
            cart: parsed.cart || [],
            favourites: parsed.favourites || [],
            orders: parsed.orders || [],
            currency: parsed.currency || 'INR',
          },
        });
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    try {
      const toSave = {
        user: state.user,
        cart: state.cart,
        favourites: state.favourites,
        orders: state.orders,
        currency: state.currency,
      };
      localStorage.setItem('rajaan_state', JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [state.user, state.cart, state.favourites, state.orders, state.currency]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}

// Currency formatting
export function formatPrice(amount: number, currency: string): string {
  switch (currency) {
    case 'INR':
      return `₹${amount.toLocaleString('en-IN')}`;
    case 'USD':
      return `$${(amount / 83).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case 'GBP':
      return `£${(amount / 105).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case 'AED':
      return `AED ${(amount / 83 * 3.67).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case 'EUR':
      return `€${(amount / 83 * 0.92).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    default:
      return `₹${amount.toLocaleString('en-IN')}`;
  }
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function generateOrderId(): string {
  return 'RJN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function generateTrackingId(): string {
  return 'TRK' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
}
