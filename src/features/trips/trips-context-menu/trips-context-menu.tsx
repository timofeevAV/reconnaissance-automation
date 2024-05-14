import { memo, useState } from 'react';
import { Modal, Dimensions, GestureResponderEvent } from 'react-native';
import { Separator, View, Text, YGroup, ListItem } from 'tamagui';
import {
  CircleEllipsis,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Check,
} from '@tamagui/lucide-icons';
import { TripsContextMenuProps } from './types';
import { SortField, SortDirection } from '../stores/types';
import { useTripsFacade } from '../facades';

const TripsContextMenu = memo(
  ({ selectMode, setSelectMode, setSelectedItems }: TripsContextMenuProps) => {
    const { sort, changeSort, trips } = useTripsFacade();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

    const openMenu = (e: GestureResponderEvent) => {
      setMenuPosition({
        top: e.nativeEvent.pageY,
        right: Dimensions.get('window').width - e.nativeEvent.pageX,
      });
      setMenuVisible(true);
    };

    const closeMenu = () => {
      setMenuVisible(false);
    };

    const toggleSelectMode = () => {
      setSelectMode(prevMode => {
        if (prevMode) setSelectedItems([]);
        else setMenuVisible(false);
        return !prevMode;
      });
    };

    const handleSortChange = (field: SortField) => {
      changeSort({
        field,
        direction:
          sort.field === field && sort.direction === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC,
      });
    };

    const renderListItems = () => {
      const listItems = [
        {
          label: 'Выбрать',
          onPress: toggleSelectMode,
          iconAfter: selectMode ? CheckCircle : undefined,
          key: 'select',
        },
        {
          label: 'Сортировка по имени',
          onPress: () => handleSortChange('name'),
          icon: sort.field === 'name' ? Check : undefined,
          iconAfter:
            sort.field === 'name'
              ? sort.direction === SortDirection.ASC
                ? ChevronUp
                : ChevronDown
              : undefined,
          key: 'sort-by-name',
        },
        {
          label: 'Сортировка по дате создания',
          onPress: () => handleSortChange('createdAt'),
          icon: sort.field === 'createdAt' ? Check : undefined,
          iconAfter:
            sort.field === 'createdAt'
              ? sort.direction === SortDirection.ASC
                ? ChevronUp
                : ChevronDown
              : undefined,
          key: `sort-by-created-at`,
        },
        {
          label: 'Сортировка по дате изменения',
          onPress: () => handleSortChange('updatedAt'),
          icon: sort.field === 'updatedAt' ? Check : undefined,
          iconAfter:
            sort.field === 'updatedAt'
              ? sort.direction === SortDirection.ASC
                ? ChevronUp
                : ChevronDown
              : undefined,
          key: `sort-by-updated-at`,
        },
      ];

      return listItems.map(item => (
        <YGroup.Item key={item.key}>
          <ListItem
            pressTheme
            onPress={item.onPress}
            icon={item.icon}
            iconAfter={item.iconAfter}>
            {item.label}
          </ListItem>
        </YGroup.Item>
      ));
    };

    if (selectMode) {
      return (
        <Text
          m="$2"
          color={'$blue11'}
          fontWeight={'bold'}
          pressStyle={{ opacity: 0.5, scale: 0.95 }}
          onPress={toggleSelectMode}>
          Готово
        </Text>
      );
    }

    return (
      <>
        <View
          onPress={openMenu}
          pressStyle={{ scale: 0.9, opacity: 0.5 }}
          right="$3"
          p={'$1.5'}>
          <CircleEllipsis />
        </View>
        <Modal
          transparent
          visible={menuVisible}
          onRequestClose={closeMenu}
          supportedOrientations={['portrait', 'landscape']}>
          <View
            onPress={closeMenu}
            flex={1}>
            <YGroup
              separator={<Separator />}
              bordered
              backgrounded
              position="absolute"
              top={menuPosition.top}
              right={menuPosition.right}
              shadowRadius={'$3'}
              shadowOpacity={0.5}
              disabled={!Boolean(trips.length)}>
              {renderListItems()}
            </YGroup>
          </View>
        </Modal>
      </>
    );
  },
);

TripsContextMenu.displayName = 'TripsContextMenu';

export { TripsContextMenu };
