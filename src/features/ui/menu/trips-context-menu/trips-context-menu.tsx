import React, { useMemo, useState } from 'react';
import { Popover, Separator, Text, YGroup, ListItem } from 'tamagui';
import {
  CircleEllipsis,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Check,
} from '@tamagui/lucide-icons';
import { TripsContextMenuProps } from './types';

enum SortField {
  NAME,
  CREATED_DATE,
  MODIFIED_DATE,
}

enum SortDirection {
  ASC,
  DESC,
}

interface SortOption {
  field: SortField;
  direction: SortDirection;
}

export const TripsContextMenu = ({
  selectMode,
  popoverOpen,
  setPopoverOpen,
  setSelectMode,
  setSelectedItems,
}: TripsContextMenuProps) => {
  const [sort, setSort] = useState<SortOption>({
    field: SortField.NAME,
    direction: SortDirection.ASC,
  });

  const togglePopover = () => setPopoverOpen(prevState => !prevState);

  const toggleSelectMode = () => {
    setSelectMode(prevMode => {
      if (prevMode) setSelectedItems([]);
      else setPopoverOpen(false);
      return !prevMode;
    });
  };

  const handleSortChange = (field: SortField) => {
    setSort(prevSort => ({
      field,
      direction:
        prevSort.field === field && prevSort.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    }));
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
        onPress: () => handleSortChange(SortField.NAME),
        icon: sort.field === SortField.NAME ? Check : undefined,
        iconAfter:
          sort.field === SortField.NAME
            ? sort.direction === SortDirection.ASC
              ? ChevronUp
              : ChevronDown
            : undefined,
        key: 'sort-by-name',
        // key: `sort-by-name${
        //   sort.field === SortField.NAME ? sort.direction : ""
        // }`,
      },
      {
        label: 'Сортировка по дате создания',
        onPress: () => handleSortChange(SortField.CREATED_DATE),
        icon: sort.field === SortField.CREATED_DATE ? Check : undefined,
        iconAfter:
          sort.field === SortField.CREATED_DATE
            ? sort.direction === SortDirection.ASC
              ? ChevronUp
              : ChevronDown
            : undefined,
        key: `sort-by-created-at`,
        // key: `sort-by-created-at${
        //   sort.field === SortField.CREATED_DATE ? sort.direction : ""
        // }`,
      },
      {
        label: 'Сортировка по дате изменения',
        onPress: () => handleSortChange(SortField.MODIFIED_DATE),
        icon: sort.field === SortField.MODIFIED_DATE ? Check : undefined,
        iconAfter:
          sort.field === SortField.MODIFIED_DATE
            ? sort.direction === SortDirection.ASC
              ? ChevronUp
              : ChevronDown
            : undefined,
        key: `sort-by-updated-at`,
        // key: `sort-by-updated-at${
        //   sort.field === SortField.MODIFIED_DATE ? sort.direction : ""
        // }`,
      },
    ];

    return listItems.map(item => (
      <YGroup.Item key={item.key}>
        <ListItem
          onPress={item.onPress}
          icon={item.icon}
          iconAfter={item.iconAfter}>
          {item.label}
        </ListItem>
      </YGroup.Item>
    ));
  };

  const headerRightContent = useMemo(() => {
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
      <Popover
        open={popoverOpen}
        onOpenChange={togglePopover}
        allowFlip
        key={`${sort.field}-${sort.direction}`}>
        <Popover.Trigger
          m="$2"
          pressStyle={{ opacity: 0.5, scale: 0.9 }}>
          <CircleEllipsis />
        </Popover.Trigger>
        <Popover.Content
          bordered
          elevate
          p={'$0'}>
          <YGroup separator={<Separator />}>{renderListItems()}</YGroup>
        </Popover.Content>
      </Popover>
    );
  }, [popoverOpen, selectMode, sort]);

  return headerRightContent;
};
