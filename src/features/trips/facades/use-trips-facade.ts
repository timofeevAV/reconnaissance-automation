import useTripsStore from '../stores/use-trips-store';

const useTripsFacade = () => {
  const {
    trips,
    count,
    next,
    previous,
    isLoading,
    sort,
    searchPhrase,
    changeSearchPhrase,
    changeSort,
    fetchTrips,
    fetchTrip,
    addTrip,
    updateTrip,
    deleteTrips,
  } = useTripsStore(state => ({
    trips: state.trips,
    count: state.count,
    next: state.next,
    previous: state.previous,
    isLoading: state.isLoading,
    sort: state.sort,
    searchPhrase: state.searchPhrase,
    changeSearchPhrase: state.changeSearchPhrase,
    changeSort: state.changeSort,
    fetchTrips: state.fetchTrips,
    fetchTrip: state.fetchTrip,
    addTrip: state.addTrip,
    updateTrip: state.updateTrip,
    deleteTrips: state.deleteTrips,
  }));

  return {
    trips,
    isLoading,
    count,
    next,
    previous,
    sort,
    searchPhrase,
    changeSearchPhrase,
    changeSort,
    fetchTrips,
    fetchTrip,
    addTrip,
    updateTrip,
    deleteTrips,
  };
};

export default useTripsFacade;
