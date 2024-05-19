import React, {
  useState,
  ReactNode,
  ReactElement,
  cloneElement,
  FC,
} from 'react';
import { Modal, Dimensions, GestureResponderEvent } from 'react-native';
import { View } from 'tamagui';

interface PopupProps {
  children: ReactNode;
}

interface PopupTriggerProps {
  children: ReactElement;
  openMenu?: (e: GestureResponderEvent) => void;
}

interface PopupContentProps {
  children: ReactNode;
  menuPosition?: { top: number; right: number };
  closeMenu?: () => void;
}

const Popup: FC<PopupProps> & {
  Trigger: FC<PopupTriggerProps>;
  Content: FC<PopupContentProps>;
} = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const openMenu = (e: GestureResponderEvent) => {
    setMenuPosition({
      top: e.nativeEvent.pageY,
      right: Dimensions.get('window').width - e.nativeEvent.pageX,
    });
    setMenuVisible(true);
  };

  const closeMenu = (): void => {
    setMenuVisible(false);
  };

  const trigger = React.Children.toArray(children).find(
    child =>
      React.isValidElement(child) &&
      (child as ReactElement).type === Popup.Trigger,
  );
  const content = React.Children.toArray(children).find(
    child =>
      React.isValidElement(child) &&
      (child as ReactElement).type === Popup.Content,
  );

  return (
    <>
      {trigger &&
        React.isValidElement(trigger) &&
        cloneElement(trigger, { openMenu })}
      <Modal
        transparent
        visible={menuVisible}
        onRequestClose={closeMenu}
        supportedOrientations={['portrait', 'landscape']}>
        <View
          onTouchEnd={closeMenu}
          flex={1}>
          {content &&
            React.isValidElement(content) &&
            cloneElement(content, { menuPosition })}
        </View>
      </Modal>
    </>
  );
};

const PopupTrigger: FC<PopupTriggerProps> = ({ children, openMenu }) => {
  return React.isValidElement(children)
    ? cloneElement(children, { onPress: openMenu })
    : null;
};

const PopupContent: FC<PopupContentProps> = ({ children, menuPosition }) => {
  return (
    <View
      position="absolute"
      top={menuPosition?.top}
      right={menuPosition?.right}
      shadowRadius={3}
      shadowOpacity={0.5}>
      {children}
    </View>
  );
};

PopupTrigger.displayName = 'Popup.Trigger';
PopupContent.displayName = 'Popup.Content';

Popup.Trigger = React.memo(PopupTrigger);
Popup.Content = React.memo(PopupContent);

Popup.displayName = 'Popup';

export { Popup };
