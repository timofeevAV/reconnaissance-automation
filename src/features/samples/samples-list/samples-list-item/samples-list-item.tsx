import { ListItem } from 'tamagui';
import { Sample } from '../../types';

export const SamplesListItem = ({ item }: { item: Sample }) => {
  return (
    <ListItem
      title={item.name}
      pressTheme
      backgrounded
      bordered
    />
  );
};
