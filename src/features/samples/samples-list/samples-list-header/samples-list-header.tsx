import { useAuthFacade } from '@/features/users';
import { Plus } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Button, Fieldset, Input, XStack } from 'tamagui';
import { useSamplesFacade } from '../../facades';

export const SamplesListHeader = () => {
  const { accessToken } = useAuthFacade();
  const { addSample } = useSamplesFacade();
  const [sampleName, setSampleName] = useState('');

  return (
    <Fieldset mb={'$3'}>
      <XStack gap={'$3'}>
        <Input
          id="sample-name"
          flex={1}
          value={sampleName}
          onChangeText={setSampleName}
          placeholder="Введите название пробы"
        />
        <Button
          circular
          icon={Plus}
          theme={sampleName ? 'active' : undefined}
          disabled={!Boolean(sampleName)}
          onPress={() => {
            addSample(sampleName, accessToken).then(() => {
              setSampleName('');
            });
          }}
        />
      </XStack>
    </Fieldset>
  );
};
