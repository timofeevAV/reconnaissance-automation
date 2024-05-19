import useCharacteristicsStore from '../stores/use-characteristics-store';

const useCharacteristicsFacade = () => {
  const {
    characteristics,
    isLoading,
    fetchCharacteristics,
    addCharacteristic,
  } = useCharacteristicsStore(state => ({
    characteristics: state.characteristics,
    isLoading: state.isLoading,
    fetchCharacteristics: state.fetchCharacteristics,
    addCharacteristic: state.addCharacteristic,
  }));

  return {
    characteristics,
    isLoading,
    fetchCharacteristics,
    addCharacteristic,
  };
};

export default useCharacteristicsFacade;
