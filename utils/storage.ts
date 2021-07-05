import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = (name: string) => {
  return new Promise(resolve => {
    AsyncStorage.getItem(name, (err, result) => {
      if (result) {
        try {
          resolve(JSON.parse(result));
        } catch (e) {
          // console.log(e)
          resolve('');
        }
      }
      resolve(result || '');
    });
  });
};

export const setStorage = (name: string, data: string | Object) => {
  return new Promise(resolve => {
    AsyncStorage.setItem(name, JSON.stringify(data), e => {
      resolve(e);
    });
  });
};
