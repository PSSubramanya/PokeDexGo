import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import imagePaths from '../../constants/imagePaths.js';
import pokemon_alolan_variants from '../../ultilities/pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from '../../ultilities/pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from '../../ultilities/pokemonData/pokemon_hisuian_variants';
import styles from './styles.js';

const EggDetailsScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {loadData} = params;

  const eggImages = [
    imagePaths.twoKmEggIcon,
    imagePaths.fiveKmEggIcon,
    imagePaths.fiveKmEggIcon,
    imagePaths.sevenKmEggIcon,
    imagePaths.tenKmEggIcon,
    imagePaths.tenKmEggIcon,
    imagePaths.twelveKmEggIcon,
    ,
  ];

  const [indexVal, setIndexVal] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setDisplayData(loadData[indexVal]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexVal]);

  console.log('EGG DATA', displayData);

  const pokeImageMappingFunction = () => {
    const substring1 = '_shiny.png'; // Shiny - DONE
    const substring2 = '.s.icon.png'; // Shiny - DONE
    const substring3 = 'fHISUIAN.icon.png'; // HISUIAN - DONE
    const substring4 = 'fHISUIAN.s.icon.png'; // HISUIAN Shiny
    const substring5 = '_31.png'; // GALARIAN - DONE
    const substring6 = '_31_shiny.png'; // Shiny Glarian
    const substring7 = '_61.png'; // ALOLAN - DONE
    const substring8 = '_61_shiny.png'; // Shiny Alolan

    const modalImages = displayData?.imgSrc;

    console.log('MEGA data', modalImages);

    let displayableModalImages = [];

    modalImages?.map((data, idx) => {
      let pushedImage;
      if (data?.includes(substring3)) {
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
        const finalString = newStr2.replace('pm', '');

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

  const renderGridView = ({item, index}) => {
    return (
      <View>
        <View style={styles.gridBorderStyle}>
          <Image
            source={{uri: item}}
            height={1}
            width={1}
            resizeMode={'contain'}
            style={styles.gridImageStyle}
          />
        </View>
        <Text style={styles.pokemonNames}>
          {displayData?.pokemonName[index]}
        </Text>
      </View>
    );
  };

  const gridViewDisplay = modalImages => {
    return (
      <View style={styles.gridViewDisplay}>
        <FlatList
          data={modalImages}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderGridView}
        />
      </View>
    );
  };

  const dispImgs = pokeImageMappingFunction();

  console.log('DISPL IMGS', dispImgs);

  return (
    <View style={styles.mainBody}>
      <Image
        source={eggImages[indexVal]}
        height={1}
        width={1}
        resizeMode={'contain'}
        style={styles.eggIcon}
      />
      <View style={styles.filterSection}>
        <TouchableOpacity
          onPress={() => {
            const tempIdx = indexVal;
            if (tempIdx > 0) {
              setIndexVal(tempIdx - 1);
            }
          }}
          disabled={indexVal > 0 ? false : true}>
          <Image
            source={imagePaths.leftChevronIcon}
            height={1}
            width={1}
            style={[
              styles.chevronIcon,
              {
                opacity: indexVal > 0 ? 1 : 0.5,
              },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.eggKmCategory}>{displayData?.Distance}</Text>
        <TouchableOpacity
          onPress={() => {
            const tempIdx = indexVal;
            if (tempIdx < loadData.length - 1) {
              setIndexVal(tempIdx + 1);
            }
          }}
          disabled={indexVal < loadData?.length - 1 ? false : true}>
          <Image
            source={imagePaths.rightChevronIcon}
            height={1}
            width={1}
            style={[
              styles.chevronIcon,
              {
                opacity: indexVal < loadData?.length - 1 ? 1 : 0.5,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {gridViewDisplay(dispImgs)}
      </ScrollView>
    </View>
  );
};
export default EggDetailsScreen;
