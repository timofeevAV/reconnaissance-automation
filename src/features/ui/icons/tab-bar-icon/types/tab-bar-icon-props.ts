import type { IconProps } from '@tamagui/helpers-icon';

export interface TabBarIconProps extends IconProps {
  Icon: React.NamedExoticComponent<IconProps>;
  focused: boolean;
}
