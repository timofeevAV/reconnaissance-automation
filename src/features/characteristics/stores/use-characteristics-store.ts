import { create } from 'zustand';
import axios from 'axios';
import { immer } from 'zustand/middleware/immer';
import { Platform } from 'react-native';
import { CharacteristicsStore, CharacteristicState } from './types';
import { Characteristic } from '../types';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

const initialState: CharacteristicState = {
  characteristics: [],
  isLoading: false,
};

const useCharacteristicsStore = create<CharacteristicsStore>()(
  immer((set, get) => ({
    ...initialState,

    fetchCharacteristics: async accessToken => {
      set(state => {
        state.isLoading = true;
      });

      try {
        const response = await axios.get<Characteristic[]>(
          `${BASE_URL}/characteristics/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );

        set(state => {
          state.characteristics = response.data;
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при получении характеристик');
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    addCharacteristic: async (name, expression, accessToken) => {
      try {
        const response = await axios.post<Characteristic>(
          `${BASE_URL}/characteristics/`,
          { name, expression },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        const newCharacteristic = await response.data;
        set(state => {
          state.characteristics.push(newCharacteristic);
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при добавлении характеристики');
      }
    },
  })),
);

export default useCharacteristicsStore;
