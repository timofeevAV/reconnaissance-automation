export interface TripDatesCalendarProps {
  tripId: number;
  dates: Record<string, { id: number; selected: boolean }>;
}
