import { Trip } from '@/features/trips/types';
import { SortOption } from './trips-sort-option';

export interface TripState {
  next: string | null;
  previous: string | null;
  count: number;
  trips: Trip[];
  isLoading: boolean;
  searchPhrase: Trip['name'];
  sort: SortOption;
}

interface TripActions {
  changeSearchPhrase: (newSearchPhrase: Trip['name']) => void;
  changeSort: (newSortOption: SortOption) => void;
  fetchTrips: (
    accessToken?: string | null,
    fetchNext?: boolean,
  ) => Promise<void>;
  fetchTrip: (tripId: number, accessToken?: string | null) => Promise<Trip>;
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
