import { useSamplesFacade } from '@/features/samples/facades';
import { FlashList } from '@shopify/flash-list';
import { SamplesListItem } from './samples-list-item/samples-list-item';
import { View, getTokens } from 'tamagui';
import { SamplesListHeader } from './samples-list-header/samples-list-header';

export const SamplesList = () => {
  const { samples } = useSamplesFacade();
  const tamaguiSpace = getTokens().space.$3.val;

  return (
    <FlashList
      data={samples}
      contentContainerStyle={{
        padding: tamaguiSpace,
      }}
      ListHeaderComponent={SamplesListHeader}
      ItemSeparatorComponent={() => <View height={tamaguiSpace} />}
      renderItem={({ item }) => <SamplesListItem item={item} />}
      keyExtractor={item => item.id.toString()}
      estimatedItemSize={150}
    />
  );
};
