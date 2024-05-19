import { Trip, TripDate } from '@/features/trips/types';
import { SortOption } from './trips-sort-option';
import { TripMap } from '@/pages/trips-map/page';

export interface TripState {
  next: string | null;
  previous: string | null;
  count: number;
  trips: Trip[];
  isLoading: boolean;
  searchPhrase: Trip['name'];
  sort: SortOption;
}

type Bounds = {
  northEast: {
    latitude: number;
    longitude: number;
  };
  southWest: {
    latitude: number;
    longitude: number;
  };
};

interface TripActions {
  changeSearchPhrase: (newSearchPhrase: Trip['name']) => void;
  changeSort: (newSortOption: SortOption) => void;
  fetchTripsInBounds: (
    bounds: Bounds,
    accessToken?: string | null,
  ) => Promise<TripMap[]>;
  fetchTripDates: (
    tripId: Trip['id'],
    accessToken?: string | null,
  ) => Promise<Record<string, { id: number; selected: boolean }>>;
  addTripDate: (
    tripId: Trip['id'],
    day: any,
    accessToken?: string | null,
  ) => Promise<TripDate>;
  removeTripDate: (
    tripDateId: number,
    accessToken?: string | null,
  ) => Promise<void>;
  fetchTrips: (
    accessToken?: string | null,
    fetchNext?: boolean,
  ) => Promise<void>;
  fetchTrip: (tripId: Trip['id'], accessToken?: string | null) => Promise<Trip>;
  addTrip: (name: string, accessToken?: string | null) => Promise<void>;
  updateTrip: (
    tripId: Trip['id'],
    updatedFields: Trip | Partial<Trip>,
    accessToken?: string | null,
  ) => Promise<void>;
  deleteTrips: (
    ids: Trip['id'][],
    accessToken?: string | null,
  ) => Promise<void>;
}

export type TripsStore = TripState & TripActions;
