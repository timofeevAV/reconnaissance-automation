import { Characteristic } from '@/features/characteristics/types';
import { Sample, SampleCharacteristic } from '../../types';

export interface SampleState {
  samples: Sample[];
  sampleCharacteristics: SampleCharacteristic[];
  isLoading: boolean;
}

interface SampleActions {
  fetchSamples: (accessToken?: string | null) => Promise<void>;
  deleteSample: (
    sampleId: number,
    accessToken?: string | null,
  ) => Promise<void>;
  fetchSampleCharacteristics: (accessToken?: string | null) => Promise<void>;
  addSample: (name: string, accessToken?: string | null) => Promise<void>;
  addSampleCharacteristic: (
    sampleId: number,
    characteristic: Characteristic,
    accessToken?: string | null,
  ) => Promise<void>;
  deleteSampleCharacteristic: (
    sampleId: number,
    characteristicId: number,
    accessToken?: string | null,
  ) => Promise<void>;
}

export type SamplesStore = SampleState & SampleActions;
