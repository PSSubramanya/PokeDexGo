import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {
  eventLinks,
  eventSummary,
  eventStartTimeStamp,
  eventImageLoad,
} from '../../actions/eventData';

import {Modal, Portal, Provider} from 'react-native-paper';

import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
import styles from './styles';
import moment from 'moment';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInputField/TextInputField';
import CalendarView from '../../components/CalendarView/CalendarView';
import CardView from '../../components/CardView/CardView';
import {chooseFile} from '../../ultilities/commonFunctions';
import commonStyling from '../../ultilities/commonStyling/commonStyling';

import eventsDisplayMockData from '../../ultilities/mockData/eventsPerDay';
// import mockPokemonData from '../../ultilities/mockData/samplePokeInfo.json';
import webscrappedData from '../../ultilities/webscrappedData/pokemon_data.json';

// remove this later
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

const HomeScreen = ({navigation}) => {
  const dateToday = new Date();
  const dispatch = useDispatch();

  const [selectedStartDate, setSelectedStartDate] = useState(dateToday);
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [eventName, setEventName] = useState('');
  const [filePath, setFilePath] = useState({});

  const [time, setTime] = useState('Select Time');
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(25);
  const [meridianStatus, setMeridianStatus] = useState('AM');
  const [selectedTimePart, setSelectedTimePart] = useState('hour');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    console.log('Selected new Dates', selectedStartDate);

    const displayableEvents = eventsDisplayMockData.filter(
      data =>
        data?.eventDate === moment(selectedStartDate).format('DD/MM/YYYY'),
    );
    setNumberOfEvents(displayableEvents.length);
  }, [selectedStartDate]);

  useEffect(() => {
    const timeValue = hour + ':' + minute + ' ' + meridianStatus;
    setTime(timeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meridianStatus]);

  useEffect(() => {
    const loadedData = webscrappedData?.data;
    const eventLinksData = loadedData?.Links;
    const eventSummaryData = loadedData?.Summary;
    const eventStartDateTimeData = loadedData?.['Start DateTime'];
    const eventImageUrlData = loadedData?.['Img Src'];

    dispatch(eventLinks(eventLinksData));
    dispatch(eventSummary(eventSummaryData));
    dispatch(eventStartTimeStamp(eventStartDateTimeData));
    dispatch(eventImageLoad(eventImageUrlData));
  }, []);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const cardContainerView = () => {
    return (
      <>
        <View style={styles.cardMainContainer}>
          <View style={styles.flexRow}>
            <Image
              source={imagePaths.calendarIllustration1}
              height={1}
              width={1}
              style={styles.eventIcon}
            />
            <View style={styles.timeStampStyle}>
              <View style={styles.flexRow}>
                <Text style={[styles.mediumFont, styles.mediumFontSize]}>
                  {moment(selectedStartDate.toString()).format('MMM')}
                </Text>
                <Text style={[styles.mediumFont, styles.mediumFontSize]}>
                  {' '}
                  {moment(selectedStartDate.toString()).format('DD')}
                </Text>
              </View>
              <Text style={[styles.boldFont, styles.largeFontSize]}>
                {moment(selectedStartDate.toString()).format('YYYY')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              chooseFile('photo', setFilePath);
            }}>
            <View style={styles.eventIconBorder}>
              {Object.keys(filePath).length === 0 ? (
                <Image
                  source={imagePaths.cameraIcon}
                  height={1}
                  width={1}
                  style={styles.cameraIcon}
                />
              ) : (
                <Image
                  source={{uri: filePath.assets[0].uri}}
                  height={1}
                  width={1}
                  style={styles.selectedEventImage}
                  // resizeMode="contain"
                  // TODO: Need to fix this styling
                  // TODO: Later make sure we can choose photo of poekmon from database itself, from API image
                />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <TextInputField
            headerTitle={strings.event_name}
            placeholderText={strings.sample_event_name}
            onChangeText={val => {
              setEventName(val);
            }}
            textInputData={eventName}
            editable={true}
            compulsoryField={true}
          />
          <View
            style={[commonStyling.flexRow, commonStyling.spaceBetweenStyling]}>
            <View style={styles.smallerTextfieldWidth}>
              <View style={commonStyling.flexRow}>
                <Text style={styles.textFieldsHeader}>
                  {strings.event_date}
                </Text>
                <Text style={styles.compulsorySignStyle}>
                  {strings.compulsorySign}
                </Text>
              </View>
              <View style={styles.textFieldContainer}>
                <Text style={styles.textFieldStyle}>
                  {moment(selectedStartDate).format('DD/MM/YYYY').toString()}
                </Text>
              </View>
            </View>
            <View style={styles.smallerTextfieldWidth}>
              <View style={commonStyling.flexRow}>
                <Text style={styles.textFieldsHeader}>
                  {strings.event_time}
                </Text>
                <Text style={styles.compulsorySignStyle}>
                  {strings.compulsorySign}
                </Text>
              </View>
              <TouchableOpacity onPress={showModal}>
                <View style={styles.textFieldContainer}>
                  <Text style={styles.textFieldStyle}>{time}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.centerContainer}>
          <Button
            buttonStyle={[styles.buttonStyle, styles.viewButton]}
            buttonTextStyle={[styles.viewButtonText]}
            onPress={() => {}}
            buttonText={strings.save}
          />
          <Button
            buttonStyle={[styles.buttonStyle, styles.addEventButton]}
            buttonTextStyle={[styles.addEventButtonText]}
            onPress={() => {
              setViewCalendar(false);
              setSelectedStartDate(new Date());
            }}
            buttonText={strings.cancel}
          />
        </View>
      </>
    );
  };

  const modalContainer = () => {
    return (
      <View style={styles.modalStyle}>
        <Text style={styles.modalTitleStyle}>Select the time</Text>

        <View style={styles.modalTimeContainer}>
          <TouchableOpacity
            onPress={() => {
              if (selectedTimePart === 'minute') {
                if (minute <= 0) {
                  setMinute(59);
                } else {
                  setMinute(num => num - 1);
                }
              } else if (selectedTimePart === 'hour') {
                if (hour <= 1) {
                  setHour(12);
                } else {
                  setHour(num => num - 1);
                }
              }
            }}>
            <Image
              source={imagePaths.leftChevronIcon}
              height={1}
              width={1}
              style={styles.upperChevron}
            />
          </TouchableOpacity>

          <View style={commonStyling.flexRow}>
            <Pressable
              onPress={() => {
                setSelectedTimePart('hour');
              }}>
              <Text
                style={[
                  styles.modalTimeStyle,
                  {
                    fontFamily:
                      selectedTimePart === 'hour'
                        ? fontFamily.primaryFontFamilyBold
                        : fontFamily.primaryFontFamilyRegular,
                  },
                ]}>
                {hour}
              </Text>
            </Pressable>
            <Text style={styles.timeSeparatorStyle}>:</Text>
            <Pressable
              onPress={() => {
                setSelectedTimePart('minute');
              }}>
              <Text
                style={[
                  styles.modalTimeStyle,
                  styles.minuteDisplayStyle,
                  {
                    fontFamily:
                      selectedTimePart === 'minute'
                        ? fontFamily.primaryFontFamilyBold
                        : fontFamily.primaryFontFamilyRegular,
                  },
                ]}>
                {minute > 9 ? minute : `0${minute}`}
              </Text>
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (selectedTimePart === 'minute') {
                if (minute >= 59) {
                  setMinute(0);
                } else {
                  setMinute(num => num + 1);
                }
              } else if (selectedTimePart === 'hour') {
                if (hour >= 12) {
                  setHour(1);
                } else {
                  setHour(num => num + 1);
                }
              }
            }}>
            <Image
              source={imagePaths.rightChevronIcon}
              height={1}
              width={1}
              style={styles.lowerChevron}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.ampmSection}>
            <Button
              buttonStyle={[
                styles.amStyle,
                meridianStatus === 'AM'
                  ? styles.viewButton
                  : styles.addEventButton,
              ]}
              buttonTextStyle={
                meridianStatus === 'AM'
                  ? styles.viewButtonText
                  : styles.addEventButtonText
              }
              onPress={() => {
                setMeridianStatus('AM');
                hideModal();
              }}
              buttonText={'AM'}
            />
            <Button
              buttonStyle={[
                styles.pmStyle,
                meridianStatus === 'PM'
                  ? styles.viewButton
                  : styles.addEventButton,
                {marginTop: verticalScale(10)},
              ]}
              buttonTextStyle={
                meridianStatus === 'PM'
                  ? styles.viewButtonText
                  : styles.addEventButtonText
              }
              onPress={() => {
                setMeridianStatus('PM');
                hideModal();
              }}
              buttonText={'PM'}
            />
          </View>
          <View style={styles.modalBottomSection} />
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}>
            <Text style={styles.closeButton}>{strings.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={{}}>
        <Portal>
          <Modal
            style={styles.modalMarginStyle}
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalExternalStyle}>
            {modalContainer()}
          </Modal>
        </Portal>
        <View>
          {!viewCalendar ? (
            <View>
              <View
                style={[
                  styles.flexRow,
                  styles.mainContainer,
                  styles.centerContainer,
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    var a = selectedStartDate;
                    // no_of_days is an integer value
                    var b = new Date(a.setDate(a.getDate() - 1));
                    setSelectedStartDate(b);
                  }}>
                  <Image
                    source={imagePaths.leftChevronIcon}
                    height={1}
                    width={1}
                    style={[styles.chevronIcon, styles.rightChevronIcon]}
                  />
                </TouchableOpacity>
                <View>
                  <View style={styles.centerContainer}>
                    <View style={styles.flexRow}>
                      <Text style={[styles.mediumFont, styles.mediumFontSize]}>
                        {moment(selectedStartDate.toString()).format('MMM')}
                      </Text>
                      <Text style={[styles.mediumFont, styles.mediumFontSize]}>
                        {' '}
                        {moment(selectedStartDate.toString()).format('DD')}
                      </Text>
                    </View>
                    <Text style={[styles.boldFont, styles.largeFontSize]}>
                      {moment(selectedStartDate.toString()).format('YYYY')}
                    </Text>
                  </View>
                  {numberOfEvents > 0 ? (
                    <View style={commonStyling.absoluteCenterStyling}>
                      <Text style={styles.numberOfEvents}>
                        {numberOfEvents}
                      </Text>
                      <Text style={styles.noEventTitle}>
                        {strings.events_today}
                      </Text>
                    </View>
                  ) : (
                    <View style={commonStyling.absoluteCenterStyling}>
                      <Image
                        source={imagePaths.calendarIllustration3}
                        height={1}
                        width={1}
                        style={styles.appIcon}
                      />
                      <Text style={styles.noEventTitle}>
                        {strings.no_event_today}
                      </Text>
                    </View>
                  )}
                  <View style={commonStyling.absoluteCenterStyling}>
                    <Button
                      buttonStyle={[styles.buttonStyle, styles.viewButton]}
                      buttonTextStyle={[styles.viewButtonText]}
                      onPress={() => {
                        setViewCalendar(true);
                      }}
                      buttonText={strings.addEvent}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    var a = selectedStartDate;
                    // no_of_days is an integer value
                    var b = new Date(a.setDate(a.getDate() + 1));
                    setSelectedStartDate(b);
                  }}>
                  <Image
                    source={imagePaths.rightChevronIcon}
                    height={1}
                    width={1}
                    style={[styles.chevronIcon, styles.leftChevronIcon]}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EventViewScreen', {
                    selectedDate: selectedStartDate,
                  });
                }}>
                <View style={styles.viewEventIcon}>
                  <Image
                    source={imagePaths.calendarIcon}
                    height={1}
                    width={1}
                    style={[styles.calendarIcon]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <CalendarView
                setSelectedStartDate={setSelectedStartDate}
                selectedStartDate={selectedStartDate}
              />
              <CardView
                innerView={cardContainerView()}
                style={styles.cardInnerStyling}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default HomeScreen;
