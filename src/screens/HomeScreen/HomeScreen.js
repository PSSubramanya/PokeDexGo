import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ScrollView,
} from 'react-native';

import {Modal, Portal, Provider} from 'react-native-paper';

import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import styles from './styles';
import moment from 'moment';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInputField/TextInputField';
import CalendarView from '../../components/CalendarView/CalendarView';
import CardView from '../../components/CardView/CardView';
import {chooseFile} from '../../ultilities/commonFunctions';
import commonStyling from '../../ultilities/commonStyling/commonStyling';

// remove this later
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';
import {pokeEventType} from '../../constants/constantListDatas.js';
import colors from '../../constants/colors';
import {NotificationService} from '../../ultilities/services/notifications/notificationService';

const HomeScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {loadData} = params; //props?.route?.params?.selectedDate;

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const primaryTextColorStyle = {
    color: darkModeValue ? colors?.white : colors?.purple,
  };

  const dateToday = new Date();

  const {networkState} = useNetStatusInfo();

  let loadedEventJSONData = useSelector(
    state => state?.eventDataReducer?.eventdataload,
  );

  if (!loadedEventJSONData) {
    loadedEventJSONData = loadData;
  }

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
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    pokeEventType?.[0]?.typeName,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [dropDownVisible, setDropdownVisible] = useState(false);

  NotificationService(navigation);

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(data =>
      data?.Duration.includes(moment(selectedStartDate).format('YYYY-MM-DD')),
    );

    setNumberOfEvents(displayableEvents.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  useEffect(() => {
    const timeValue = hour + ':' + minute + ' ' + meridianStatus;
    setTime(timeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meridianStatus]);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const textInputField = () => {
    return (
      <TextInputField
        headerTitle={strings.event_name}
        placeholderText={strings.sample_event_name}
        onChangeText={val => {
          setEventName(val);
        }}
        textInputData={eventName}
        editable={true}
        compulsoryField={true}
        containerStyle={styles?.eventNameFieldStyle}
      />
    );
  };

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
                <Text
                  style={[
                    styles.mediumFont,
                    styles.mediumFontSize,
                    primaryTextColorStyle,
                  ]}>
                  {moment(selectedStartDate.toString()).format('MMM')}
                </Text>
                <Text
                  style={[
                    styles.mediumFont,
                    styles.mediumFontSize,
                    primaryTextColorStyle,
                  ]}>
                  {' '}
                  {moment(selectedStartDate.toString()).format('DD')}
                </Text>
              </View>
              <Text
                style={[
                  styles.boldFont,
                  styles.largeFontSize,
                  primaryTextColorStyle,
                ]}>
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
          {Platform.OS !== 'ios' ? (
            <KeyboardAvoidingView behavior={'height'}>
              {textInputField()}
            </KeyboardAvoidingView>
          ) : (
            textInputField()
          )}
          <View
            style={[commonStyling.flexRow, commonStyling.spaceBetweenStyling]}>
            {!dropDownVisible ? (
              <TouchableOpacity
                style={[
                  styles.smallerTextfieldWidth,
                  styles?.eventTypeFieldStyle,
                ]}
                onPress={() => {
                  setDropdownVisible(true);
                }}>
                <View style={commonStyling.flexRow}>
                  <Text style={styles.textFieldsHeader}>
                    {strings.event_type}
                  </Text>
                  <Text style={styles.compulsorySignStyle}>
                    {strings.compulsorySign}
                  </Text>
                </View>
                <View style={styles.textFieldContainer}>
                  <Text style={styles.textFieldStyle}>
                    {selectedDropdownOption}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={[
                  styles.smallerTextfieldWidth,
                  styles?.dropDownContainerStyle,
                ]}>
                <FlatList
                  data={pokeEventType}
                  keyExtractor={item => item}
                  renderItem={({item, ind}) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setDropdownVisible(false);
                          setSelectedDropdownOption(item?.typeName);
                        }}>
                        <View style={styles?.pokeEventTypesView}>
                          <Text style={styles?.dropDownOptiontext}>
                            {item?.typeName}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  }}
                />
              </View>
            )}
            <View
              style={[
                styles.smallerTextfieldWidth,
                styles?.eventTimeViewStyle,
              ]}>
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
            onPress={() => {
              setViewCalendar(false);
            }}
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

  const customTaskViewForAndroid = () => {
    return (
      <ScrollView>
        <CalendarView
          setSelectedStartDate={setSelectedStartDate}
          selectedStartDate={selectedStartDate}
        />
        <CardView
          innerView={cardContainerView()}
          style={styles.cardInnerStyling}
        />
      </ScrollView>
    );
  };

  const customTaskViewForIos = () => {
    return (
      <KeyboardAvoidingView behavior="position">
        <CalendarView
          setSelectedStartDate={setSelectedStartDate}
          selectedStartDate={selectedStartDate}
        />
        <CardView
          innerView={cardContainerView()}
          style={styles.cardInnerStyling}
        />
      </KeyboardAvoidingView>
    );
  };

  const addEventScreenView = () => {
    return Platform?.OS === 'ios'
      ? customTaskViewForIos()
      : customTaskViewForAndroid();
  };

  const homeScreenBody = () => {
    return (
      <View>
        <View style={[styles.flexRow, styles.centerContainer]}>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <View style={{marginBottom: 50}}>
            {/* <View style={styles.centerContainer}>
              <View style={styles.flexRow}>
                <Text
                  style={[
                    styles.mediumFont,
                    styles.mediumFontSize,
                    primaryTextColorStyle,
                  ]}>
                  {moment(selectedStartDate.toString()).format('MMM')}
                </Text>
                <Text
                  style={[
                    styles.mediumFont,
                    styles.mediumFontSize,
                    primaryTextColorStyle,
                  ]}>
                  {' '}
                  {moment(selectedStartDate.toString()).format('DD')}
                </Text>
              </View>
              <Text
                style={[
                  styles.boldFont,
                  styles.largeFontSize,
                  primaryTextColorStyle,
                ]}>
                {moment(selectedStartDate.toString()).format('YYYY')}
              </Text>
            </View> */}
            {numberOfEvents > 0 ? (
              <View
                style={[
                  commonStyling.absoluteCenterStyling,
                  styles.eventsDisplayStyling,
                ]}>
                <Text
                  style={[
                    primaryTextColorStyle,
                    styles.numberOfEvents,
                    {marginTop: -10},
                  ]}>
                  {numberOfEvents}
                </Text>
                <Text style={[styles.eventTitle, primaryTextColorStyle]}>
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
                <Text style={[styles.noEventTitle, primaryTextColorStyle]}>
                  {strings.no_event_today}
                </Text>
              </View>
            )}
            {/* DATE FROM HERE */}
            <View style={{flexDirection: 'row', marginTop: 25}}>
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
              <View style={styles.centerContainer}>
                <View style={styles.flexRow}>
                  <Text
                    style={[
                      styles.mediumFont,
                      styles.mediumFontSize,
                      primaryTextColorStyle,
                    ]}>
                    {moment(selectedStartDate.toString()).format('MMM')}
                  </Text>
                  <Text
                    style={[
                      styles.mediumFont,
                      styles.mediumFontSize,
                      primaryTextColorStyle,
                    ]}>
                    {' '}
                    {moment(selectedStartDate.toString()).format('DD')}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.boldFont,
                    styles.largeFontSize,
                    primaryTextColorStyle,
                  ]}>
                  {moment(selectedStartDate.toString()).format('YYYY')}
                </Text>
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
            {/* TODO: THIS FOR V2 or V3 */}
            {/* <View style={commonStyling.absoluteCenterStyling}>
            <Button
              buttonStyle={[styles.buttonStyle, styles.viewButton]}
              buttonTextStyle={[styles.viewButtonText]}
              onPress={() => {
                setViewCalendar(true);
              }}
              buttonText={strings.addEvent}
            />
          </View> */}
          </View>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        {/* <TouchableOpacity
          style={styles.viewEventIcon}
          onPress={() => {
            navigation.navigate('EventViewScreen', {
              selectedDate: selectedStartDate,
            });
          }}>
          <Image
            source={imagePaths.calendarIcon}
            height={1}
            width={1}
            style={[styles.calendarIcon]}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EventViewScreen', {
              selectedDate: selectedStartDate,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              height: 60,
              width: 200,
              borderRadius: 5,
              backgroundColor: darkModeValue ? colors?.secondaryColor : null,
            }}>
            <Text style={styles?.customTasksText}>VIEW EVENTS</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Provider>
      <SafeAreaView />
      {networkState ? (
        <View
          style={[
            {
              backgroundColor: darkModeValue
                ? colors.secondaryBackgroundColorDarkMode
                : null,
            },
            styles.mainBody,
          ]}>
          {modalPopUp()}
          <View style={styles.topSection}>
            {!viewCalendar ? homeScreenBody() : addEventScreenView()}
          </View>

          {!viewCalendar ? (
            <TouchableOpacity
              style={styles.viewEventIcon}
              onPress={() => {
                setViewCalendar(true);
              }}>
              <Image
                source={imagePaths.addEventsIcon}
                height={1}
                width={1}
                style={[styles.calendarIcon]}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </Provider>
  );
};

export default HomeScreen;
