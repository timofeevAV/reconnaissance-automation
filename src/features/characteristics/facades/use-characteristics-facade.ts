import useCharacteristicsStore from '../stores/use-characteristics-store';

const useCharacteristicsFacade = () => {
  const {
    characteristics,
    isLoading,
    fetchCharacteristics,
    addCharacteristic,
    deleteCharacteristic,
  } = useCharacteristicsStore(state => ({
    characteristics: state.characteristics,
    isLoading: state.isLoading,
    fetchCharacteristics: state.fetchCharacteristics,
    addCharacteristic: state.addCharacteristic,
    deleteCharacteristic: state.deleteCharacteristic,
  }));

  return {
    characteristics,
    isLoading,
    fetchCharacteristics,
    addCharacteristic,
    deleteCharacteristic,
  };
};

export default useCharacteristicsFacade;
