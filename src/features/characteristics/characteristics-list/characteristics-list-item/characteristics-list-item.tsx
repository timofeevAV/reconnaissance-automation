import { ListItem } from 'tamagui';
import { Characteristic } from '../../types';
import { useAuthFacade } from '@/features/users';
import { useCharacteristicsFacade } from '../../facades';
import { Delete } from '@tamagui/lucide-icons';

export const CharacteristicsListItem = ({ item }: { item: Characteristic }) => {
  const { accessToken } = useAuthFacade();
  const { deleteCharacteristic } = useCharacteristicsFacade();

  return (
    <ListItem
      title={item.name}
      subTitle={item.expression}
      pressTheme
      backgrounded
      bordered
      borderRadius={'$3'}
      position="relative">
      <Delete
        position="absolute"
        right={0}
        onPress={() => deleteCharacteristic(item.id, accessToken)}
      />
    </ListItem>
  );
};
