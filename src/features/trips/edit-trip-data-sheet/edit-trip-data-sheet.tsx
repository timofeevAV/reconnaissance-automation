import React, { useCallback, useMemo, useState } from 'react';
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
  ListItem,
} from 'tamagui';
import { Check, Edit3 } from '@tamagui/lucide-icons';
import { EditTripDataSheetProps } from './types';
import { useTripsFacade } from '../facades';
import { useAuthFacade } from '@/features/users';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useImmer } from 'use-immer';
import { Alert } from 'react-native';
import { User } from '@/features/users/types';

export const EditTripDataSheet = ({
  trip,
  setTrip,
  navigation,
  users,
  addEditor,
  removeEditor,
}: EditTripDataSheetProps) => {
  const [tripFormData, updateTripFormData] = useImmer({
    name: trip.name,
  });
  const { accessToken, user } = useAuthFacade();
  const { updateTrip } = useTripsFacade();
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const updateName = useCallback(
    (newName: string) => {
      updateTripFormData(draft => {
        draft.name = newName;
      });
    },
    [updateTripFormData],
  );

  const onSave = useCallback(() => {
    updateTrip(trip.id, tripFormData, accessToken)
      .then(() => {
        navigation.setOptions({ title: tripFormData.name });
        setTrip(draft => {
          draft.name = tripFormData.name;
        });
      })
      .catch(error => {
        console.error('Failed to update trip:', error);
      })
      .finally(() => setOpen(false));
  }, [updateTrip, trip.id, tripFormData, accessToken, navigation, setTrip]);

  const isSaveDisabled = useMemo(
    () => !tripFormData.name || tripFormData.name === trip.name,
    [tripFormData.name, trip.name],
  );

  const getFullName = useCallback((user: User) => {
    return `${user?.lastName} ${user?.firstName} ${user?.middleName}`;
  }, []);

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
          paddingHorizontal={'$5'}
          paddingBottom={insets.bottom ? insets.bottom : '$5'}>
          <YStack
            gap={'$3'}
            flex={1}>
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
              borderWidth={'$1'}
              borderColor={'$borderColor'}
              gap={'$3'}
              disabled={user?.id !== trip.owner?.id}>
              {trip.editors.map(editor => {
                return (
                  <ListItem
                    key={editor.id}
                    icon={<Check />}
                    title={getFullName(editor)}
                    subTitle={editor.role}
                    onPress={() => {
                      Alert.alert(
                        'Удалить участника',
                        `Вы действительно хотите удалить ${editor.firstName}?`,
                        [
                          {
                            text: 'Отмена',
                            style: 'cancel',
                          },
                          {
                            text: 'Удалить',
                            onPress: () => {
                              removeEditor(trip.id, editor.id);
                            },
                          },
                        ],
                      );
                    }}
                  />
                );
              })}
              {users.map(user => {
                return (
                  <ListItem
                    key={user.id}
                    title={getFullName(user)}
                    subTitle={user.role}
                    onPress={() => {
                      Alert.alert(
                        'Добавить участника',
                        `Вы действительно хотите добавить ${user.firstName}?`,
                        [
                          {
                            text: 'Отмена',
                            style: 'cancel',
                          },
                          {
                            text: 'Добавить',
                            onPress: () => {
                              addEditor(trip.id, user);
                            },
                          },
                        ],
                      );
                    }}
                  />
                );
              })}
            </ScrollView>
          </YStack>
          <XStack
            gap={'$3'}
            mt={'$3'}
            alignSelf="flex-end">
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
