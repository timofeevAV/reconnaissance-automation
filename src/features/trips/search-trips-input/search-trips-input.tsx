import { Input, InputProps } from 'tamagui';
import { useTripsFacade } from '../facades';
import { useAuthFacade } from '@/features/users';
import React from 'react';
import { useDebounce } from '@/features/hooks';

const SearchTripsInput = React.memo((props: InputProps) => {
  const { searchPhrase, changeSearchPhrase } = useTripsFacade();
  const { fetchTrips } = useTripsFacade();
  const { accessToken } = useAuthFacade();

  useDebounce(
    () => {
      fetchTrips(accessToken);
    },
    [searchPhrase],
    500,
  );

  return (
    <Input
      placeholder="Поиск по поездкам"
      value={searchPhrase}
      onChangeText={changeSearchPhrase}
      {...props}
    />
  );
});

SearchTripsInput.displayName = 'SearchTripsInput';

export { SearchTripsInput };
