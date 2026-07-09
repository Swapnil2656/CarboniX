/**
 * Auth Store — Zustand
 *
 * Manages user session state, JWT tokens, and auth flow.
 */

import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string | null;
  type: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user, token) => {
    try {
      await SecureStore.setItemAsync('auth_token', token);
    } catch (e) {
      console.warn('SecureStore failed to save token:', e);
    }
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  clearAuth: async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
    } catch (e) {
      console.warn('SecureStore failed to delete token:', e);
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  loadToken: async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        set({ token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
