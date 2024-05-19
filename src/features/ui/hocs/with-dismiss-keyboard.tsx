import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export const withDismissKeyboard = <P extends object>(
  Comp: React.ComponentType<P>,
) => {
  const WithDismissKeyboard = ({
    children,
    ...props
  }: P & { children?: ReactNode }) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}>
      <Comp {...(props as P)}>{children}</Comp>
    </TouchableWithoutFeedback>
  );

  WithDismissKeyboard.displayName = `withDismissKeyboard(${Comp.displayName || Comp.name})`;

  return WithDismissKeyboard;
};
