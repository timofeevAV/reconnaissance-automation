import { User } from '@/features/users/types';

export interface TripDate {
  id: number;
  day: string;
  trip: Trip;
}

export interface Trip {
  id: number;
  name: string;
  scheme: string | null;
  blurhash: string | null;
  createdAt: string;
  updatedAt: string;
  owner: User | null;
  editors: User[];
  dates: TripDate[];
}
