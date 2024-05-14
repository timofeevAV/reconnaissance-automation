import { create } from 'zustand';
import { TripState, TripsStore } from './types';
import { Platform } from 'react-native';
import axios from 'axios';
import { immer } from 'zustand/middleware/immer';
import { SortOption } from './types';
import { sortOptionToSearchParam } from '@/features/utils';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

const initialState: TripState = {
  count: 0,
  next: null,
  previous: null,
  trips: [],
  isLoading: false,
  searchPhrase: '',
  sort: {
    field: 'updatedAt',
    direction: 1,
  },
};

const useTripsStore = create<TripsStore>()(
  immer((set, get) => ({
    ...initialState,

    changeSearchPhrase: (searchPhrase: string) => {
      set(state => {
        state.searchPhrase = searchPhrase;
      });
    },

    changeSort: (sortOption: SortOption) => {
      set(state => {
        state.sort = sortOption;
      });
    },

    // fetchTrips: async (accessToken, fetchNext) => {
    //   set(state => {
    //     state.isLoading = true;
    //   });
    //   try {
    //     if (fetchNext && !get().next) {
    //       return;
    //     }

    //     const url =
    //       fetchNext && Boolean(get().next)
    //         ? `${get().next}`
    //         : `${BASE_URL}/trips/?search=${get().searchPhrase}&ordering=${sortOptionToSearchParam(get().sort)}`;

    //     const response = await axios.get(url, {
    //       headers: {
    //         Authorization: `JWT ${accessToken}`,
    //       },
    //     });
    //     const { count, next, previous, results } = await response.data;
    //     set(state => {
    //       state.count = count;
    //       state.next = next;
    //       state.previous = previous;
    //       state.trips =
    //         fetchNext && Boolean(get().next)
    //           ? [...state.trips, ...results]
    //           : results;
    //     });
    //   } catch (error) {
    //     throw new Error('Ошибка при получении пользователей');
    //   } finally {
    //     set(state => {
    //       state.isLoading = false;
    //     });
    //   }
    // },

    fetchTrips: async (accessToken, fetchNext) => {
      set(state => {
        state.isLoading = true;
      });

      try {
        const nextUrl = get().next;

        if (fetchNext && !nextUrl) return;

        const canGetNext = fetchNext && Boolean(nextUrl);

        const url = canGetNext
          ? (nextUrl as string)
          : `${BASE_URL}/trips/?search=${get().searchPhrase}&ordering=${sortOptionToSearchParam(get().sort)}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        const { count, next, previous, results } = response.data;

        set(state => {
          state.count = count;
          state.next = next;
          state.previous = previous;
          state.trips = canGetNext ? [...state.trips, ...results] : results;
        });
      } catch (error) {
        throw new Error('Ошибка при получении пользователей');
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    fetchTrip: async (tripId, accessToken) => {
      try {
        const response = await axios.get(`${BASE_URL}/trip/${tripId}/`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });
        return await response.data;
      } catch (error) {
        throw new Error('Ошибка при получении выезда');
      }
    },

    addTrip: async (name, accessToken) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/trips/`,
          { name },
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          },
        );
        const newTrip = await response.data;
        set(state => {
          state.trips.push(newTrip);
        });
      } catch (error) {
        throw new Error('Ошибка при добавлении пользователя');
      }
    },

    updateTrip: async (tripId, updatedFields, accessToken) => {
      try {
        const response = await axios.patch(
          `${BASE_URL}/trip/${tripId}/`,
          { ...updatedFields },
          {
            headers: { Authorization: `JWT ${accessToken}` },
          },
        );
        const updatedTrip = await response.data;

        const id = get().trips.findIndex(trip => trip.id === tripId);

        set(state => {
          state.trips[id] = {
            ...state.trips[id],
            ...updatedFields,
            updatedAt: updatedTrip.updatedAt,
          };
        });
      } catch (error) {
        throw new Error('Ошибка при обновлении пользователя');
      }
    },

    deleteTrips: async (ids, accessToken) => {
      try {
        await axios.delete(`${BASE_URL}/trips/delete/`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
          data: { trip_ids: ids },
        });
        const updatedTrips = get().trips.filter(trip => !ids.includes(trip.id));
        set(state => ({
          ...state,
          trips: updatedTrips,
        }));
      } catch (error) {
        throw new Error('Ошибка при удалении пользователей');
      }
    },
  })),
);

export default useTripsStore;
