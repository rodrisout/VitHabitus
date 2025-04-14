import * as SecureStore from 'expo-secure-store';

export const saveSession = async (uid: string) => {
  await SecureStore.setItemAsync('userUid', uid);
};

export const getSession = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('userUid');
};

export const clearSession = async () => {
  await SecureStore.deleteItemAsync('userUid');
};
