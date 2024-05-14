import { Search } from '@tamagui/lucide-icons';
import { Input, XStack, XStackProps } from 'tamagui';

export const InputWithIcon = ({
  value,
  onChangeText,
  ...props
}: XStackProps & {
  value?: string;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <XStack
      borderWidth={'$1'}
      borderColor={'$borderColor'}
      borderRadius={'$5'}
      p={'$2'}
      {...props}>
      <Search scale={0.7} />
      <Input
        unstyled
        flex={1}
        color={'$color'}
        value={value}
        onChangeText={onChangeText}
      />
    </XStack>
  );
};
