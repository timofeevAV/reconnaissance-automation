import axios from 'axios';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + 'api';

interface User {
  id: number;
  email: string | null;
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  role: string | null;
}

interface UsersState {
  users: Omit<User, 'password' | 're_password'>[];
}

interface UsersActions {
  fetchEditors: (tripId: number, accessToken?: string) => Promise<void>;
  removeEditor: (
    tripId: number,
    userId: number,
    accessToken?: string,
  ) => Promise<void>;
  addEditor: (
    tripId: number,
    userId: number,
    accessToken?: string,
  ) => Promise<void>;
}

type UsersStore = UsersState & UsersActions;

const initialState: UsersState = {
  users: [],
};

const useUsersStore = create<UsersStore>()(
  immer((set, get) => ({
    ...initialState,
    fetchEditors: async (tripId, accessToken) => {
      try {
        const response = await axios.get<User[]>(
          `${BASE_URL}users/${tripId}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        set(draft => {
          draft.users = response.data;
        });
      } catch (error) {
        console.error(error);
        set(draft => {
          draft.users = [];
        });
        throw new Error('Ошибка при получении пользователей');
      }
    },

    addEditor: async (tripId, userId, accessToken) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/trip-editor/${tripId}/add_editor/`,
          {
            editor_id: userId,
          },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        console.log(response.data);
        set(draft => {
          draft.users.push(response.data);
        });
      } catch {
        console.error('Ошибка при добавлении участника');
        throw new Error('Ошибка при добавлении участника');
      }
    },

    removeEditor: async (tripId, userId, accessToken) => {
      try {
        await axios.post(
          `${BASE_URL}/trip-editor/${tripId}/remove_editor/`,
          {
            editor_id: userId,
          },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        set(draft => {
          draft.users = draft.users.filter(u => u.id !== userId);
        });
      } catch {
        console.error('Ошибка при удалении участника');
        throw new Error('Ошибка при удалении участника');
      }
    },
  })),
);

export default useUsersStore;
