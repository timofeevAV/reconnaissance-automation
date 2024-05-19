import { create } from 'zustand';
import axios from 'axios';
import { immer } from 'zustand/middleware/immer';
import { Platform } from 'react-native';
import { SamplesStore, SampleState } from './types';
import { Sample, SampleCharacteristic } from '../types';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

const initialState: SampleState = {
  samples: [],
  sampleCharacteristics: [],
  isLoading: false,
};

const useSamplesStore = create<SamplesStore>()(
  immer((set, get) => ({
    ...initialState,

    fetchSamples: async accessToken => {
      set(state => {
        state.isLoading = true;
      });

      try {
        const response = await axios.get<Sample[]>(`${BASE_URL}/samples/`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        set(state => {
          state.samples = response.data;
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при получении образцов');
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    fetchSampleCharacteristics: async accessToken => {
      set(state => {
        state.isLoading = true;
      });

      try {
        const response = await axios.get<SampleCharacteristic[]>(
          `${BASE_URL}/sample-characteristics/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );

        set(state => {
          state.sampleCharacteristics = response.data;
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при получении характеристик образцов');
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    addSample: async (name, accessToken) => {
      try {
        const response = await axios.post<Sample>(
          `${BASE_URL}/samples/`,
          { name },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        const newSample = await response.data;
        set(state => {
          state.samples.push(newSample);
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при добавлении образца');
      }
    },

    addSampleCharacteristic: async (
      sampleId,
      characteristicId,
      accessToken,
    ) => {
      try {
        const response = await axios.post<SampleCharacteristic>(
          `${BASE_URL}/sample-characteristics/`,
          { sample_id: sampleId, characteristic_id: characteristicId },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        const newSampleCharacteristic = await response.data;
        set(state => {
          state.sampleCharacteristics.push(newSampleCharacteristic);
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при добавлении характеристики образца');
      }
    },

    deleteSampleCharacteristic: async (
      sampleId,
      characteristicId,
      accessToken,
    ) => {
      try {
        await axios.delete(
          `${BASE_URL}/sample-characteristics/delete_by_composite_key/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
            data: { sample_id: sampleId, characteristic_id: characteristicId },
          },
        );
        set(state => {
          state.sampleCharacteristics = state.sampleCharacteristics.filter(
            sc =>
              !(
                sc.sample_id === sampleId &&
                sc.characteristic_id === characteristicId
              ),
          );
        });
      } catch (error) {
        console.error(error);
        throw new Error('Ошибка при удалении характеристики образца');
      }
    },
  })),
);

export default useSamplesStore;
