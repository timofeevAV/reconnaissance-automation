import { Download } from '@tamagui/lucide-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { Alert, Modal, Platform } from 'react-native';
import { Circle, H4, View } from 'tamagui';
import { DownloadTripLogButtonProps } from './types';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

export const DownloadTripLogButton = ({
  tripName,
  tripId,
}: DownloadTripLogButtonProps) => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const downloadTripLog = async () => {
    setModalVisible(true);

    const callback = (downloadProgress: {
      totalBytesWritten: number;
      totalBytesExpectedToWrite: number;
    }) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;

      setDownloadProgress(parseFloat(progress.toFixed(2)) * 100);
    };

    const downloadInstance = FileSystem.createDownloadResumable(
      `${BASE_URL}/trip/${tripId}/download/`,
      FileSystem.documentDirectory + `ЖР_${tripName}_${tripId}.docx`,
      {},
      callback,
    );

    try {
      const result = await downloadInstance.downloadAsync();
      await Sharing.shareAsync(result.uri);
    } catch (error) {
      console.error('Ошибка при скачивании журнала рекогносцировки:', error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <View
        pressStyle={{ scale: 0.9, opacity: 0.5 }}
        onPress={() => {
          Alert.alert(
            'Журнал рекогносцировки',
            'Скачать журнал рекогносцировки?',
            [
              {
                text: 'Отмена',
                style: 'cancel',
              },
              {
                text: 'Да',
                onPress: () => downloadTripLog(),
              },
            ],
          );
        }}>
        <Download />
      </View>
      <Modal
        visible={isModalVisible}
        transparent>
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0,0,0,0.7)">
          <View
            width={200}
            gap={'$3'}
            jc={'center'}
            ai={'center'}
            themeInverse>
            <Circle
              width={downloadProgress + '%'}
              h={'$1'}
              backgrounded
            />
            <H4>{downloadProgress + '%'}</H4>
          </View>
        </View>
      </Modal>
    </>
  );
};
