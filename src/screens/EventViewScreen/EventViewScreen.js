import React, {useEffect, useState, useRef} from 'react';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import styles from './styles';
import moment from 'moment';
import CalendarView from '../../components/CalendarView/CalendarView';
import Button from '../../components/Button/Button';
import colors from '../../constants/colors';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import pokemon_alolan_variants from '../../ultilities/pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from '../../ultilities/pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from '../../ultilities/pokemonData/pokemon_hisuian_variants';
import pokemon_mega_images from '../../ultilities/pokemonData/pokemon_mega_images';
import {horizontalScale, verticalScale} from '../../ultilities/scale';
import {toCamelCase, checkImageExists} from '../../ultilities/commonFunctions';
import CardView from '../../components/CardView/CardView';
import EventDisplayCard from '../../components/EventDisplayCard/EventDisplayCard';
import {NotificationService} from '../../ultilities/services/notifications/notificationService';

const EventViewScreen = props => {
  const {navigation} = props;
  const selectedDate = props?.route?.params?.selectedDate;

  let listViewRef = useRef();
  const calanderRef = useRef();

  const {networkState} = useNetStatusInfo();

  const loadedEventJSONData = useSelector(
    state => state?.eventDataReducer?.eventdataload,
  );

  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
  const [eventsData, setEventsData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [modalImageIndex, setModalImageIndex] = useState(0);

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonNameDisplay, setPokemonNameDisplay] = useState('');
  const [pokemonType, setPokemonType] = useState([]);

  const [showLoader, setShowLoader] = useState(true);

  const [gridViewStatus, setGridViewStatus] = useState(false);

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const modalTextColorStyle = {
    color: darkModeValue ? colors.white : colors.purple,
  };

  const modalBonusBackgroundStyle = {
    backgroundColor: darkModeValue ? colors.purple : colors.white,
  };

  const datVal = modalData?.['Start DateTime']?.split(' ');
  const dateLength = datVal?.length;

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // useEffect(() => {
  //   const updateCurrentTime = () => {
  //     setCurrentTime(new Date());
  //   };

  //   const intervalId = setInterval(updateCurrentTime, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(data =>
      data?.Duration?.includes(moment(selectedStartDate).format('YYYY-MM-DD')),
    );
    const sortedArry =
      sortByKey(displayableEvents, 'preference') ?? displayableEvents;
    setEventsData(sortedArry);

    if (selectedStartDate === null) {
      setEventsData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  NotificationService(navigation); //NOTE: THIS FUNCTION IS TO CALL NOTIFICATIONS
  //TODO: Navigation needs to be done somehow on click

  useEffect(() => {
    let pokeName;
    let pokemonMegaType;

    const megaCategory = [
      '_51.png',
      '_52.png',
      '_51_shiny.png',
      '_52_shiny.png',
      'fMEGA.icon.png',
      'fMEGA.s.icon.png',
    ];

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes('pokemon_icons'),
    );

    megaCategory.map(dat => {
      if (modalImages?.[modalImageIndex]?.includes(dat)) {
        pokemonMegaType = true;
      }
    });

    fetch(
      `https://pokeapi.co/api/v2/pokemon/${modalData?.pokemonId?.[modalImageIndex]}`,
    ).then(response => {
      response.json().then(res => {
        pokeName = res?.name;
        setPokemonNameDisplay(pokeName);
        if (pokemonMegaType) {
          setPokemonName(pokeName);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalImageIndex, modalVisible, gridViewStatus]);

  useEffect(() => {
    setGridViewStatus(false);
  }, [modalVisible]);

  const showModal = () => {
    setModalVisible(true);
    setModalImageIndex(0);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalImageIndex(0);
  };

  const leftButtonHandler = (id, modalImages) => {
    //TODO: Need to fix this limit of 30 items and make scrolling smooth for what so ever number of images we have
    //TODO: Try to use gridIndex and modalIndex, whenever gridImage is selected, trigger a useEffect which sets modalIndex
    //TODO: Then scrollToIndex(modalIndex). Hopefully this can solve this issue
    /*
      if (modalImages?.length <= 30) {
        listViewRef.current.scrollToIndex({animated: true, index: id});
      }
    */
  };

  const rightButtonHandler = (id, modalImages) => {
    //TODO: Need to fix this limit of 30 items and make scrolling smooth for what so ever number of images we have
    /*
      if (modalImages?.length <= 30) {
        listViewRef.current.scrollToIndex({animated: true, index: id});
      }
    */
  };

  const renderItem = ({item}) => {
    const specialCase =
      item?.Summary.toLowerCase().includes('spotlight') ||
      item?.Summary?.toLowerCase().includes('community day');

    // console.log('CHECKKKKKKK', item?.Summary, specialCase);
    return (
      <View style={styles.eventsList}>
        <TouchableOpacity
          onPress={() => {
            let pokeType;
            showModal();
            setModalData(item);

            pokeType = item?.type;
            setPokemonType(pokeType);
          }}>
          <CardView
            innerView={eventCardContainer(item)}
            style={[
              styles.cardInnerStyling,
              {
                borderWidth: specialCase ? 2 : 0,
                borderColor: specialCase ? colors.goldColor : null,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyListComponent = () => {
    return (
      <View
        style={[commonStyling.absoluteCenterStyling, styles.topPaddingStyle]}>
        <Image
          source={imagePaths.calendarIllustration4}
          height={1}
          width={1}
          style={styles.emptyListImage}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.emptyListText,
            {color: darkModeValue ? colors.white : colors.secondaryColor},
          ]}>
          {strings.no_event_string}
        </Text>
      </View>
    );
  };

  const renderSelectDatePromptComponent = () => {
    return (
      <View
        style={[commonStyling.absoluteCenterStyling, styles.topPaddingStyle]}>
        <Image
          source={imagePaths.noDateSelectedPromptImage1}
          height={1}
          width={1}
          style={styles.selectDatePromptImage}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.emptyListText,
            {color: darkModeValue ? colors.white : colors.secondaryColor},
          ]}>
          {strings.select_date_prompt}
        </Text>
      </View>
    );
  };

  const eventCardContainer = item => {
    let eventCompletionStatus;
    let currentDate = new Date();
    let date2 = new Date(item?.['End DateTime']);

    if (currentDate > date2) {
      eventCompletionStatus = true;
    } else if (currentDate < date2) {
      eventCompletionStatus = false;
    } else {
      eventCompletionStatus = false;
    }

    return (
      <EventDisplayCard
        item={item}
        eventCompletionStatus={eventCompletionStatus}
      />
    );
  };

  const eventBonusesDisplay = () => {
    return (
      <>
        {modalData?.Bonus?.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.descriptionDataContentView}
            data={modalData?.Bonus}
            keyExtractor={item => item}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.descriptionView,
                    {
                      backgroundColor: darkModeValue
                        ? colors.purple
                        : colors.white,
                    },
                  ]}>
                  <Text style={[styles.descriptionText, modalTextColorStyle]}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        ) : null}
      </>
    );
  };

  const eventTimeDisplay = () => {
    return (
      <>
        <Text style={[styles.eventTimeStyle, modalTextColorStyle]}>
          {strings.event_ranges_from}
        </Text>
        {dateLength === 2 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Starts: ${moment(modalData?.['Start DateTime']).format(
              'DD/MM/YYYY',
            )}, ${moment(modalData?.['Start DateTime']).format('LT')} ${
              modalData?.timeZone
            }`}
          </Text>
        ) : null}
        {dateLength === 1 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Starts: ${moment(modalData?.['Start DateTime']).format(
              'DD/MM/YYYY',
            )}`}
          </Text>
        ) : null}
        {dateLength === 2 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Ends: ${moment(modalData?.['End DateTime']).format(
              'DD/MM/YYYY',
            )}, ${moment(modalData?.['End DateTime']).format('LT')} ${
              modalData?.timeZone
            }`}
          </Text>
        ) : null}
        {dateLength === 1 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Ends: ${moment(modalData?.['End DateTime']).format(
              'DD/MM/YYYY',
            )}`}
          </Text>
        ) : null}
      </>
    );
  };

  const modalCloseButton = () => {
    return (
      <Button
        buttonStyle={[styles.buttonStyle, styles.viewButton]}
        buttonTextStyle={[styles.viewButtonText]}
        onPress={() => {
          hideModal();
        }}
        buttonText={strings.close}
      />
    );
  };

  /* CAROUSAL SECTION */
  /**Contents to pass:
   * OnPress Right
   * Disable right
   * Onpress left
   * Disable left
   * Card View
   * Card data
   * Pagination Data
   * Pagination Condition
   */

  const leftChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex > 0) {
                const tempIndex = modalImageIndex - 1;
                setModalImageIndex(tempIndex);
                leftButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex > 0 ? false : true}>
            <Image
              source={imagePaths.leftChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex > 0 ? 1 : 0.5,
                },
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const rightChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex < modalImages.length) {
                const tempIndex = modalImageIndex + 1;
                setModalImageIndex(tempIndex);
                rightButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex < modalImages.length - 1 ? false : true}>
            <Image
              source={imagePaths.rightChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex < modalImages.length - 1 ? 1 : 0.5,
                },
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const noImageViewDisplay = () => {
    return (
      <View>
        <Image
          source={imagePaths.noImage}
          height={1}
          width={1}
          style={styles.modalImage}
          resizeMode={'contain'}
        />
        <Text style={styles.noImageTextStyle}>
          {strings.no_images_available.toUpperCase()}
        </Text>
      </View>
    );
  };
  const scrollToIndexFailed = error => {
    const offset = error.averageItemLength * error.index;
    listViewRef.current.scrollToOffset({offset});
    setShowLoader(true);
    setTimeout(() => {
      listViewRef.current.scrollToIndex({index: error.index});
      setShowLoader(false);
    }, 10); // You may choose to skip this line if the above typically works well because your average item height is accurate.
  };

  const carousalData = modalImages => {
    return (
      <>
        <FlatList
          data={modalImages}
          keyExtractor={item => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginLeft: modalImages?.length > 1 ? horizontalScale(-32) : 0,
          }}
          scrollEnabled={false}
          ref={listViewRef}
          onScrollToIndexFailed={scrollToIndexFailed}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: modalImages[modalImageIndex]}}
                height={1}
                width={1}
                style={styles.modalImage}
                resizeMode={'contain'}
                // onLoadStart={() => {
                //   setShowLoader(true);
                // }}
                onLoad={() => {
                  setShowLoader(false);
                }}
              />
            );
          }}
        />
      </>
    );
  };

  const paginationView = (modalImages, paginationStyle) => {
    return (
      <>
        {modalImages?.length > 1 && paginationStyle ? (
          <FlatList
            data={modalImages}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.paginationView}>
                  <View
                    style={[
                      styles.paginationDots,
                      {
                        backgroundColor:
                          modalImageIndex === index
                            ? colors.vermillion
                            : colors.purple,
                      },
                    ]}
                  />
                </View>
              );
            }}
          />
        ) : null}
        {modalImages?.length > 1 && !paginationStyle ? (
          <TouchableOpacity
            onPress={() => {
              setGridViewStatus(true);
            }}
            style={[styles.paginationTextBorder, modalBonusBackgroundStyle]}>
            <Text style={[styles.paginationTextStyle, modalTextColorStyle]}>
              <Text style={styles.paginationRichtext1}>
                {modalImageIndex + 1}{' '}
              </Text>
              of
              <Text style={[styles.paginationRichtext2, modalTextColorStyle]}>
                {' '}
                {modalImages?.length}
              </Text>
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const renderGridView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setGridViewStatus(false);
          setModalImageIndex(index);
        }}>
        <Image
          source={{uri: item}}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={[
            styles.gridImageStyle,
            {
              borderColor:
                modalImageIndex === index
                  ? colors.vermillionLighter
                  : colors.purple,
              borderWidth: modalImageIndex === index ? 2 : 1,
              backgroundColor:
                modalImageIndex === index ? colors.vermillionLighter : 'white',
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const gridViewDisplay = modalImages => {
    return (
      <View style={styles.gridViewDisplay}>
        <FlatList
          data={modalImages}
          ref={listViewRef}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderGridView}
          nestedScrollEnabled={true}
        />
      </View>
    );
  };

  const pokemonTypeView = pdata => {
    return (
      <View style={[commonStyling.flexRow]}>
        <Image
          source={{
            uri: pokeTypesData[pdata],
          }}
          height={1}
          width={1}
          style={styles.pokemonTypeImageStyle}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.pokemonNameStyle,
            {
              color: darkModeValue ? colors.darkBlue : colors.vermillion,
            },
          ]}>
          {toCamelCase(pdata)}
        </Text>
      </View>
    );
  };

  const pokemonNameAndTypeView = () => {
    let pokeName;
    let pokeShinyType = false;
    const substring1 = 'pokemon_icons';
    const substring2 = '_51.png';
    const substring3 = '_52.png';
    const substring4 = 'fMEGA'; // Mega and Mega X - DONE

    const shinyCategory = [
      '_shiny.png',
      '.s.icon.png',
      'fHISUIAN.s.icon.png',
      '_31_shiny.png',
      '_61_shiny.png',
      'fMEGA.s.icon.png',
      '_51_shiny.png',
      '_52_shiny.png',
    ];

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );

    shinyCategory.map(dat => {
      if (modalImages?.[modalImageIndex]?.includes(dat)) {
        pokeShinyType = true;
      }
    });

    if (
      modalImages?.[modalImageIndex]?.includes(substring2) ||
      modalImages?.[modalImageIndex]?.includes(substring4)
    ) {
      if (
        pokemonNameDisplay === 'charizard' ||
        pokemonNameDisplay === 'mewtwo'
      ) {
        pokeName = `Mega ${pokemonNameDisplay} X`;
      } else {
        pokeName = `Mega ${pokemonNameDisplay}`;
      }
    } else if (modalImages?.[modalImageIndex]?.includes(substring3)) {
      pokeName = `Mega ${pokemonNameDisplay} Y`;
    } else {
      pokeName = pokemonNameDisplay;
    }
    return (
      <View style={[styles.pokemonDescription]}>
        {modalImages?.length !== 0 ? (
          <View style={styles.pokemonNameDisplayView}>
            <Text style={[styles.pokemonName, modalTextColorStyle]}>
              {toCamelCase(pokeName)}
            </Text>
            {pokeShinyType ? shinyPokemonIndicatorView() : null}
          </View>
        ) : null}
        <View
          style={[
            commonStyling.flexRow,
            commonStyling.horizontalCenterStyling,
          ]}>
          {pokemonType?.[modalImageIndex]?.map(pdata => {
            return pokemonTypeView(pdata);
          })}
        </View>
      </View>
    );
  };

  const carousalImageSliderSection = modalImages => {
    return (
      <>
        {!gridViewStatus ? (
          <>
            <View style={styles.eventImageContainer}>
              {leftChevronIcon(modalImages)}
              {modalImages.length > 0 ? (
                showLoader ? (
                  <View style={styles.activityIndicatorStyle}>
                    <ActivityIndicator />
                  </View>
                ) : null
              ) : (
                noImageViewDisplay()
              )}
              {carousalData(modalImages)}
              {rightChevronIcon(modalImages)}
            </View>
            {pokemonNameAndTypeView()}
            {paginationView(modalImages, false)}
          </>
        ) : null}

        {gridViewStatus ? (
          <View style={commonStyling.absoluteCenterStyling}>
            {gridViewDisplay(modalImages)}
          </View>
        ) : null}
      </>
    );
  };

  const shinyPokemonIndicatorView = () => {
    return (
      <View style={styles.shinyIndictorView}>
        <Image
          source={imagePaths.shinyIcon}
          height={1}
          width={1}
          style={styles.shinyIcon}
        />
      </View>
    );
  };

  const defaultPokemonImageString = idx => {
    let indexVal = idx?.replace('_00', '');

    if (idx?.includes('585')) {
      if (idx?.includes('_11')) {
        indexVal = idx?.replace('_11', '');
      } else if (idx?.includes('_12')) {
        indexVal = idx?.replace('_12', '');
      } else if (idx?.includes('_13')) {
        indexVal = idx?.replace('_13', '');
      } else if (idx?.includes('_14')) {
        indexVal = idx?.replace('_14', '');
      }
    }

    if (indexVal?.[0] === '0') {
      if (indexVal?.[1] === '0') {
        indexVal = indexVal?.[2];
      } else {
        indexVal = indexVal?.[1] + indexVal?.[2];
      }
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexVal}.png`;
  };

  const pokeImageMappingFunction = () => {
    const substring1 = 'pokemon_icons'; // for normal images - DONE
    const substring2 = '_51.png'; // Mega and Mega X - DONE
    const substring3 = '_52.png'; // Mega Y - DONE
    const substring4 = '_shiny.png'; // Shiny - DONE
    const substring5 = '.s.icon.png'; // Shiny - DONE
    const substring6 = 'fHISUIAN.icon.png'; // HISUIAN - DONE
    const substring7 = 'fHISUIAN.s.icon.png'; // HISUIAN Shiny
    const substring8 = '_31.png'; // GALARIAN - DONE
    const substring9 = '_31_shiny.png'; // Shiny Glarian
    const substring10 = '_61.png'; // ALOLAN - DONE
    const substring11 = '_61_shiny.png'; // Shiny Alolan
    const substring12 = 'fMEGA.icon.png'; // Mega and Mega X - DONE
    const substring13 = 'fMEGA.s.icon.png'; //Mega Shiny
    const substring14 = '_51_shiny.png'; //Mega Shiny
    const substring15 = '_52_shiny.png'; //Mega Shiny

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );

    // console.log('MEGA data', modalImages);

    let displayableModalImages = [];

    modalImages?.map((data, idx) => {
      let pushedImage;
      if (data?.includes(substring2) || data?.includes(substring12)) {
        if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
          const pokeString = pokemonName + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        } else {
          const pokeString = pokemonName;
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring3)) {
        const pokeString = pokemonName + 'Y';
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring14) || data?.includes(substring13)) {
        if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
          const pokeString = pokemonName + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        } else {
          const pokeString = pokemonName;
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring15)) {
        const pokeString = pokemonName + 'Y';
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring6)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_hisuian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring8)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_galarian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring10)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_alolan_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring7)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_hisuian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring9)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_galarian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring11)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_alolan_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring4)) {
        const ret = data;
        const newStr1 = ret.replace(
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_',
          '',
        );
        const newStr2 = newStr1.replace('_shiny.png', '');
        const newstr3 = newStr2.substr(-3);
        const finalString = newStr2.replace(newstr3, '');

        if (finalString === '201') {
          pushedImage = data;
        } else {
          // eslint-disable-next-line radix
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
            finalString,
          )}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring5)) {
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
      } else if (modalData?.pokemonId[idx] === '201') {
        pushedImage = data;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else {
        const tempImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modalData?.pokemonId[idx]}.png`;

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

        if (newStr2 === undefined) {
          pushedImage = data;
        } else {
          if (newStr2.includes('.icon.png')) {
            newStr3 = newStr2.replace('.icon.png', '');
          } else if (newStr2.includes('.png')) {
            newStr3 = newStr2.replace('.png', '');
          }

          const finalString = newStr3;
          if (finalString?.length > 6) {
            pushedImage = data;
          } else {
            pushedImage = defaultPokemonImageString(finalString);
          }
        }

        /** NOTE:
         * Why length > 6 is used as condition above because when the image string is split, it comes to a number of 3 digits max.
         * Even so some strings may have _00 and _11 attached to it making its length 6 so.
         */
        displayableModalImages = [...displayableModalImages, pushedImage];
      }
    });
    console.log('modalmodalmodalImages', displayableModalImages);
    return displayableModalImages;
  };

  const modalContainer = () => {
    let displayableModalImages = pokeImageMappingFunction();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalInnerStyle}>
          <Text style={[styles.modalTextStyle, modalTextColorStyle]}>
            {modalData.Summary}
          </Text>
          <Text style={[styles.eventDescription, modalTextColorStyle]}>
            {modalData?.Description}
          </Text>
          {eventBonusesDisplay()}
          {carousalImageSliderSection(displayableModalImages)}
          {eventTimeDisplay()}
          {modalCloseButton()}
        </View>
      </ScrollView>
    );
  };

  const modalPopUp = () => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalExternalStyle,
            {
              backgroundColor: darkModeValue
                ? colors.quaternaryBackgroundColorDarkMode
                : colors.white,
            },
          ]}>
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  const setSelectedMonth = () => {
    setEventsData(null);
    setSelectedStartDate(null);
  };

  const calandarView = () => {
    return (
      <View style={styles.calandarView}>
        <CalendarView
          setSelectedStartDate={setSelectedStartDate}
          selectedStartDate={selectedStartDate}
          setSelectedMonth={setSelectedMonth}
          calanderRef={calanderRef}
        />
      </View>
    );
  };

  const eventHeaderSection = () => {
    return (
      <View style={styles.eventsSectionHeader}>
        <Text
          style={[
            styles.eventDateText,
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.secondaryColor,
            },
          ]}>
          {eventsData !== null
            ? moment(selectedStartDate).format('MMM Do, YYYY')
            : ''}
        </Text>
        <View style={commonStyling?.flexRow}>
          <Text
            style={[
              styles.eventNumberText,
              {
                color: darkModeValue
                  ? colors.primaryTextColorDarkMode
                  : colors.secondaryColor,
              },
            ]}>
            {strings.number_of_events} :
          </Text>
          <Text style={[styles.eventNumberText, styles.eventNumberText2]}>
            {eventsData?.length ?? 0}
          </Text>
        </View>
      </View>
    );
  };

  const eventsDetailSection = () => {
    return (
      <ScrollView style={styles.eventDataListContainer}>
        {eventsData?.length !== 0 ? (
          <View>
            <FlatList
              data={eventsData}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        ) : (
          renderEmptyListComponent()
        )}
      </ScrollView>
    );
  };

  // console.log('EVVVVVV', eventsData);

  return (
    <Provider>
      {networkState ? (
        <SafeAreaView
          style={{
            backgroundColor: darkModeValue
              ? colors.secondaryBackgroundColorDarkMode
              : null,
            flex: 1,
          }}>
          {modalPopUp()}
          {calandarView()}
          {eventsData !== null ? eventHeaderSection() : null}
          {eventsData !== null ? eventsDetailSection() : null}
          {eventsData === null ? renderSelectDatePromptComponent() : null}
        </SafeAreaView>
      ) : null}
    </Provider>
  );
};

export default EventViewScreen;
