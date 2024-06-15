import { useState } from 'react';
import { Button, Fieldset, Input, XStack, YStack } from 'tamagui';
import { useCharacteristicsFacade } from '../../facades';
import { useAuthFacade } from '@/features/users';
import { Plus } from '@tamagui/lucide-icons';

export const CharacteristicsListHeader = () => {
  const [characteristicName, setCharacteristicName] = useState('');
  const [characteristicExpression, setCharacteristicExpression] = useState('');
  const { addCharacteristic } = useCharacteristicsFacade();
  const { accessToken } = useAuthFacade();

  return (
    <XStack
      ai="center"
      gap={'$3'}>
      <YStack
        mb={'$3'}
        flex={1}>
        <Fieldset>
          {/* <Label htmlFor="characteristic-name">Название</Label> */}
          <Input
            id="characteristic-name"
            placeholder="Введите название характеристики"
            value={characteristicName}
            onChangeText={setCharacteristicName}
          />
        </Fieldset>
        <Fieldset>
          {/* <Label htmlFor="characteristic-expression">Выражение</Label> */}
          <Input
            id="characteristic-expression"
            placeholder="Введите выражение характеристики"
            value={characteristicExpression}
            onChangeText={setCharacteristicExpression}
            flex={1}
          />
        </Fieldset>
      </YStack>
      <Button
        circular
        icon={Plus}
        theme={!characteristicName ? undefined : 'active'}
        disabled={!characteristicName}
        onPress={() =>
          addCharacteristic(
            characteristicName,
            characteristicExpression,
            accessToken,
          )
        }
      />
    </XStack>
  );
};
