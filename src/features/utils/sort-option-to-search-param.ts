import { SortOption } from '../trips/stores/types';

export const sortOptionToSearchParam = (sortOption: SortOption): string => {
  const direction = sortOption.direction ? '-' : '';
  return `${direction}${sortOption.field}`;
};
