import { CircleEllipsis, Locate } from '@tamagui/lucide-icons';
import {
  Button,
  Fieldset,
  H5,
  Input,
  Label,
  ListItem,
  TextArea,
  View,
  XStack,
  YStack,
  debounce,
  getTokens,
  useDebounce,
} from 'tamagui';
import * as Location from 'expo-location';
import {
  deleteAllPointPhotos,
  updatePointDetails,
  uploadPointPhotos,
} from '../actions';
import { useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { useAuthFacade } from '@/features/users';
import { FlashList } from '@shopify/flash-list';
import { Dimensions } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { PointsListItemProps } from './types';
import { Point } from '../types';
import { Popup } from '@/features/ui';

export const PointsListItem = ({
  pointNumber,
  point,
  setFullScreenImage,
  deletePoint,
}: PointsListItemProps) => {
  const [pointDetails, setPointDetails] = useImmer(point);
  const pointId = useRef(point.id);
  const pointLatitude = useRef(point.latitude);
  const pointLongitude = useRef(point.longitude);
  if (
    point.id !== pointId.current ||
    point.latitude !== pointLatitude.current ||
    point.longitude !== pointLongitude.current
  ) {
    pointId.current = point.id;
    pointLatitude.current = point.latitude;
    pointLongitude.current = point.longitude;
    setPointDetails(point);
  }
  const { accessToken } = useAuthFacade();
  const space = getTokens().space.$4.val;
  const imgWidth = (Dimensions.get('screen').width - space) / 3;
  const imgHeight = imgWidth;

  const isLatitude = (num: any) => {
    if (!isFinite(num) || Math.abs(num) > 90) {
      return false;
    }

    const decimalPart = (num.toString().split('.')[1] || '').length;
    return decimalPart <= 6;
  };

  const isLongitude = (num: any) => {
    if (!isFinite(num) || Math.abs(num) > 180) {
      return false;
    }

    const decimalPart = (num.toString().split('.')[1] || '').length;
    return decimalPart <= 6;
  };

  const handleLatitudeChange = (value: string) => {
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue) && isLatitude(value)) {
      setPointDetails(draft => {
        draft.latitude = parsedValue;
      });
      patchWithDelay({ latitude: parsedValue });
    }
  };

  const handleLongitudeChange = (value: string) => {
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue) && isLongitude(value)) {
      setPointDetails(draft => {
        draft.longitude = parsedValue;
      });
      patchWithDelay({ longitude: parsedValue });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setPointDetails(draft => {
      draft.description = value;
    });
    patchWithDelay({ description: value });
  };

  const patchWithDelay = useCallback(
    debounce((fields: Partial<Point>) => {
      updatePointDetails(point.id, fields, accessToken);
    }, 350),
    [],
  );

  const getCurrentCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });

    if (location && location.coords) {
      const coords = {
        latitude: parseFloat(location.coords.latitude.toFixed(6)),
        longitude: parseFloat(location.coords.longitude.toFixed(6)),
      };

      updatePointDetails(point.id, coords, accessToken).then(() => {
        setPointDetails(draft => {
          draft.latitude = coords.latitude;
          draft.longitude = coords.longitude;
        });
      });
    }
  };

  const uploadPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (result.assets) {
      const formData = new FormData();
      result.assets.map(asset => {
        formData.append(
          'photo',
          JSON.parse(
            JSON.stringify({
              uri: asset.uri,
              type: 'image/jpeg',
              name: asset.uri.split('/').pop(),
            }),
          ),
        );
      });

      uploadPointPhotos(point.id, formData, accessToken).then(data => {
        setPointDetails(draft => {
          draft.photos = [...draft.photos, ...data];
        });
      });
    }
  };

  return (
    <>
      <Popup>
        <Popup.Trigger>
          <CircleEllipsis
            position="absolute"
            right={'$5'}
            top={'$3'}
            zIndex={9999}
          />
        </Popup.Trigger>
        <Popup.Content>
          <Button
            theme={'red'}
            onPress={() => deletePoint(point.id)}>
            Удалить
          </Button>
        </Popup.Content>
      </Popup>
      <ListItem
        backgrounded
        borderWidth={'$1'}
        borderColor={'$borderColor'}
        borderRadius={'$10'}
        title={
          <H5
            textAlign="center"
            fontWeight={'bold'}>
            {pointNumber + 1}
          </H5>
        }>
        <YStack gap="$3">
          <H5 fontWeight={'bold'}>Координаты</H5>
          <XStack gap={'$3'}>
            <Fieldset flex={1}>
              <Label htmlFor={`longitude-${pointNumber}`}>Долгота</Label>
              <Input
                id={`longitude-${pointNumber}`}
                value={pointDetails.longitude?.toString()}
                onChangeText={handleLongitudeChange}
              />
            </Fieldset>
            <Fieldset flex={1}>
              <Label htmlFor={`latitude-${pointNumber}`}>Широта</Label>
              <XStack
                alignItems="center"
                gap={'$3'}>
                <Input
                  id={`latitude-${pointNumber}`}
                  flex={1}
                  value={pointDetails.latitude?.toString()}
                  onChangeText={handleLatitudeChange}
                />
                <View
                  pressStyle={{ scale: 0.9, opacity: 0.5 }}
                  borderRadius={'$true'}
                  borderWidth
                  p="$2"
                  onPress={getCurrentCoordinates}>
                  <Locate />
                </View>
              </XStack>
            </Fieldset>
          </XStack>
          <H5 fontWeight={'bold'}>Описание</H5>
          <TextArea
            h={'$12'}
            value={pointDetails.description!}
            onChangeText={handleDescriptionChange}
          />
          <H5 fontWeight={'bold'}>Фотографии</H5>
          <FlashList
            data={pointDetails.photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                w={imgWidth}
                h={imgHeight}
                onLongPress={() => {
                  setFullScreenImage(item);
                }}>
                <Image
                  source={{ uri: item.photo || '' }}
                  style={{ width: '100%', height: '100%' }}
                  placeholder={item?.blurhash}
                  contentFit="cover"
                />
              </View>
            )}
            ListFooterComponent={
              <XStack
                gap={'$3'}
                justifyContent="center"
                mt={Boolean(pointDetails.photos.length) ? '$3' : undefined}>
                <Button
                  theme={'red'}
                  disabled={!Boolean(pointDetails.photos.length)}
                  onPress={() =>
                    deleteAllPointPhotos(point.id, accessToken).then(() => {
                      setPointDetails(draft => {
                        draft.photos = [];
                      });
                    })
                  }>
                  Очистить
                </Button>
                <Button
                  theme={'active'}
                  onPress={uploadPhotos}>
                  Загрузить
                </Button>
              </XStack>
            }
            numColumns={3}
            extraData={[pointDetails.photos]}
            estimatedItemSize={Dimensions.get('screen').width / 3}
          />
          <H5 fontWeight={'bold'}>Пробы</H5>
        </YStack>
      </ListItem>
    </>
  );
};
