export interface Sample {
  id: number;
  name: string;
}

export interface SampleCharacteristic {
  id: number;
  sample_id: number;
  characteristic_id: number;
}
