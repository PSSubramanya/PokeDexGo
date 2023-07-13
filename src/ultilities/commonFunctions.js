import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from './permissionAccess';
import axios from 'axios';
import pokemon_alolan_variants from './pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from './pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from './pokemonData/pokemon_hisuian_variants';

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

export function checkImageExists(path) {
  return axios
    .get(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

/**
 * NOTE: This below Function is to fetch pokeImages from PokeApi by passing the url given from the API that we are loading in the app
 */

export const pokeImageMappingFunction = displayData => {
  const pokeSubstring = 'pokemon_icons';
  const substring1 = '_shiny.png'; // Shiny - DONE
  const substring2 = '.s.icon.png'; // Shiny - DONE
  const substring3 = 'fHISUIAN.icon.png'; // HISUIAN - DONE
  const substring4 = 'fHISUIAN.s.icon.png'; // HISUIAN Shiny
  const substring5 = '_31.png'; // GALARIAN - DONE
  const substring6 = '_31_shiny.png'; // Shiny Glarian
  const substring7 = '_61.png'; // ALOLAN - DONE
  const substring8 = '_61_shiny.png'; // Shiny Alolan

  const modalImages = displayData?.imgSrc;

  let displayableModalImages = [];

  modalImages?.map((data, idx) => {
    let pushedImage;
    if (!data?.includes(pokeSubstring)) {
      pushedImage = data;
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring3)) {
      pushedImage = pokemon_hisuian_variants[displayData?.pokeId?.[idx]];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring5)) {
      pushedImage = pokemon_galarian_variants[displayData?.pokeId?.[idx]];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring7)) {
      pushedImage = pokemon_alolan_variants[displayData?.pokeId?.[idx]];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring4)) {
      const idString = displayData?.pokeId?.[idx] + 's';
      pushedImage = pokemon_hisuian_variants[idString];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring6)) {
      const idString = displayData?.pokeId?.[idx] + 's';
      pushedImage = pokemon_galarian_variants[idString];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring8)) {
      const idString = displayData?.pokeId?.[idx] + 's';
      pushedImage = pokemon_alolan_variants[idString];
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring1)) {
      const ret = data;
      const newStr1 = ret.replace(
        'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_',
        '',
      );
      const newStr2 = newStr1.replace('_shiny.png', '');
      const newstr3 = newStr2.substr(-3);
      const finalString = newStr2.replace(newstr3, '');

      // eslint-disable-next-line radix
      pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
        finalString,
      )}.png`;
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else if (data?.includes(substring2)) {
      const ret = data;
      const newStr1 = ret.replace(
        'https://leekduck.com/assets/img/pokemon_icons/',
        '',
      );
      const newStr2 = newStr1.replace('.s.icon.png', '');
      const finalString = newStr2?.replace('pm', '');

      // eslint-disable-next-line radix
      pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
        finalString,
      )}.png`;
      displayableModalImages = [...displayableModalImages, pushedImage];
    } else {
      const tempImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${displayData?.pokeId?.[idx]}.png`;

      // TODO: TRY TO GET THIS DONE IF POSSIBLE - Try using axios or checkImageExists(url) to get this done

      const ret = data;
      const newStr1 = ret.replace(
        'https://leekduck.com/assets/img/pokemon_icons/',
        '',
      );

      let newStr2;

      if (newStr1.includes('pm')) {
        newStr2 = newStr1.replace('pm', '');
      } else if (newStr1.includes('pokemon_icon_')) {
        newStr2 = newStr1.replace('pokemon_icon_', '');
      }

      let newStr3;

      if (newStr2.includes('.icon.png')) {
        newStr3 = newStr2.replace('.icon.png', '');
      } else if (newStr2.includes('.png')) {
        newStr3 = newStr2.replace('.png', '');
      }

      const finalString = newStr3;
      if (finalString?.length > 6) {
        pushedImage = data;
      } else {
        pushedImage = tempImage;
      }
      /** NOTE:
       * Why length > 6 is used as condition above because when the image string is split, it comes to a number of 3 digits max.
       * Even so some strings may have _00 and _11 attached to it making its length 6 so.
       */

      displayableModalImages = [...displayableModalImages, pushedImage];
    }
  });
  return displayableModalImages;
};
