import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorage} from 'react-native';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from './permissionAccess';
import axios from 'axios';
import pokemon_alolan_variants from './pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from './pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from './pokemonData/pokemon_hisuian_variants';
import pokemon_mega_images from './pokemonData/pokemon_mega_images';

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

export const storeData = async (key, value) => {
  try {
    const serializeData = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializeData);
    console.log(
      `themValVALUE Data stored successfully for key 1: ${key} - ${value}`,
    );
  } catch (error) {
    console.error(`themValVALUE Error storing data for key ${key}: ${error}`);
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`themValVALUE Retrieved data for key 1 ${key}: ${value}`);
      return value;
    } else {
      console.log(`themValVALUE No data found for key: ${key}`);
    }
  } catch (error) {
    console.error(
      `themValVALUE Error retrieving data for key ${key}: ${error}`,
    );
  }
};

export const individualPokemonImageMapping = (displayData, pokeId, name) => {
  const pokeSubstring = 'pokemon_icons';
  const substring1 = '_shiny.png'; // Shiny - DONE
  const substring2 = '.s.icon.png'; // Shiny - DONE
  const substring3 = 'fHISUIAN.icon.png'; // HISUIAN - DONE
  const substring4 = 'fHISUIAN.s.icon.png'; // HISUIAN Shiny
  const substring5 = '_31.png'; // GALARIAN - DONE
  const substring6 = '_31_shiny.png'; // Shiny Glarian
  const substring7 = '_61.png'; // ALOLAN - DONE
  const substring8 = '_61_shiny.png'; // Shiny Alolan
  const substring9 = '_51.png'; // Mega and Mega X - DONE
  const substring10 = '_52.png'; // Mega Y - DONE
  const substring11 = 'fMEGA.icon.png'; // Mega and Mega X - DONE
  const substring12 = 'fMEGA.s.icon.png'; //Mega Shiny
  const substring13 = '_51_shiny.png'; //Mega Shiny
  const substring14 = '_52_shiny.png'; //Mega Shiny

  const modalImages = displayData;
  const pokemonName = name?.replace('Mega ', '').toLowerCase();

  let pushedImage;
  if (modalImages?.includes(substring9) || modalImages?.includes(substring11)) {
    if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
      pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega-x.jpg`;
      return pushedImage;
    } else {
      pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega.jpg`;
      console.log('MEGA BOYS', pushedImage);
      return pushedImage;
    }
  } else if (modalImages?.includes(substring10)) {
    pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega-y.jpg`;
    return pushedImage;
  } else if (
    modalImages?.includes(substring13) ||
    modalImages?.includes(substring12)
  ) {
    if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
      const pokeString = pokemonName + 'X';
      pushedImage = pokemon_mega_images[pokeString];
      return pushedImage;
    } else {
      const pokeString = pokemonName;
      pushedImage = pokemon_mega_images[pokeString];
      return pushedImage;
    }
  } else if (modalImages?.includes(substring14)) {
    const pokeString = pokemonName + 'Y';
    pushedImage = pokemon_mega_images[pokeString];
    return pushedImage;
  } else if (modalImages?.includes(substring3)) {
    pushedImage = pokemon_hisuian_variants[pokeId];
    return pushedImage;
  } else if (modalImages?.includes(substring5)) {
    pushedImage = pokemon_galarian_variants[pokeId];
    return pushedImage;
  } else if (modalImages?.includes(substring7)) {
    pushedImage = pokemon_alolan_variants[pokeId];
    return pushedImage;
  } else if (modalImages?.includes(substring4)) {
    const idString = pokeId + 's';
    pushedImage = pokemon_hisuian_variants[idString];
    return pushedImage;
  } else if (modalImages?.includes(substring6)) {
    const idString = pokeId + 's';
    pushedImage = pokemon_galarian_variants[idString];
    return pushedImage;
  } else if (modalImages?.includes(substring8)) {
    const idString = pokeId + 's';
    pushedImage = pokemon_alolan_variants[idString];
    return pushedImage;
  } else if (modalImages?.includes(substring1)) {
    const ret = modalImages;
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
  } else if (modalImages?.includes(substring2)) {
    const ret = modalImages;
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
    return pushedImage;
  } else {
    const tempImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

    // TODO: TRY TO GET THIS DONE IF POSSIBLE - Try using axios or checkImageExists(url) to get this done

    const ret = modalImages;
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
      pushedImage = modalImages;
      return pushedImage;
    } else if (pokeId.toString() === '201') {
      pushedImage = modalImages;
      return pushedImage;
    } else {
      pushedImage = tempImage;
      return pushedImage;
    }
    /** NOTE:
     * Why length > 6 is used as condition above because when the image string is split, it comes to a number of 3 digits max.
     * Even so some strings may have _00 and _11 attached to it making its length 6 so.
     */
  }
};
