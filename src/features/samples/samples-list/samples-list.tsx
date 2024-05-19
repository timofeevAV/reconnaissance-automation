import { useSamplesFacade } from '@/features/samples/facades';
import { FlashList } from '@shopify/flash-list';
import { SamplesListItem } from './samples-list-item/samples-list-item';
import { getTokens } from 'tamagui';

export const SamplesList = () => {
  const { samples } = useSamplesFacade();
  const tamaguiSpace = getTokens().space.$3.val;

  return (
    <FlashList
      data={samples}
      contentContainerStyle={{
        padding: tamaguiSpace,
      }}
      renderItem={({ item }) => <SamplesListItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};
