import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import { HeaderBackButtonProps } from './types';

export const HeaderBackButton = ({
  navigation,
  ...props
}: HeaderBackButtonProps) => {
  return props.canGoBack ? (
    <Button
      unstyled
      pressStyle={{ scale: 0.9 }}
      onPress={() => navigation.goBack()}>
      <ChevronLeft scale={1.2} />
    </Button>
  ) : null;
};
