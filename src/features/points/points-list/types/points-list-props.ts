import { Trip } from '@/features/trips/types';
import { Point, PointPhoto, PointsPagination } from '../../types';
import { Updater } from 'use-immer';
import { FlashList } from '@shopify/flash-list';
import { RefObject } from 'react';

export interface PointsListProps {
  listRef: RefObject<FlashList<Point>>;
  tripId: number;
  tripDates: Record<string, { id: number; selected: boolean }>;
  tripPoints: PointsPagination | null;
  tripScheme?: {
    uri: Trip['scheme'];
    blurhash: Trip['blurhash'];
  };
  removeScheme: () => Promise<void>;
  uploadScheme: (formData: FormData) => Promise<void>;
  setTripPoints: Updater<PointsPagination | null>;
  setFullScreenImage: React.Dispatch<React.SetStateAction<PointPhoto | null>>;
  fetchAllData: () => Promise<void>;
}
