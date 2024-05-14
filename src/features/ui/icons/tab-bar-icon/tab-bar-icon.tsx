import React from 'react';
import { TabBarIconProps } from './types/tab-bar-icon-props';

export const TabBarIcon = ({ Icon, focused, ...props }: TabBarIconProps) => {
  return (
    <Icon
      w={24}
      h={24}
      color={focused ? '$blue11' : undefined}
    />
  );
};
