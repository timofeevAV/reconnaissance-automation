import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Input,
  Label,
  Fieldset,
  Button,
  DialogTitle,
  XStack,
} from 'tamagui';
import { DismissKeyboardView } from '@/features/ui';
import { Plus } from '@tamagui/lucide-icons';
import { AddTripDialogProps } from './types';
import { useTripsFacade } from '../facades';
import { useAuthFacade } from '@/features/users';

export const AddTripDialog = ({
  dialogOpen,
  setDialogOpen,
}: AddTripDialogProps) => {
  const { accessToken } = useAuthFacade();
  const { addTrip } = useTripsFacade();
  const [tripName, setTripName] = useState('');

  useEffect(() => {
    if (!dialogOpen) {
      setTripName('');
    }
  }, [dialogOpen]);

  return (
    <Dialog
      modal
      open={dialogOpen}
      onOpenChange={e => setDialogOpen(e)}>
      <Dialog.Trigger asChild>
        <Button
          bordered
          position="absolute"
          bottom={'$3'}
          right={'$3'}
          alignSelf="flex-end"
          icon={Plus}
          p={'$3'}
          circular
          theme={'blue_active'}
          shadowRadius={'$1.5'}
          shadowOpacity={0.5}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          onPress={() => setDialogOpen(false)}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          width={'90%'}>
          <DismissKeyboardView gap="$3">
            <DialogTitle>Добавить выезд</DialogTitle>
            <Fieldset
              gap="$3"
              horizontal>
              <Label htmlFor="trip-name">Название</Label>
              <Input
                flex={1}
                id="trip-name"
                value={tripName}
                onChangeText={setTripName}
              />
            </Fieldset>
            {/* <Fieldset>
              <Label htmlFor="trip-members">Участники</Label>
              <Input id="trip-members" />
            </Fieldset> */}
            <XStack
              alignSelf="flex-end"
              gap="$3">
              <Dialog.Close
                displayWhenAdapted
                asChild>
                <Button aria-label="cancel">Отмена</Button>
              </Dialog.Close>
              <Button
                theme={tripName ? 'blue_active' : 'blue'}
                disabled={!tripName}
                aria-label="add-trip"
                onPress={async () =>
                  await addTrip(tripName, accessToken)
                    .catch(e => alert(e))
                    .finally(() => setDialogOpen(false))
                }>
                Добавить
              </Button>
            </XStack>
          </DismissKeyboardView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
