import { ListItem } from 'tamagui';
import { Characteristic } from '../../types';

export const CharacteristicsListItem = ({ item }: { item: Characteristic }) => {
  return (
    <ListItem
      title={item.name}
      subTitle={item.expression}
      pressTheme
      backgrounded
      bordered
    />
  );
};
