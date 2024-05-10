import secureStorage from '@/features/stores/secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

interface User {
  username: string;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      ...initialState,
      login: async (username, password) => {
        if (username === 'user' && password === 'password') {
          const user = { username };
          await SecureStore.setItemAsync('user', JSON.stringify(user));
          set({ user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      },

      logout: async () => {
        await SecureStore.deleteItemAsync('user');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);

export default useAuthStore;
