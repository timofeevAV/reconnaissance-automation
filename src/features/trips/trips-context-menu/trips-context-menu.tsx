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
import { Popup } from '@/features/ui';

export const TripsContextMenu = ({
  selectMode,
  setSelectMode,
  setSelectedItems,
}: TripsContextMenuProps) => {
  const { sort, changeSort, trips } = useTripsFacade();

  const toggleSelectMode = () => {
    setSelectMode(prevMode => {
      if (prevMode) setSelectedItems([]);
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
    <Popup>
      <Popup.Trigger>
        <View
          pressStyle={{ scale: 0.9, opacity: 0.5 }}
          right="$3"
          p={'$1.5'}>
          <CircleEllipsis />
        </View>
      </Popup.Trigger>
      <Popup.Content>
        <YGroup
          separator={<Separator />}
          bordered
          backgrounded
          shadowRadius={'$3'}
          shadowOpacity={0.5}
          disabled={!Boolean(trips.length)}>
          {renderListItems()}
        </YGroup>
      </Popup.Content>
    </Popup>
  );
};
