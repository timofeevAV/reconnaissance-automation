import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import zustandStorage from '@/features/stores/mmkv';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
};

interface UserActions {
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: User['id']) => Promise<void>;
  deleteUsersByIds: (ids: User['id'][]) => Promise<void>;
}

type UsersStore = UserState & UserActions;

const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchUsers: async () => {
        set(state => ({ ...state, loading: true }));
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users');
          const users = await res.json();
          console.info('fetching users');
          set(state => ({ ...state, error: '', users }));
        } catch (error) {
          set(state => ({
            ...state,
            error: 'Ошибка при получении пользователей',
          }));
        } finally {
          set(state => ({
            ...state,
            loading: false,
          }));
        }
      },

      addUser: async user => {
        set(state => ({
          ...state,
          loading: true,
        }));
        try {
          set(state => ({
            ...state,
            users: [...state.users, user],
            loading: false,
          }));
        } catch (error) {
          console.error('Error adding user:', error);
          set(state => ({
            ...state,
            error: 'Ошибка при добавлении пользователя',
            loading: false,
          }));
        }
      },

      updateUser: async user => {
        set(state => ({
          ...state,
          loading: true,
        }));
        try {
          const updatedUsers = get().users.map(u =>
            u.id === user.id ? user : u,
          );
          set(state => ({
            ...state,
            users: updatedUsers,
            loading: false,
          }));
        } catch (error) {
          console.error('Error updating user:', error);
          set(state => ({
            ...state,
            error: 'Ошибка при обновлении пользователя',
            loading: false,
          }));
        }
      },

      deleteUser: async id => {
        set(state => ({
          ...state,
          loading: true,
        }));
        try {
          const updatedUsers = get().users.filter(user => user.id !== id);
          set(state => ({
            ...state,
            users: updatedUsers,
            loading: false,
          }));
        } catch (error) {
          console.error('Error deleting user:', error);
          set(state => ({
            ...state,
            error: 'Ошибка при удалении пользователя',
            loading: false,
          }));
        }
      },
      deleteUsersByIds: async ids => {
        set(state => ({
          ...state,
          loading: true,
        }));
        try {
          const updatedUsers = get().users.filter(
            user => !ids.includes(user.id),
          );
          set(state => ({
            ...state,
            users: updatedUsers,
            loading: false,
          }));
        } catch (error) {
          console.error('Error deleting users:', error);
          set(state => ({
            ...state,
            error: 'Ошибка при удалении пользователей',
            loading: false,
          }));
        }
      },
    }),
    {
      name: 'users-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useUsersStore;
