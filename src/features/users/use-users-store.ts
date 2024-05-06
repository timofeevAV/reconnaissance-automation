import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@features/mmkv";

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
  error: "",
};

interface UserActions {
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: User["id"]) => Promise<void>;
}

type UsersStore = UserState & UserActions;

export const useUsersStore = create<UsersStore>()(
  persist(
    (set) => ({
      ...initialState,

      fetchUsers: async () => {
        set((state) => ({ ...state, loading: true }));
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          const users = await res.json();
          console.info("fetching users");
          set((state) => ({ ...state, error: "", users }));
        } catch (error) {
          set((state) => ({
            ...state,
            error: "Ошибка при получении пользователей",
          }));
        } finally {
          set((state) => ({
            ...state,
            loading: false,
          }));
        }
      },

      addUser: async (user) => {},

      updateUser: async (user) => {},

      deleteUser: async (id) => {},
    }),
    {
      name: "users-store",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
