import { View } from 'tamagui';
import { Image } from 'expo-image';

export const FullScreenImage = ({ fullScreenImage, setFullScreenImage }) => {
  if (!fullScreenImage) return null;

  return (
    <View
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      onPress={() => setFullScreenImage(null)}>
      <View
        flex={1}
        jc="center"
        ai="center">
        <Image
          source={{ uri: fullScreenImage.img.uri }}
          style={{ width: '100%', height: '100%' }}
          placeholder={fullScreenImage?.img.blurhash}
          contentFit="contain"
        />
      </View>
    </View>
  );
};
