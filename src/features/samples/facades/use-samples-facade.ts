import { useSamplesStore } from '../stores';

const useSamplesFacade = () => {
  const {
    samples,
    sampleCharacteristics,
    isLoading,
    fetchSamples,
    deleteSample,
    fetchSampleCharacteristics,
    addSample,
    addSampleCharacteristic,
    deleteSampleCharacteristic,
  } = useSamplesStore(state => ({
    samples: state.samples,
    sampleCharacteristics: state.sampleCharacteristics,
    isLoading: state.isLoading,
    fetchSamples: state.fetchSamples,
    deleteSample: state.deleteSample,
    fetchSampleCharacteristics: state.fetchSampleCharacteristics,
    addSample: state.addSample,
    addSampleCharacteristic: state.addSampleCharacteristic,
    deleteSampleCharacteristic: state.deleteSampleCharacteristic,
  }));

  return {
    samples,
    sampleCharacteristics,
    isLoading,
    fetchSamples,
    deleteSample,
    fetchSampleCharacteristics,
    addSample,
    addSampleCharacteristic,
    deleteSampleCharacteristic,
  };
};

export default useSamplesFacade;
