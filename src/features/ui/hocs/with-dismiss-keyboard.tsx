import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export const withDismissKeyboard = <P extends object>(
  Comp: React.ComponentType<P>,
) => {
  return ({ children, ...props }: P & { children?: ReactNode }) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}>
      <Comp {...(props as P)}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
