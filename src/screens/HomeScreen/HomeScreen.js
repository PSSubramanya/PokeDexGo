import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
// import TimePicker from 'react-times';
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

// remove this later
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

const HomeScreen = ({navigation}) => {
  const dateToday = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(dateToday);
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
  }, [selectedStartDate]);

  useEffect(() => {
    const timeValue = hour + ':' + minute + ' ' + meridianStatus;
    setTime(timeValue);
  }, [meridianStatus]);

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
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%'}}>
              <TextInputField
                headerTitle={strings.event_date}
                placeholderText={strings.sample_event_date}
                onChangeText={() => {}}
                textInputData={moment(selectedStartDate)
                  .format('DD/MM/YYYY')
                  .toString()}
                editable={false}
                compulsoryField={true}
              />
            </View>
            <View style={{width: '45%'}}>
              <TextInputField
                headerTitle={strings.event_time}
                placeholderText={time}
                onChangeText={() => {}}
                textInputData={time}
                editable={false}
                compulsoryField={true}
                onPress={showModal}
              />
              {/* CHANGE AND REPLACE THIS ABOVE WIDGET TO NORMAL TEXTS */}
              {/* <Text></Text> */}
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
      <View
        style={{
          backgroundColor: 'white',
          width: '80%',
          height: '85%',
          alignSelf: 'center',
          borderRadius: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontFamily: fontFamily.primaryFontFamilyMedium,
          }}>
          Select the time
        </Text>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.purple,
            alignItems: 'center',
            marginHorizontal: horizontalScale(30),
            borderRadius: 10,
            // height: verticalScale(110),
            justifyContent: 'space-between',
          }}>
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
              style={{
                height: verticalScale(30),
                width: horizontalScale(30),
                marginVertical: verticalScale(20),
                transform: [{rotate: '90deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                setSelectedTimePart('hour');
              }}>
              <Text
                style={{
                  color: colors.purple,
                  fontFamily:
                    selectedTimePart === 'hour'
                      ? fontFamily.primaryFontFamilyBold
                      : fontFamily.primaryFontFamilyRegular,
                  fontSize: moderateScale(40),
                }}>
                {hour}
              </Text>
            </Pressable>
            <Text
              style={{
                color: colors.purple,
                fontFamily: fontFamily.primaryFontFamilyMedium,
                fontSize: moderateScale(40),
                opacity: 0.5,
                marginLeft: horizontalScale(10),
              }}>
              :
            </Text>
            <Pressable
              onPress={() => {
                setSelectedTimePart('minute');
              }}>
              <Text
                style={{
                  color: colors.purple,
                  fontFamily:
                    selectedTimePart === 'minute'
                      ? fontFamily.primaryFontFamilyBold
                      : fontFamily.primaryFontFamilyRegular,
                  fontSize: moderateScale(40),
                  marginLeft: horizontalScale(10),
                }}>
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
              style={{
                height: verticalScale(30),
                width: horizontalScale(30),
                marginVertical: verticalScale(20),
                transform: [{rotate: '90deg'}],
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 20,
            }}>
            <Button
              buttonStyle={[
                {
                  width: horizontalScale(50),
                  height: verticalScale(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: verticalScale(5),
                  borderRadius: 5,
                },
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
              }}
              buttonText={'AM'}
            />
            <Button
              buttonStyle={[
                {
                  width: horizontalScale(50),
                  height: verticalScale(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: verticalScale(5),
                  borderRadius: 5,
                },
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
              }}
              buttonText={'PM'}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.purple,
              opacity: 0.65,
              marginHorizontal: horizontalScale(20),
            }}
          />
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontFamily: fontFamily.primaryFontFamilyMedium,
                alignSelf: 'center',
                marginBottom: verticalScale(25),
                marginTop: verticalScale(10),
              }}>
              {strings.close}
            </Text>
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
                  <Image
                    source={imagePaths.calendarIllustration3}
                    height={1}
                    width={1}
                    style={styles.appIcon}
                  />
                  <Text style={styles.noEventTitle}>
                    {strings.no_event_today}
                  </Text>
                  <Button
                    buttonStyle={[styles.buttonStyle, styles.viewButton]}
                    buttonTextStyle={[styles.viewButtonText]}
                    onPress={() => {
                      setViewCalendar(true);
                    }}
                    buttonText={strings.addEvent}
                  />
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
