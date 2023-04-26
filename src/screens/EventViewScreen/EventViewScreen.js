import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import {horizontalScale} from '../../ultilities/scale';
import {toCamelCase, checkImageExists} from '../../ultilities/commonFunctions';
import CardView from '../../components/CardView/CardView';
import EventDisplayCard from '../../components/EventDisplayCard/EventDisplayCard';

const EventViewScreen = props => {
  let listViewRef = useRef();

  const selectedDate = props?.route?.params?.selectedDate;

  const loadedEventJSONData = useSelector(
    state => state?.eventDataReducer?.eventdataload,
  );

  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
  const [eventsData, setEventsData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [modalImageIndex, setModalImageIndex] = useState(0);
  // const [modalImageOffsetIndex, setModalImageOffsetIndex] = useState(0); /* NOTE: Alternate method for scrolling using scrollToOffset */

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonType, setPokemonType] = useState([]);

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(
      data =>
        moment(data?.['Start DateTime']).format('DD/MM/YYYY') ===
        moment(selectedStartDate).format('DD/MM/YYYY'),
    );
    setEventsData(displayableEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  useEffect(() => {
    let pokeName;
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${modalData?.pokemonId?.[modalImageIndex]}`,
    ).then(response => {
      response.json().then(res => {
        pokeName = res?.name;
        setPokemonName(pokeName);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalImageIndex, modalVisible]);

  const fetchShinyGalarianHisuianAlolanPokeImages = (pokeName, type) => {
    let pokeImage;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}-${type}`).then(
      response => {
        response.json().then(res => {
          pokeImage = res?.sprites?.other?.['official-artwork']?.front_shiny;
        });
      },
    );
    return pokeImage;
  };

  const showModal = () => {
    setModalVisible(true);
    setModalImageIndex(0);
    // setModalImageOffsetIndex(0); /* NOTE: Alternate method for scrolling using scrollToOffset */
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalImageIndex(0);
    // setModalImageOffsetIndex(0);  /* NOTE: Alternate method for scrolling using scrollToOffset */
  };

  const leftButtonHandler = id => {
    listViewRef.current.scrollToIndex({animated: true, index: id});

    /* NOTE: Alternate method for scrolling using scrollToOffset */
    /*
      const offsetValue = modalImageOffsetIndex - horizontalScale(280);
      listViewRef.scrollToOffset({
        offset: offsetValue,
        animated: true,
      });
      setModalImageOffsetIndex(offsetValue);
    */
  };

  const rightButtonHandler = id => {
    listViewRef.current.scrollToIndex({animated: true, index: id});

    /* NOTE: Alternate method for scrolling using scrollToOffset */
    /*
      const offsetValue = modalImageOffsetIndex + horizontalScale(280);
      listViewRef.scrollToOffset({
        offset: offsetValue,
        animated: true,
      });
      setModalImageOffsetIndex(offsetValue);
    */
  };

  const renderItem = ({item}) => {
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
            style={styles.cardInnerStyling}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyListComponent = () => {
    return (
      <View style={[commonStyling.absoluteCenterStyling, styles.emptyListView]}>
        <Image
          source={imagePaths.calendarIllustration4}
          height={1}
          width={1}
          style={styles.emptyListImage}
          resizeMode={'contain'}
        />
        <Text style={[styles.emptyListText, styles.primaryColorStyle]}>
          {strings.no_event_string}
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
                <View style={styles.descriptionView}>
                  <Text style={styles.descriptionText}>{item}</Text>
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
        <Text style={[styles.eventTimeStyle]}>{strings.event_ranges_from}</Text>
        <Text style={[styles.modalDescriptionStyle, styles.purpleTextColor]}>
          {`Starts: ${moment(modalData?.['Start DateTime']).format(
            'DD/MM/YYYY',
          )}, ${moment(modalData?.['Start DateTime']).format('LT')} ${
            modalData?.timeZone
          }`}
        </Text>
        <Text style={[styles.modalDescriptionStyle, styles.purpleTextColor]}>
          {`Ends: ${moment(modalData?.['End DateTime']).format(
            'DD/MM/YYYY',
          )}, ${moment(modalData?.['End DateTime']).format('LT')} ${
            modalData?.timeZone
          }`}
        </Text>
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
                leftButtonHandler(tempIndex);
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
                rightButtonHandler(tempIndex);
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

  const carousalData = modalImages => {
    return (
      <>
        {modalImages?.length > 0 ? (
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
            renderItem={({item, index}) => {
              return (
                <Image
                  source={{uri: item}}
                  height={1}
                  width={1}
                  style={styles.modalImage}
                  resizeMode={'contain'}
                />
              );
            }}
          />
        ) : (
          <View>
            <Image
              // source={{
              //   uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
              // }}
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
        )}
      </>
    );
  };

  const paginationView = modalImages => {
    return (
      <>
        {modalImages?.length > 1 ? (
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
      </>
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
          style={styles.pokemonTypeImageStyel}
          resizeMode={'contain'}
        />
        <Text style={styles.pokemonNameStyle}>{toCamelCase(pdata)}</Text>
      </View>
    );
  };

  const pokemonNameAndTypeView = () => {
    let pokeName;
    const substring1 = 'pokemon_icons';
    const substring2 = '_51.png';
    const substring3 = '_52.png';

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );
    if (modalImages?.[modalImageIndex]?.includes(substring2)) {
      if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
        pokeName = `Mega ${pokemonName} X`;
      } else {
        pokeName = `Mega ${pokemonName}`;
      }
    } else if (modalImages?.[modalImageIndex]?.includes(substring3)) {
      pokeName = `Mega ${pokemonName} Y`;
    } else {
      pokeName = pokemonName;
    }
    return (
      <View style={[styles.pokemonDescription]}>
        {modalImages?.length !== 0 ? (
          <Text style={styles.pokemonName}>{toCamelCase(pokeName)}</Text>
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
        <View style={styles.eventImageContainer}>
          {leftChevronIcon(modalImages)}
          {carousalData(modalImages)}
          {rightChevronIcon(modalImages)}
        </View>
        {pokemonNameAndTypeView()}
        {paginationView(modalImages)}
      </>
    );
  };

  const modalContainer = () => {
    // TODO: Note down more substrings for normal and shiny like eg. pm747 and pm747.s and other substrings for other cases like aolan and galarian cases */
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

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );

    let displayableModalImages = [];

    modalImages?.map((data, idx) => {
      let pushedImage;
      if (data?.includes(substring2)) {
        if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
          pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega-x.jpg`;
        } else {
          pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega.jpg`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring3)) {
        pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-mega-y.jpg`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring6)) {
        pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-hisuian.jpg`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring8)) {
        pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-galarian.jpg`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring10)) {
        pushedImage = `https://img.pokemondb.net/artwork/large/${pokemonName}-alolan.jpg`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring7)) {
        pushedImage = fetchShinyGalarianHisuianAlolanPokeImages(
          pokemonName,
          'hisui',
        );
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring9)) {
        pushedImage = fetchShinyGalarianHisuianAlolanPokeImages(
          pokemonName,
          'galar',
        );
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring11)) {
        pushedImage = fetchShinyGalarianHisuianAlolanPokeImages(
          pokemonName,
          'alola',
        );
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

        // eslint-disable-next-line radix
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
          finalString,
        )}.png`;
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

        // pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modalData?.pokemonId[idx]}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      }
    });

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalInnerStyle}>
          <Text style={styles.modalTextStyle}>{modalData.Summary}</Text>
          <Text style={[styles.eventDescription, styles.primaryColorStyle]}>
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
          contentContainerStyle={styles.modalExternalStyle}>
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  const calandarView = () => {
    return (
      <View style={styles.calandarView}>
        <CalendarView
          setSelectedStartDate={setSelectedStartDate}
          selectedStartDate={selectedStartDate}
        />
      </View>
    );
  };

  const eventHeaderSection = () => {
    return (
      <View style={styles.eventsSectionHeader}>
        <Text style={[styles.eventDateText, styles.primaryColorStyle]}>
          {moment(selectedStartDate).format('MMM Do, YYYY')}
        </Text>
        <Text style={[styles.eventNumberText, styles.primaryColorStyle]}>
          {strings.number_of_events} : {eventsData?.length ?? 0}
        </Text>
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

  return (
    <Provider>
      <SafeAreaView style={{}}>
        {modalPopUp()}
        {calandarView()}
        {eventHeaderSection()}
        {eventsDetailSection()}
      </SafeAreaView>
    </Provider>
  );
};

export default EventViewScreen;
