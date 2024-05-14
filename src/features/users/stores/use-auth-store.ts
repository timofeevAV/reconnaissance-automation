import axios from 'axios';
import secureStorage from '@/features/stores/secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const BASE_URL = Platform.select({
  ios: process.env.EXPO_PUBLIC_BASE_URL,
  android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
});

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/auth/`,
});

interface User {
  email: string | null;
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  role: string | null;
  password?: string;
  re_password?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Omit<User, 'password' | 're_password'> | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  signIn: (userData: Pick<User, 'email' | 'password'>) => Promise<void>;
  signUp: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  refresh: (refreshToken: AuthState['refreshToken']) => Promise<void>;
  verify: (accessToken: AuthState['accessToken']) => Promise<void>;
  activate: ({ uid, token }: { uid: string; token: string }) => Promise<void>;
  bootstrap: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: true,
  error: null,
};

const useAuthStore = create<AuthStore>()(
  immer(
    persist(
      (set, get) => ({
        ...initialState,
        signIn: async userData => {
          try {
            const response = await axiosInstance.post('jwt/create/', userData);
            const { access, refresh } = await response.data;
            set(state => {
              state.accessToken = access;
              state.refreshToken = refresh;
            });
            await get().getUser();
          } catch (err) {
            set(state => {
              state.accessToken = null;
              state.refreshToken = null;
              state.error = 'Неверный логин или пароль';
            });
            throw new Error('Неверный логин или пароль');
          }
        },
        signUp: async userData => {
          try {
            await axiosInstance.post('users/', userData);
          } catch (err) {
            set(state => {
              state.error = 'Ошибка регистрации';
            });
            throw new Error('Ошибка регистрации');
          }
        },
        logout: async () => set({ ...initialState, isLoading: false }),
        getUser: async () => {
          try {
            const response = await axiosInstance.get('users/me/', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${get().accessToken}`,
                Accept: 'application/json',
              },
            });
            set(state => {
              state.user = response.data;
            });
          } catch (err) {
            set(state => {
              state.error = 'Ошибка получения данных пользователя';
            });
            throw new Error('Ошибка получения данных пользователя');
          }
        },
        refresh: async refreshToken => {
          try {
            const response = await axiosInstance.post('jwt/refresh/', {
              refresh: refreshToken,
            });
            const { access } = await response.data;
            set(state => {
              state.accessToken = access;
            });
          } catch (err) {
            set(state => {
              state.error = 'Ошибка обновления токена';
            });
            throw new Error('Ошибка обновления токена');
          }
        },
        verify: async accessToken => {
          try {
            await axiosInstance.post('jwt/verify/', {
              token: accessToken,
            });
          } catch (err) {
            set(state => {
              state.error = 'Ошибка верификации токена';
            });
            throw new Error('Ошибка верификации токена');
          }
        },
        activate: async ({ uid, token }) => {
          try {
            await axiosInstance.post('users/activation/', {
              uid,
              token,
            });
          } catch (err) {
            set(state => {
              state.error = 'Ошибка активации аккаунта';
            });
            throw new Error('Ошибка активации аккаунта');
          }
        },
        bootstrap: async () => {
          set(state => {
            state.isLoading = true;
          });
          try {
            const refreshToken = get().refreshToken;
            const accessToken = get().accessToken;

            if (!refreshToken || !accessToken) {
              await get().logout();
              return;
            }

            await get().refresh(refreshToken);
            await get().verify(accessToken);
            await get().getUser();
          } catch (err) {
            await get().logout();
          } finally {
            set(state => {
              state.isLoading = false;
            });
          }
        },
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => secureStorage),
      },
    ),
  ),
);

export default useAuthStore;
