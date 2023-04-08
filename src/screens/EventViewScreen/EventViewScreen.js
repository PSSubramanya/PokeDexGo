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

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(
      data =>
        moment(data?.['Start DateTime']).format('DD/MM/YYYY') ===
        moment(selectedStartDate).format('DD/MM/YYYY'),
    );
    setEventsData(displayableEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

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

  const carousalImageSliderSection = modalImages => {
    return (
      <>
        <View style={styles.eventImageContainer}>
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

          {modalImages?.length > 1 ? (
            <TouchableOpacity
              onPress={() => {
                if (modalImageIndex < modalImages.length) {
                  const tempIndex = modalImageIndex + 1;
                  setModalImageIndex(tempIndex);
                  rightButtonHandler(tempIndex);
                }
              }}
              disabled={
                modalImageIndex < modalImages.length - 1 ? false : true
              }>
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
        </View>

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

  const modalContainer = () => {
    const substring = 'pokemon_icons';

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring),
    );

    return (
      <View style={styles.modalInnerStyle}>
        <Text style={styles.modalTextStyle}>{modalData.Summary}</Text>
        <Text style={styles.eventDescription}>{modalData?.Description}</Text>
        {eventBonusesDisplay()}
        {carousalImageSliderSection(modalImages)}
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
