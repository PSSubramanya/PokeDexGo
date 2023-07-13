import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import imagePaths from '../../constants/imagePaths.js';
import pokemon_alolan_variants from '../../ultilities/pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from '../../ultilities/pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from '../../ultilities/pokemonData/pokemon_hisuian_variants';
import styles from './styles.js';
import {horizontalScale} from '../../ultilities/scale';
import colors from '../../constants/colors.js';
// import CustomCarousalSlider from '../../components/CustomCarousalSlider/CustomCarousalSlider.js';

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
  ];

  const eggImagesObj = {
    '2 km Eggs ': imagePaths.twoKmEggIcon,
    '5 km Eggs ': imagePaths.fiveKmEggIcon,
    '5 km Eggs (Adventure Sync Rewards)': imagePaths.fiveKmEggIcon,
    '7 km Eggs ': imagePaths.sevenKmEggIcon,
    '10 km Eggs ': imagePaths.tenKmEggIcon,
    '10 km Eggs (Adventure Sync Rewards)': imagePaths.tenKmEggIcon,
    '12 km Eggs ': imagePaths.twelveKmEggIcon,
  };

  const carousalSliderRef = React.useRef(null);

  const [indexVal, setIndexVal] = useState(0);
  const [loader, setLoader] = useState(true);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setLoader(true);
    setDisplayData(loadData[indexVal]);
    // setDisplayData(loadData[1]);
    setLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexVal]);

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
          {displayData?.shiny?.[index] ? (
            <View style={styles.shinyIconContainer}>
              <Image
                source={imagePaths.shinyIcon}
                height={1}
                width={1}
                resizeMode={'contain'}
                style={styles.shinyIcon}
              />
            </View>
          ) : null}
        </View>
        <Text style={styles.pokemonNames}>
          {displayData?.pokemonName[index]}
        </Text>
        <Text style={styles.pokemonNames}>
          [{displayData?.combatPower[index]}] CP
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
          nestedScrollEnabled={true}
        />
      </View>
    );
  };

  const dispImgs = pokeImageMappingFunction();

  /* NOTE: THIS IS FOR CUSTOM CAROUSAL SLIDER */

  /*
    const sliderBodyView = () => {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {gridViewDisplay(dispImgs)}
        </ScrollView>
      );
    };
  */

  const SLIDER_WIDTH = Dimensions.get('window').width + horizontalScale(80);
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  /*
  const renderSliderItem = ({item, index}) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={eggImages[index]}
            height={1}
            width={1}
            resizeMode={'contain'}
            style={styles.eggIcon}
          />
          <View style={styles.filterSection}>
            <Text style={styles.eggKmCategory}>{displayData?.Distance}</Text>
          </View>

          {gridViewDisplay(dispImgs)}
        </View>
      </ScrollView>
    );
  };
  */

  const filterSection = () => {
    return (
      <View style={styles.filterContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {loadData?.map((val, idVal) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setDisplayData(loadData[idVal]);
                  setIndexVal(idVal);
                }}>
                <View
                  style={[
                    styles.filterOptions,
                    {
                      backgroundColor:
                        idVal === indexVal ? colors.purple : colors.white,
                    },
                  ]}>
                  <Image
                    source={eggImagesObj[val?.Distance]}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={styles.filterEggIcon}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const eggDataDisplay = () => {
    return (
      <ScrollView>
        <Image
          source={eggImagesObj[displayData?.Distance]}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={styles.eggIcon}
        />
        <View style={styles.filterSection}>
          <Text style={styles.eggKmCategory}>{displayData?.Distance}</Text>
        </View>
        {gridViewDisplay(dispImgs)}
      </ScrollView>
    );
  };

  const carouselSliderView = () => {
    return (
      <>
        {/* NOTE: For now keep the Carousel Slider in this file. Later make it into a reusable component */}
        {/* <Carousel
          ref={carousalSliderRef}
          data={loadData}
          renderItem={renderSliderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          layout={'default'}
          inactiveSlideShift={0}
          useScrollView={false}
          onSnapToItem={index => {
            index = index ?? 0;
            setIndexVal(index);
          }}
        /> */}
        {/* <Pagination
          dotsLength={loadData?.length}
          activeDotIndex={indexVal}
          // containerStyle={{
          //   backgroundColor: colors.white,
          // }}
          dotStyle={[styles.dotsStyle, styles.activeDotColor]}
          inactiveDotStyle={[styles.dotsStyle, styles.inactiveDotColor]}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.6}
        /> */}
      </>
    );
  };

  return (
    <View style={styles.mainBody}>
      {/* NOTE: THIS IS CUSTOM CAROUSAL SLIDER */}
      {/* <CustomCarousalSlider
        bodyView={sliderBodyView}
        paginationStyle={true}
        sliderArrowStyle={false}
        sliderData={loadData}
        indexVal={indexVal}
        setIndexVal={setIndexVal}
      /> */}

      {/* {loader ? <ActivityIndicator size={'large'} /> : carouselSliderView()} */}
      {loader ? <ActivityIndicator size={'large'} /> : eggDataDisplay()}
      <View>{filterSection()}</View>
    </View>
  );
};
export default EggDetailsScreen;
