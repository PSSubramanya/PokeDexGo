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
import {horizontalScale} from '../../ultilities/scale';
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

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(
      data =>
        moment(data?.['Start DateTime']).format('DD/MM/YYYY') ===
        moment(selectedStartDate).format('DD/MM/YYYY'),
    );
    setEventsData(displayableEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  // TODO: TOMORROW
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
            showModal();
            setModalData(item);
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
        <Text style={styles.emptyListText}>There is no event for the day</Text>
      </View>
    );
  };

  const eventCardContainer = item => {
    return <EventDisplayCard item={item} />;
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
      <Text style={[styles.modalDescriptionStyle, styles.purpleTextColor]}>
        {`Starts on ${moment(modalData?.['Start DateTime']).format(
          'DD/MM/YYYY',
        )} at ${moment(modalData?.['Start DateTime']).format('LT')}`}
      </Text>
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
              source={{
                uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
              }}
              height={1}
              width={1}
              style={styles.modalImage}
              resizeMode={'contain'}
            />
            <Text style={styles.noImageTextStyle}>NO IMAGES AVAILABLE</Text>
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

  const carousalImageSliderSection = modalImages => {
    return (
      <>
        <View style={styles.eventImageContainer}>
          {leftChevronIcon(modalImages)}
          {carousalData(modalImages)}
          {rightChevronIcon(modalImages)}
        </View>
        {paginationView(modalImages)}
      </>
    );
  };

  const modalContainer = () => {
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modalData?.pokemonId[index]}.png
    // https://img.pokemondb.net/artwork/large/charizard-mega-x.jpg - problem how to guess if a pokemon has only 1 or X form also??
    // https://img.pokemondb.net/artwork/large/charizard-mega-y.jpg
    // https://img.pokemondb.net/artwork/large/rayquaza-mega.jpg
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/176.png

    // https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/384-Mega.png
    // https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/006-Mega-X.png
    // https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/006-Mega-Y.png

    // https://img.pokemondb.net/artwork/large/rayquaza-mega.jpg

    // TODO: Note down more substrings for normal and shiny like eg. pm747 and pm747.s and other substrings for other cases like aolan and galarian cases */
    const substring1 = 'pokemon_icons'; // for normal images
    const substring2 = '_51.png'; // Mega and Mega X
    const substring3 = '_52.png'; // Mega Y
    const substring4 = '_shiny.png'; // Shiny

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
      } else {
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modalData?.pokemonId[idx]}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      }
    });

    return (
      <View style={styles.modalInnerStyle}>
        <Text style={styles.modalTextStyle}>{modalData.Summary}</Text>
        <Text style={styles.eventDescription}>{modalData?.Description}</Text>
        {eventBonusesDisplay()}
        {carousalImageSliderSection(displayableModalImages)}
        {eventTimeDisplay()}
        {modalCloseButton()}
      </View>
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
        <Text style={styles.eventDateText}>
          {moment(selectedStartDate).format('MMM Do, YYYY')}
        </Text>
        <Text style={styles.eventNumberText}>
          Number of events {eventsData?.length ?? 0}
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
