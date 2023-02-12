import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
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
  const [time, setTime] = useState('12:34pm');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [meridianStatus, setMeridianStatus] = useState('AM');

  useEffect(() => {
    console.log('Selected new Dates', selectedStartDate);
  }, [selectedStartDate]);

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
            <View
              style={{
                width: '45%',
                marginRight: 10,
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  marginTop: 24,
                  fontFamily: fontFamily.primaryFontFamilyBold,
                  color: colors.bluishGrey,
                  fontSize: 12,
                }}>
                Event Time
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showModal();
                }}>
                <View
                  style={{
                    height: 45,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                  }}>
                  {/* <Text
                    style={{
                      marginTop: 15,
                      fontFamily: fontFamily.primaryFontFamilyRegular,
                      color: colors.bluishGrey,
                    }}>
                    Time is {time}
                  </Text> */}
                  {/* <TimePicker
                    // onFocusChange={this.onFocusChange.bind(this)}
                    // onTimeChange={this.onTimeChange.bind(this)}
                    onFocusChange={() => {}}
                    onTimeChange={() => {}}
                  /> */}
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
          Select the timec(Title)
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.primaryFontFamilyMedium,
          }}>
          Build Time Picker (Customised) here
        </Text>

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
          <Button
            buttonStyle={[
              styles.buttonStyle,
              styles.viewButton,
              {alignSelf: 'center'},
            ]}
            buttonTextStyle={[styles.viewButtonText]}
            onPress={() => {
              hideModal();
            }}
            buttonText={strings.close}
          />
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
