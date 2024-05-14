import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Input,
  Label,
  Fieldset,
  Button,
  XStack,
  View,
  Sheet,
  H4,
  Separator,
  YStack,
  ScrollView,
  Text,
  YGroup,
  ListItem,
} from 'tamagui';
import { Edit3 } from '@tamagui/lucide-icons';
import { EditTripDataSheetProps } from './types';
import { useTripsFacade } from '../facades';
import { useAuthFacade } from '@/features/users';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useImmer } from 'use-immer';

export const EditTripDataSheet = ({
  trip,
  navigation,
}: EditTripDataSheetProps) => {
  const [tripFormData, updateTripFormData] = useImmer({
    name: trip.name,
  });
  const { accessToken } = useAuthFacade();
  const { updateTrip } = useTripsFacade();
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    updateTripFormData(trip);
  }, [open, trip, updateTripFormData]);

  const updateName = useCallback(
    (newName: string) => {
      updateTripFormData(draft => {
        draft.name = newName;
      });
    },
    [updateTripFormData],
  );

  const onSave = useCallback(() => {
    updateTrip(trip.id, { name: tripFormData.name }, accessToken)
      .then(() => navigation.setOptions({ title: tripFormData.name }))
      .catch(error => {
        console.error('Failed to update trip:', error);
      })
      .finally(() => setOpen(false));
  }, [trip.id, tripFormData, accessToken, updateTrip, navigation]);

  const isSaveDisabled = useMemo(
    () => !tripFormData.name || tripFormData.name === trip.name,
    [tripFormData.name, trip.name],
  );

  return (
    <>
      <View
        pressStyle={{ scale: 0.9, opacity: 0.5 }}
        p={'$1.5'}
        onPress={() => setOpen(true)}>
        <Edit3 />
      </View>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        modal>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame
          borderTopStartRadius={'$5'}
          borderTopEndRadius={'$5'}
          paddingTop={'$5'}
          paddingHorizontal={'$5'}>
          <YStack
            gap={'$3'}
            h={'100%'}>
            <H4>Изменить данные о выезде</H4>
            <Separator themeInverse />

            <Fieldset
              gap="$3"
              horizontal>
              <Label htmlFor="trip-name">Название</Label>
              <Input
                flex={1}
                id="trip-name"
                value={tripFormData.name}
                onChangeText={updateName}
              />
            </Fieldset>

            <Text>Участники</Text>
            <ScrollView
              borderRadius={'$5'}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              // backgroundColor={'red'}
              h={'60%'}
              flexGrow={0}
              onScroll={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              borderWidth={'$1'}
              borderColor={'$borderColor'}
              gap={'$3'}>
              {trip.editors.map(editor => {
                return <ListItem key={editor.id}>{editor.firstName}</ListItem>;
              })}
            </ScrollView>
          </YStack>
          <XStack
            alignSelf="flex-end"
            gap={'$3'}
            position="absolute"
            bottom={insets.bottom ? insets.bottom : '$5'}
            right={'$5'}>
            <Button onPress={() => setOpen(false)}>Отмена</Button>
            <Button
              theme={isSaveDisabled ? 'blue' : 'blue_active'}
              disabled={isSaveDisabled}
              onPress={onSave}>
              Сохранить
            </Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
