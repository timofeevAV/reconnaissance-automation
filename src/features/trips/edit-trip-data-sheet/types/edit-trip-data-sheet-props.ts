import { User } from '@/features/users/types';
import { Trip } from '../../types';

export interface EditTripDataSheetProps {
  trip: Trip;
  setTrip: (trip: Trip) => void;
  navigation: any;
  users: User[];
  addEditor: (tripId: number, user: User) => void;
  removeEditor: (tripId: number, userId: number) => void;
}
