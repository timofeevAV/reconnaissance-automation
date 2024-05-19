import React from 'react';
import { XGroup, Button, getTokens } from 'tamagui';
import { SelectModeActionsProps } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeOutDown, useSharedValue } from 'react-native-reanimated';

export const SelectModeActions = ({
  selectAll,
  isItemsSelected,
  removeSelectedItems,
}: SelectModeActionsProps) => {
  const tamaguiSpace = getTokens().space['$3'].val;
  const insets = useSafeAreaInsets();
  const bottom = useSharedValue(insets.bottom + tamaguiSpace);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        bottom,
      }}
      exiting={FadeOutDown}>
      <XGroup
        backgrounded
        bordered
        shadowRadius={'$1.5'}
        shadowOpacity={0.5}>
        <XGroup.Item>
          <Button
            theme={'active'}
            onPress={selectAll}>
            {isItemsSelected ? 'Отменить выбор' : 'Выбрать все'}
          </Button>
        </XGroup.Item>
        <XGroup.Item>
          <Button
            theme={!isItemsSelected ? 'red' : 'red_active'}
            disabled={!isItemsSelected}
            onPress={removeSelectedItems}>
            Удалить
          </Button>
        </XGroup.Item>
      </XGroup>
    </Animated.View>
  );
};
