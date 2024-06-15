import { FlashList } from '@shopify/flash-list';
import { CharacteristicsListItem } from './characteristics-list-item/characteristics-list-item';
import { useCharacteristicsFacade } from '../facades';
import { View, getTokens } from 'tamagui';
import { CharacteristicsListHeader } from './characteristics-list-header/characteristics-list-header';

export const CharacteristicsList = () => {
  const { characteristics } = useCharacteristicsFacade();
  const tamaguiSpace = getTokens().space.$3.val;

  return (
    <FlashList
      data={characteristics}
      contentContainerStyle={{
        padding: tamaguiSpace,
      }}
      ListHeaderComponent={<CharacteristicsListHeader />}
      ItemSeparatorComponent={() => <View height={tamaguiSpace} />}
      renderItem={({ item }) => <CharacteristicsListItem item={item} />}
      keyExtractor={item => item.id.toString()}
      estimatedItemSize={72}
    />
  );
};
