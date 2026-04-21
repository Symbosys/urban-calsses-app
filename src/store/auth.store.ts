import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/api.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  selectedGoal: string | null;
  setAuth: (user: User, token: string) => void;
  setGoal: (goal: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      selectedGoal: null,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setGoal: (selectedGoal) => set({ selectedGoal }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, selectedGoal: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
