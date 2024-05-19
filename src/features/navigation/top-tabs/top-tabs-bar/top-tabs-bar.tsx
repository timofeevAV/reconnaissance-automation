import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack, Button } from 'tamagui';

export const TopTabsBar = ({ state, descriptors, navigation, position }) => {
  const insets = useSafeAreaInsets();
  return (
    <XStack
      pt={insets.top}
      jc="center"
      gap="$3"
      paddingHorizontal="$3">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <Button
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            flex={1}
            theme={isFocused ? 'active' : undefined}>
            {label}
          </Button>
        );
      })}
    </XStack>
  );
};
