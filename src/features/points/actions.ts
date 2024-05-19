import axios from 'axios';
import { Platform } from 'react-native';
import { Point } from './types';

const BASE_URL =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_BASE_URL,
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
  }) + '/api';

export const fetchTripPoints = async (
  tripId: number,
  accessToken?: string | null,
  next?: string,
) => {
  try {
    const url = next ? next : `${BASE_URL}/trip-points/${tripId}/`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка получения точек путешествия');
  }
};

export const createTripPoint = async (
  tripId: number,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip-points/${tripId}/`,
      {},
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка создания новой точки путешествия');
  }
};

export const fetchPointDetails = async (
  pointId: number,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/point/${pointId}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка получения деталей точки');
  }
};

export const updatePointDetails = async (
  pointId: number,
  pointData: Partial<Point>,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/point/${pointId}/`,
      pointData,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка обновления деталей точки');
  }
};

export const deletePoint = async (
  pointId: number,
  accessToken?: string | null,
) => {
  try {
    await axios.delete(`${BASE_URL}/point/${pointId}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка удаления точки');
  }
};

export const fetchPointPhotos = async (
  pointId: number,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/point/${pointId}/photos/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка получения фотографий точки');
  }
};

export const uploadPointPhotos = async (
  pointId: number,
  photos,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/point/${pointId}/photos/`,
      photos,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка загрузки фотографий точки');
  }
};

export const fetchPhotoDetails = async (
  photoId: number,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/point-photo/${photoId}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка получения деталей фотографии');
  }
};

export const updatePhotoDetails = async (
  photoId: number,
  photoData,
  accessToken?: string | null,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/point-photo/${photoId}/`,
      photoData,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка обновления деталей фотографии');
  }
};

export const deletePhoto = async (
  photoId: number,
  accessToken?: string | null,
) => {
  try {
    await axios.delete(`${BASE_URL}/point-photo/${photoId}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка удаления фотографии');
  }
};

export const deleteAllPointPhotos = async (
  pointId: number,
  accessToken?: string | null,
) => {
  try {
    await axios.delete(`${BASE_URL}/point/${pointId}/delete-photos`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка удаления всех фотографий точки');
  }
};
