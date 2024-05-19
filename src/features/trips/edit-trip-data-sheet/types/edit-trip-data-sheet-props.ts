import { Trip } from '../../types';

export interface EditTripDataSheetProps {
  trip: Trip;
  setTrip: (trip: Trip) => void;
  navigation: any;
}
