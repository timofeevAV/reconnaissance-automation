import './trip-dates-calendar.config';
import { useTripsFacade } from '@/features/trips';
import React, { useCallback, useState, useMemo } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'tamagui';
import { useAuthFacade } from '@/features/users';
import { TripDatesCalendarProps } from './types';

interface Day {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export const TripDatesCalendar = ({
  tripId,
  dates,
}: TripDatesCalendarProps) => {
  const { removeTripDate, addTripDate } = useTripsFacade();
  const { accessToken } = useAuthFacade();
  const theme = useTheme();
  const color = theme.color.get();
  const blue = theme.blue11.get();
  const background = theme.background.get();
  const key = useMemo(
    () => `${background}-${color}-${blue}`,
    [background, blue, color],
  );
  const [selectedDates, setSelectedDates] = useState(dates);

  const onDaySelect = useCallback(
    async (day: Day) => {
      try {
        if (selectedDates[day.dateString]) {
          removeTripDate(selectedDates[day.dateString].id, accessToken).then(
            () => {
              const { [day.dateString]: undefined, ...updatedDates } =
                selectedDates;
              setSelectedDates(updatedDates);
            },
          );
        } else {
          addTripDate(tripId, day.dateString, accessToken).then(data => {
            setSelectedDates(prevDates => ({
              ...prevDates,
              [day.dateString]: { selected: true, id: data.id },
            }));
          });
        }
      } catch (error) {
        const errorMessage = selectedDates[day.dateString]
          ? 'Error deleting date.'
          : 'Error adding date.';
        console.error(error);
        throw new Error(errorMessage);
      }
    },
    [accessToken, addTripDate, removeTripDate, selectedDates, tripId],
  );

  return (
    <Calendar
      key={key}
      onDayPress={onDaySelect}
      firstDay={1}
      markedDates={selectedDates}
      disableMonthChange
      theme={{
        textDayFontFamily: 'Involve-Regular',
        textMonthFontFamily: 'Involve-Bold',
        textDayHeaderFontFamily: 'Involve-SemiBold',
        calendarBackground: '#00000000',
        textSectionTitleColor: color,
        selectedDayBackgroundColor: blue,
        todayTextColor: blue,
        dayTextColor: color,
        monthTextColor: color,
        arrowColor: blue,
        selectedDayTextColor: background,
      }}
    />
  );
};
