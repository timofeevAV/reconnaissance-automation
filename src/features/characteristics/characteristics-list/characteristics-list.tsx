import { FlashList } from '@shopify/flash-list';
import { CharacteristicsListItem } from './characteristics-list-item/characteristics-list-item';
import { useCharacteristicsFacade } from '../facades';
import { getTokens } from 'tamagui';

export const CharacteristicsList = () => {
  const { characteristics } = useCharacteristicsFacade();
  const tamaguiSpace = getTokens().space.$3.val;

  return (
    <FlashList
      data={characteristics}
      contentContainerStyle={{
        padding: tamaguiSpace,
      }}
      renderItem={({ item }) => <CharacteristicsListItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};
