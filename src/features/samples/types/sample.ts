import { Characteristic } from '@/features/characteristics/types';

export interface Sample {
  id: number;
  name: string;
  characteristics: Characteristic[];
}

export interface SampleCharacteristic {
  id: number;
  sample_id: number;
  characteristic_id: number;
}
