import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
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
import {toCamelCase} from '../../ultilities/commonFunctions.js';
import colors from '../../constants/colors.js';
import commonStyling from '../../ultilities/commonStyling/commonStyling.js';
import evolutiionData from '../../ultilities/pokemonData/pokemon_evolution_chart.json';
// import CustomCarousalSlider from '../../components/CustomCarousalSlider/CustomCarousalSlider.js';

const EggDetailsScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {loadData} = params;

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

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
  const [showEvolutionChart, setShowEvolutionChart] = useState(false);
  const [evolutionChart, setEvolutionChart] = useState([]);
  const [selectedShiny, setSelectedShiny] = useState(false);

  useEffect(() => {
    setLoader(true);
    setDisplayData(loadData[indexVal]);
    // setDisplayData(loadData[1]);
    setLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexVal]);

  // useEffect(() => {
  //   console.log('indexInList CHART VALUE', evolutionChart);
  // }, [evolutionChart]);

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

  const getEvolutionChartForSelectedPokemon = (
    selectedValue,
    specialCategoryValue,
  ) => {
    let tempArray = [];
    let tempIndex = 0;
    let indexInList = 0;
    let selectedFinalIdentifier = selectedValue;

    if (specialCategoryValue === '') {
      while (selectedFinalIdentifier !== undefined) {
        console.log('indexInList start', tempIndex);
        indexInList = evolutiionData?.data.findIndex(item => {
          return item?.pokemon_id === selectedFinalIdentifier;
        });

        console.log(
          'indexInList middle',
          tempIndex,
          indexInList,
          selectedFinalIdentifier,
        );

        tempArray = [...tempArray, evolutiionData?.data?.[indexInList]];
        tempIndex = tempIndex + 1;

        selectedFinalIdentifier =
          tempArray?.[tempArray.length - 1]?.evolutions?.[0]?.pokemon_id;

        console.log(
          'indexInList end',
          selectedFinalIdentifier,
          tempIndex,
          tempArray,
        );
      }
    } else {
      while (selectedFinalIdentifier !== undefined) {
        indexInList = evolutiionData?.data.findIndex(item => {
          return (
            item?.pokemon_name === selectedFinalIdentifier &&
            item?.form === specialCategoryValue
          );
        });

        tempArray = [...tempArray, evolutiionData?.data?.[indexInList]];
        tempIndex = tempIndex + 1;

        selectedFinalIdentifier =
          tempArray?.[tempArray.length - 1]?.evolutions?.[0]?.pokemon_name;

        console.log(
          'indexInList start',
          tempIndex,
          indexInList,
          specialCategoryValue,
          tempArray,
          selectedFinalIdentifier,
        );
      }
    }

    tempIndex = 0;
    tempArray.pop();
    let finalAdditionToArray;

    finalAdditionToArray = tempArray?.[tempArray.length - 1]?.evolutions?.[0];

    tempArray = [...tempArray, finalAdditionToArray];

    setEvolutionChart(tempArray);

    console.log(
      'indexInList final 2 => ',
      tempArray.length,
      indexInList,
      tempArray,
    );

    //Take slowpoke into consideration
    // Case1: No evolution - DONE
    // Case2: 1 evolution - DONE
    // Case3: 2 evolutions - DONE
    // Case4: 1st evolution 2/more variant - NEED DATA with example
    // Case5: 2nd evolution 2/more variant - NEED DATA with example
    // Case6: 1st evolution multiple forms (Eevee) - NEED DATA
    // Case7: Special category evolution (Regional) - DONE
    // Case8: Special category 1st evolution 2/more variant - NEED DATA with example
    // Case9: Special category 2nd evolution 2/more variant - NEED DATA with example
    // Case10: Male - Female types
    // Case11: Type variation like Kubfu for example
  };

  const renderGridView = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            console.log('ABCDEF', item);
            const alolanTerm = '-alolan.jpg';
            const galarTerm = '-galarian.jpg';
            const hisuianTerm = '-hisuian.jpg';

            let specialCategoryValue = '';

            const isSpecialCategory =
              item?.includes(alolanTerm) ||
              item?.includes(galarTerm) ||
              item?.includes(hisuianTerm);

            if (isSpecialCategory) {
              specialCategoryValue = item?.includes(alolanTerm)
                ? 'Alola'
                : item?.includes(galarTerm)
                ? 'Galarian'
                : 'Hisuian';
            }

            const splittingTerm1 = 'https://img.pokemondb.net/artwork/large/';
            const splittingTerm2 =
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

            const str = item;
            let imageString;
            let finalIdentifier;
            if (isSpecialCategory) {
              imageString = str.split(splittingTerm1);
            } else {
              imageString = str.split(splittingTerm2);
            }

            if (isSpecialCategory) {
              if (imageString[1]?.includes(alolanTerm)) {
                finalIdentifier = imageString[1].split(alolanTerm);
                finalIdentifier = toCamelCase(finalIdentifier[0]);
              } else if (imageString[1]?.includes(galarTerm)) {
                finalIdentifier = imageString[1].split(galarTerm);
                finalIdentifier = toCamelCase(finalIdentifier[0]);
              } else if (imageString[1]?.includes(hisuianTerm)) {
                finalIdentifier = imageString[1].split(hisuianTerm);
                finalIdentifier = toCamelCase(finalIdentifier[0]);
              }
            } else {
              finalIdentifier = parseInt(imageString[1].split('.png'));
            }
            if (finalIdentifier === 'Farfetchd') {
              finalIdentifier = 'Farfetch’d';
            }

            console.log('FINAL IF', finalIdentifier);

            getEvolutionChartForSelectedPokemon(
              finalIdentifier,
              specialCategoryValue,
            );
            setShowEvolutionChart(true);

            if (displayData?.shiny?.[index]) {
              setSelectedShiny(true);
            } else {
              setSelectedShiny(false);
            }
          }}
          onPressOut={() => {
            setShowEvolutionChart(false);
          }}>
          <View
            style={[
              {
                backgroundColor: colors.white,
              },
              styles.gridBorderStyle,
            ]}>
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
        </TouchableOpacity>
        <Text
          style={[
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.purple,
            },
            styles.pokemonNames,
          ]}>
          {displayData?.pokemonName[index]}
        </Text>
        <Text
          style={[
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.purple,
            },
            styles.pokemonNames,
          ]}>
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
      <View
        style={[
          {
            backgroundColor: darkModeValue ? colors.darkGrey : colors.white,
            borderColor: darkModeValue ? colors.darkGrey : colors.grey,
          },
          styles.filterContainer,
        ]}>
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
                        idVal === indexVal
                          ? colors.purple
                          : darkModeValue
                          ? colors.tertiaryBackgroundColorDarkMode
                          : colors.white,
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

  const greenArrowIcon = () => {
    return (
      <Image
        source={imagePaths?.greenArrowIcon2}
        height={1}
        width={1}
        resizeMode={'contain'}
        style={styles.arrowIcon}
      />
    );
  };

  const renderEvolutionBox = (srcImage, pokeNameVal) => {
    return (
      <View
        style={[
          {
            backgroundColor: colors.white,
          },
          styles.evolutionGridBorderStyle,
        ]}>
        <Image
          source={{
            uri: srcImage,
          }}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={[styles.evolutionGridImageStyle]}
        />
        <Text style={styles.evolutionChartPokemonName}>
          {toCamelCase(pokeNameVal)}
        </Text>

        {selectedShiny ? (
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
    );
  };

  const evolutionChartDisplay = (val, ind) => {
    const pokemonId = val?.pokemon_id;
    const pokemonNameValue = val?.pokemon_name.toLowerCase();
    const isFemaleGender = val?.gender_required;
    let variantCategoryValue = '';

    let sourceImage = '';

    console.log('Evolution CHART AAAA', val, pokemonId);

    if (val?.form === 'Alola') {
      sourceImage = pokemon_alolan_variants[pokemonId];
    } else if (val?.form === 'Galarian') {
      sourceImage = pokemon_galarian_variants[pokemonId];
    } else if (val?.form === 'Hisuian') {
      sourceImage = pokemon_hisuian_variants[pokemonId];
    } else {
      if (isFemaleGender === 'Female') {
        //TODO: DO THIS FOR FEMALE CATEGORY
        if (pokemonNameValue === 'salazzle') {
          sourceImage = `https://img.pokemondb.net/artwork/large/${pokemonNameValue}.jpg`;
        } else {
          sourceImage = `https://img.pokemondb.net/artwork/large/${pokemonNameValue}-female.jpg`;
        }
      } else {
        sourceImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
      }
    }

    console.log(
      'EVOLUTION INDEX',
      pokemonNameValue,
      val,
      ind,
      val?.evolutions?.[0]?.candy_required,
      val?.pokemon_name,
      `https://img.pokemondb.net/artwork/large/${pokemonNameValue}${variantCategoryValue}`,
      sourceImage,
    );

    return (
      <View>
        {renderEvolutionBox(sourceImage, pokemonNameValue)}
        {/* TODO: DO THIS FOR FEMALE CATEGORY */}
        {/* {renderEvolutionBox(sourceImage, pokemonNameValue)} */}
      </View>
    );
  };

  const eggDataDisplay = () => {
    const seasonName = displayData?.Season.split(', ');
    return (
      <ScrollView
        style={{
          backgroundColor: darkModeValue
            ? colors.secondaryBackgroundColorDarkMode
            : null,
        }}>
        <Image
          source={eggImagesObj[displayData?.Distance]}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={styles.eggIcon}
        />
        <View style={styles.filterSection}>
          <Text
            style={[
              {
                color: darkModeValue
                  ? colors.primaryTextColorDarkMode
                  : colors.purple,
              },
              styles.eggKmCategory,
            ]}>
            {displayData?.Distance}
          </Text>
          <Text
            style={[
              {
                color: darkModeValue
                  ? colors.primaryTextColorDarkMode
                  : colors.purple,
              },
              styles.seasonText,
            ]}>
            Season: {seasonName[1]}
          </Text>
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

  const renderEvolutionView = ({item, index}) => {
    console.log('ABCDitem', item);
    return (
      <>
        {evolutionChartDisplay(item, index)}
        <View style={styles.evolutionProgressStyle}>
          {index !== evolutionChart?.length - 1 ? (
            <View style={[commonStyling.flexRow, styles?.candyIconPositioning]}>
              <Image
                source={imagePaths?.candyIcon}
                height={1}
                width={1}
                resizeMode={'contain'}
                style={styles.candyIcon}
              />
              <Text style={styles.candyText1}>
                {item?.evolutions?.[0]?.candy_required}
              </Text>
            </View>
          ) : null}
          {index !== evolutionChart?.length - 1 ? greenArrowIcon() : null}
        </View>
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
      {showEvolutionChart ? (
        <View style={[styles.evolutionChartContainer]}>
          <Text style={styles.evolutionText}>Evolution chart</Text>
          <View>
            {evolutionChart.length !== 1 ? (
              <FlatList
                data={evolutionChart}
                keyExtractor={item => item}
                renderItem={renderEvolutionView}
                numColumns={3}
              />
            ) : null}
            {evolutionChart.length === 1 ? (
              <Text style={styles.noEvolutionText}>
                NO EVOLUTION FOR THIS POKEMON
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
      <View>{filterSection()}</View>
    </View>
  );
};
export default EggDetailsScreen;
