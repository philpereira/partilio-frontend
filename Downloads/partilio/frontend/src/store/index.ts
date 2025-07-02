import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, Payer, Category, CreditCard } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

interface AppState {
  // Auth State
  auth: AuthState | null;
  setAuth: (auth: AuthState | null) => void;
  
  // Entities Cache
  entities: {
    payers: Payer[];
    categories: Category[];
    creditCards: CreditCard[];
  };
  
  // Entity Actions
  setPayers: (payers: Payer[]) => void;
  setCategories: (categories: Category[]) => void;
  setCreditCards: (cards: CreditCard[]) => void;
  
  // UI State
  ui: {
    sidebarCollapsed: boolean;
    theme: 'light' | 'dark';
    activeModal: string | null;
  };
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setActiveModal: (modal: string | null) => void;
  
  // Actions
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      auth: null,
      entities: {
        payers: [],
        categories: [],
        creditCards: [],
      },
      ui: {
        sidebarCollapsed: false,
        theme: 'light',
        activeModal: null,
      },
      
      // Auth actions
      setAuth: (auth) => set({ auth }, false, 'setAuth'),
      
      // Entity actions
      setPayers: (payers) => 
        set(state => ({ 
          entities: { ...state.entities, payers } 
        }), false, 'setPayers'),
        
      setCategories: (categories) =>
        set(state => ({
          entities: { ...state.entities, categories }
        }), false, 'setCategories'),
        
      setCreditCards: (creditCards) =>
        set(state => ({
          entities: { ...state.entities, creditCards }
        }), false, 'setCreditCards'),
      
      // UI actions
      setSidebarCollapsed: (sidebarCollapsed) =>
        set(state => ({
          ui: { ...state.ui, sidebarCollapsed }
        }), false, 'setSidebarCollapsed'),
        
      setTheme: (theme) =>
        set(state => ({
          ui: { ...state.ui, theme }
        }), false, 'setTheme'),
        
      setActiveModal: (activeModal) =>
        set(state => ({
          ui: { ...state.ui, activeModal }
        }), false, 'setActiveModal'),
      
      // Reset all state
      reset: () => set({
        auth: null,
        entities: {
          payers: [],
          categories: [],
          creditCards: [],
        },
        ui: {
          sidebarCollapsed: false,
          theme: 'light',
          activeModal: null,
        },
      }, false, 'reset'),
    }),
    {
      name: 'partilio-store',
    }
  )
);
