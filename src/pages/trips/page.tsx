import { useCallback, useState, useMemo, useLayoutEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUsersFacade } from '@/features/users/facades';
import { SignInPageProps } from '@/pages/sign-in/sign-in-page-props';
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  ListItem,
  ScrollView,
  Separator,
  Text,
  XGroup,
  YGroup,
  XStack,
} from 'tamagui';
import { Check, Plus } from '@tamagui/lucide-icons';
import { DismissKeyboardView, TripsContextMenu } from '@/features/ui';

export const Trips = (props: SignInPageProps) => {
  const { navigation } = props;
  const { users, fetchUsers, addUser, deleteUsers } = useUsersFacade();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tripName, setTripName] = useState('');

  const selectItem = useCallback((userId: number) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId],
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedItems(prevSelected =>
      prevSelected.length ? [] : users.map(user => user.id),
    );
  }, [users]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TripsContextMenu
          selectMode={selectMode}
          setSelectMode={setSelectMode}
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
          setSelectedItems={setSelectedItems}
        />
      ),
    });

    if (!users.length) {
      fetchUsers();
    }
  }, [navigation, popoverOpen, selectMode, users.length]);

  const userList = useMemo(
    () =>
      users.map(user => (
        <YGroup.Item key={user.id}>
          <ListItem
            bordered
            pressTheme
            style={{ borderRadius: 15 }}
            title={user.name}
            onPress={
              selectMode
                ? () => selectItem(user.id)
                : () =>
                    navigation.navigate('trip-details', {
                      title: user.name,
                    })
            }
            iconAfter={selectedItems.includes(user.id) ? Check : undefined}>
            <Text>{user.company.name}</Text>
          </ListItem>
        </YGroup.Item>
      )),
    [users, selectMode, selectedItems],
  );

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <YGroup
          gap="$1.5"
          paddingHorizontal="$2"
          paddingVertical={'$3'}>
          {userList}
        </YGroup>
      </ScrollView>

      {selectMode ? (
        <XGroup
          position="absolute"
          bottom={insets.bottom ? insets.bottom : '$3'}
          alignSelf="center"
          separator={<Separator vertical />}
          bordered>
          <XGroup.Item>
            <Button
              theme={'active'}
              onPress={selectAll}>
              {selectedItems.length ? 'Отменить выбор' : 'Выбрать все'}
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button
              theme={selectedItems.length === 0 ? 'red' : 'red_active'}
              disabled={selectedItems.length === 0}
              onPress={() => {
                deleteUsers(selectedItems);
                setSelectedItems([]);
              }}>
              Удалить
            </Button>
          </XGroup.Item>
        </XGroup>
      ) : (
        <Dialog
          modal
          open={dialogOpen}
          onOpenChange={e => setDialogOpen(e)}>
          <Dialog.Trigger asChild>
            <Button
              bordered
              position="absolute"
              bottom={insets.bottom ? insets.bottom : '$3'}
              right={insets.right ? insets.right : '$3'}
              alignSelf="flex-end"
              icon={Plus}
              p={'$3'}
              circular
            />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              opacity={1}
              onPress={() => setDialogOpen(false)}
            />

            <Dialog.Content
              bordered
              elevate
              key="content">
              <DismissKeyboardView gap="$3">
                <Dialog.Title>Добавить выезд</Dialog.Title>
                <Dialog.Description>
                  Внесите изменения в свой профиль здесь. Нажмите «Добавить»,
                  когда закончите.
                </Dialog.Description>
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
                <Fieldset>
                  <Label htmlFor="trip-members">Участники</Label>
                  <Input
                    id="trip-members"
                    value={tripName}
                    onChangeText={setTripName}
                  />
                </Fieldset>
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
                    onPress={async () => {
                      try {
                        await addUser({
                          id: users.length * 10 + 1,
                          name: tripName,
                          email: 'steve@mail.ru',
                          username: 'stevecool',
                          address: {
                            street: 'street',
                            suite: 'string',
                            city: 'string',
                            zipcode: 'string',
                            geo: {
                              lat: 'string',
                              lng: 'string',
                            },
                          },
                          phone: 'string',
                          website: 'string',
                          company: {
                            name: 'string',
                            catchPhrase: 'string',
                            bs: 'string',
                          },
                        });
                      } catch (e) {
                        alert(e);
                      } finally {
                        setDialogOpen(false);
                      }
                    }}>
                    Добавить
                  </Button>
                </XStack>
              </DismissKeyboardView>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </>
  );
};
