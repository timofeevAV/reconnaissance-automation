import { Trip } from '../../types';

export type SortField = keyof Trip;

export enum SortDirection {
  ASC,
  DESC,
}

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}
