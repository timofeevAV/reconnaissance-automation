import { Dialog, H5, ListItem, ScrollView, Separator, YGroup } from 'tamagui';
import { Sample } from '../../types';
import { Text } from 'tamagui';
import { CircleEllipsis, Delete } from '@tamagui/lucide-icons';
import { Popup } from '@/features/ui';
import { useState } from 'react';
import { useSamplesFacade } from '../../facades';
import { useAuthFacade } from '@/features/users';
import { useCharacteristicsFacade } from '@/features/characteristics/facades';
import { useWindowDimensions } from 'react-native';
import { Characteristic } from '@/features/characteristics/types';
import { onlyInLeft } from '@/features/utils';

export const SamplesListItem = ({ item }: { item: Sample }) => {
  const [showCharacteristics, setShowCharacteristics] = useState(false);
  const { deleteSampleCharacteristic, addSampleCharacteristic, deleteSample } =
    useSamplesFacade();
  const { accessToken } = useAuthFacade();
  const { characteristics } = useCharacteristicsFacade();
  const { width, height } = useWindowDimensions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isLandScape = width > height;

  const isSameCharacteristic = (a: Characteristic, b: Characteristic) =>
    a.id === b.id;

  return (
    <>
      <ListItem
        title={<H5 fontWeight={'bold'}>{item.name}</H5>}
        backgrounded
        bordered
        borderRadius={'$3'}
        position="relative">
        <Popup>
          <Popup.Trigger>
            <CircleEllipsis
              position="absolute"
              right="$1.5"
              top="$1.5"
            />
          </Popup.Trigger>
          <Popup.Content>
            <YGroup separator={<Separator />}>
              {Boolean(item.characteristics.length) && (
                <YGroup.Item>
                  <ListItem
                    pressTheme
                    theme={'active'}
                    onPress={() =>
                      setShowCharacteristics(!showCharacteristics)
                    }>
                    {showCharacteristics
                      ? 'Скрыть характеристики'
                      : 'Показать характеристики'}
                  </ListItem>
                </YGroup.Item>
              )}
              <YGroup.Item key={'add-trigger'}>
                <ListItem
                  theme={'active'}
                  onPress={() => setDialogOpen(true)}>
                  Добавить характеристику
                </ListItem>
              </YGroup.Item>

              <YGroup.Item>
                <ListItem
                  pressTheme
                  theme={'red'}
                  onPress={() => {
                    deleteSample(item.id, accessToken);
                  }}>
                  Удалить
                </ListItem>
              </YGroup.Item>
            </YGroup>
          </Popup.Content>
        </Popup>
        {Boolean(showCharacteristics && item.characteristics.length) && (
          <>
            <Text mb={'$3'}>Характеристики:</Text>
            <YGroup
              separator={<Separator />}
              bordered
              backgrounded>
              {item.characteristics.map((characteristic, index) => {
                return (
                  <YGroup.Item key={index}>
                    <ListItem
                      borderRadius={'$3'}
                      position="relative"
                      title={characteristic.name}
                      subTitle={characteristic.expression}>
                      <Delete
                        position="absolute"
                        right={0}
                        onPress={() => {
                          deleteSampleCharacteristic(
                            item.id,
                            characteristic.id,
                            accessToken,
                          );
                        }}
                      />
                    </ListItem>
                  </YGroup.Item>
                );
              })}
            </YGroup>
          </>
        )}
        <Dialog
          modal
          key={'add-char-dialog'}
          onOpenChange={setDialogOpen}
          open={dialogOpen}>
          <Dialog.Portal key={'dialog-portal'}>
            <Dialog.Overlay
              key={'dialog-overlay'}
              onPress={() => setDialogOpen(false)}
            />
            <Dialog.Content
              key={'dialog-content'}
              width={isLandScape ? width : width}
              height={isLandScape ? width : width}
              p={0}>
              <ScrollView
                contentContainerStyle={{
                  p: '$3',
                }}>
                {onlyInLeft(
                  characteristics,
                  item.characteristics,
                  isSameCharacteristic,
                ).map(c => {
                  return (
                    <ListItem
                      key={`${c.id}-${c.name}`}
                      borderRadius={'$3'}
                      bordered
                      onPress={() => {
                        addSampleCharacteristic(item.id, c, accessToken).then(
                          () => {
                            setDialogOpen(false);
                          },
                        );
                      }}>
                      {c.name}
                    </ListItem>
                  );
                })}
              </ScrollView>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </ListItem>
    </>
  );
};
