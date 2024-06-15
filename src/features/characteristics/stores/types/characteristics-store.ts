import { Characteristic } from '../../types';

export interface CharacteristicState {
  characteristics: Characteristic[];
  isLoading: boolean;
}

interface CharacteristicActions {
  fetchCharacteristics: (accessToken?: string | null) => Promise<void>;
  addCharacteristic: (
    name: string,
    expression: string | null,
    accessToken?: string | null,
  ) => Promise<void>;
  deleteCharacteristic: (
    id: number,
    accessToken?: string | null,
  ) => Promise<void>;
}

export type CharacteristicsStore = CharacteristicState & CharacteristicActions;
