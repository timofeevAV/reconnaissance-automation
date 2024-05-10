import { AlertCircle } from '@tamagui/lucide-icons';
import { Popover, Text } from 'tamagui';
import { ErrorTooltipProps } from '../base-tooltip-props';

export const ErrorTooltip = ({ text, ...props }: ErrorTooltipProps) => {
  return (
    <Popover {...props}>
      <Popover.Trigger>
        <AlertCircle />
      </Popover.Trigger>
      <Popover.Content
        bordered
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        theme={'red'}>
        <Text>{text}</Text>
      </Popover.Content>
    </Popover>
  );
};
