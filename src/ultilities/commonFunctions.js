import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from './permissionAccess';

export const captureImage = async (type, setFilePath) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.warn('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        console.warn('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        console.warn('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        console.warn(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  }
};

export const chooseFile = (type, setFilePath) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  launchImageLibrary(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.warn('User cancelled camera picker');
      return;
    } else if (response.errorCode === 'camera_unavailable') {
      console.warn('Camera not available on device');
      return;
    } else if (response.errorCode === 'permission') {
      console.warn('Permission not satisfied');
      return;
    } else if (response.errorCode === 'others') {
      console.warn(response.errorMessage);
      return;
    }
    console.log('base64 -> ', response.base64);
    console.log('uri -> ', response.uri);
    console.log('width -> ', response.width);
    console.log('height -> ', response.height);
    console.log('fileSize -> ', response.fileSize);
    console.log('type -> ', response.type);
    console.log('fileName -> ', response.fileName);
    setFilePath(response);
  });
};

export const toCamelCase = text => {
  const tempString = text;
  const str = tempString?.split(' ');
  let finalString = '';

  let arrayOfStrings = str.map(data => {
    const restOfTheString = data.slice(1);
    const firstLetter = data.slice(0, 1).toUpperCase();
    const fullString = firstLetter.concat(restOfTheString);
    return fullString;
  });

  arrayOfStrings.map(data => {
    finalString = finalString + data + ' ';
  });

  return finalString.slice(0, -1);
};
