import { Trip } from '@/features/trips/types';

export interface Point {
  id: number;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  samples: Sample[];
  trip: Trip;
  photos: PointPhoto[];
}

export interface PointsPagination {
  next: string | null;
  previous: string | null;
  results: Point[];
  count: number;
}

export interface PointPhoto {
  id: number;
  photo?: string | null;
  point: Point;
  blurhash?: string | null;
}

export interface PointSample {
  id: number;
  sample: Sample;
  point: Point;
}

export interface CharacteristicValue {
  id: number;
  characteristic: Characteristic;
  pointSample: PointSample;
  value: string;
}

export interface Sample {
  id: number;
  name: string;
}

export interface Characteristic {
  id: number;
  name: string;
}
