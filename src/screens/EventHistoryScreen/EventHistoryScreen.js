import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import CardView from '../../components/CardView/CardView.js';
import WebView from 'react-native-webview';
import TextInputField from '../../components/TextInputField/TextInputField.js';
import CustomCarousalSlider from '../../components/CustomCarousalSlider/CustomCarousalSlider.js';
import {useSelector} from 'react-redux';
import samplePreviousEvents from '../../ultilities/mockData/samplePreviousEvents.json';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import fontFamily from '../../ultilities/fontFamily.js';
import imagePaths from '../../constants/imagePaths.js';
import strings from '../../constants/strings.js';
import commonStyling from '../../ultilities/commonStyling/commonStyling.js';
import moment from 'moment';

const EventHistoryScreen = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {route, navigation} = props;
  const {params} = route;
  const {selectedDate} = params;

  const dateVal = selectedDate;
  const yearFormatValue = moment(dateVal, 'DD / MM / YYYY')?.format('YYYY');
  const monthFormatValue = moment(dateVal, 'DD / MM / YYYY')?.format('MM');
  const dateFormatValue = moment(dateVal, 'DD / MM / YYYY')?.format('DD');
  const previousEventsData = samplePreviousEvents?.data;

  const [displayData, setDisplayData] = useState([]);
  const [urlSelected, setURLSelected] = useState('');
  const [indexVal, setIndexVal] = useState(0);
  const [selectedDateValue, setSelectedDateValue] = useState(selectedDate);
  const [dateString, setDateString] = useState(dateFormatValue);
  const [monthString, setMonthString] = useState(monthFormatValue);
  const [yearString, setYearString] = useState(yearFormatValue);
  const [previousDataValues, setPreviousDataValues] = useState([]);

  useEffect(() => {
    let loadPrevoiusEventsData;
    const previousEventsURL =
      'https://getpantry.cloud/apiv1/pantry/27d83b8a-6b70-4994-8b39-86fe1d49c459/basket/previousEvents';

    fetch(previousEventsURL)
      .then(response => {
        response.json().then(res => {
          loadPrevoiusEventsData = res?.data;
          setPreviousDataValues(loadPrevoiusEventsData);
          storeData('previousEventsData', loadPrevoiusEventsData);
        });
      })
      .catch(err => {
        console.log('SERIALISED PREVOIUS EVENTS DATA VALUE ERROR', err);
      });

    if (loadPrevoiusEventsData?.length === 0) {
      retrieveData('previousEventsData')
        .then(prevEventsVal => {
          if (prevEventsVal) {
            // Do something with the retrieved data, e.g., display it in your component.
            const serializedValue = JSON.parse(raidVal);
            loadPrevoiusEventsData = serializedValue;
            setPreviousDataValues(loadPrevoiusEventsData);
            console.log(
              'SERIALISED PREVOIUS EVENTS DATA VALUE',
              loadPrevoiusEventsData,
            );
          }
        })
        .catch(err => {
          console.log('previous events data ERROR.', err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredData = previousDataValues?.filter((val, idx) => {
      if (
        moment(val?.dateTime, 'ddd DD-MMM-YYYY h:mm A (HH:mm)')
          ?.format('DD / MM / YYYY')
          ?.includes(selectedDateValue)
      ) {
        return val;
      }
    });
    setDisplayData(filteredData);
  }, [
    dateString,
    monthString,
    yearString,
    selectedDateValue,
    previousDataValues,
  ]);

  const finishedStrings = ['Is over', 'has finished', 'have finished'];

  const cardContainer = item => {
    const eventDescription = item?.description?.split(' - ');
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
        }}>
        <ScrollView
          contentContainerStyle={{
            alignContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: item?.imageLink?.replace('https//', 'https://')}}
            height={100}
            width={100}
            style={{height: 100, width: 100, marginVertical: 10}}
          />
          <View style={{width: 250, marginLeft: 10}}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: fontFamily?.primaryFontFamilySemiBold,
                color: colors?.white,
                fontSize: 16,
                textAlign: 'center',
              }}>
              {item?.eventName}
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                fontSize: 12,
                textAlign: 'center',
              }}>
              {moment(item?.dateTime, 'ddd DD-MMM-YYYY h:mm A (HH:mm)')?.format(
                'h:mm A (HH:mm)',
              )}
            </Text>
            <Text
              style={{
                marginVertical: 20,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                fontSize: 12,
              }}>
              {eventDescription?.[0]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setURLSelected(item?.officialLinks);
              }}>
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: fontFamily?.primaryFontFamilyMedium,
                  color: colors?.darkBlue,
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}>
                {item?.officialLinks}
              </Text>
            </TouchableOpacity>
            {eventDescription?.map((val, idx) => {
              if (idx !== 0)
                return (
                  <View
                    style={{
                      backgroundColor: colors?.primaryColor,
                      paddingLeft: 10,
                      paddingVertical: 10,
                      marginBottom: 10,
                      width: 200,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors?.white,
                        fontFamily: fontFamily?.primaryFontFamilyMedium,
                      }}>
                      {val}
                    </Text>
                  </View>
                );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    console.log('HISTORY YEAR1', item);
    return (
      <CardView
        innerView={cardContainer(item)}
        style={styles.cardInnerStyling}
      />
    );
  };

  const renderDateSection = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <KeyboardAvoidingView behavior={'padding'}>
            <TextInputField
              placeholderText={'DD'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: Platform?.OS === 'android' ? null : 4,
                paddingBottom: Platform?.OS === 'android' ? null : 4,
                alignContent: 'center',
              }}
              onChangeText={val => {
                setDateString(val);
              }}
              textInputData={dateString}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView behavior={'padding'}>
            <TextInputField
              placeholderText={'MM'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 50,
                justifyContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: Platform?.OS === 'android' ? null : 4,
                paddingBottom: Platform?.OS === 'android' ? null : 4,
                alignContent: 'center',
              }}
              onChangeText={val => {
                setMonthString(val);
              }}
              textInputData={monthString}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView behavior={'padding'}>
            <TextInputField
              placeholderText={'YYYY'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 72,
                justifyContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: Platform?.OS === 'android' ? null : 4,
                paddingBottom: Platform?.OS === 'android' ? null : 4,
                alignContent: 'center',
                marginRight: 10,
                // backgroundColor: 'red',
              }}
              onChangeText={val => {
                setYearString(val);
              }}
              textInputData={yearString}
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          onPress={() => {
            const selectedYearDate =
              dateString + ' / ' + monthString + ' / ' + yearString;
            setSelectedDateValue(selectedYearDate);
          }}>
          <View
            style={{
              height: 40,
              width: 100,
              backgroundColor: colors?.primaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: colors?.white,
                fontSize: 14,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                marginLeft: 10,
              }}>
              GO
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderEmptyListComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <View>
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
        <View style={{marginTop: 40}}>{renderDateSection()}</View>
      </View>
    );
  };

  const renderNonEmptyComponent = () => {
    return (
      <View>
        <View>
          <Text
            style={{
              color: colors?.white,
              fontFamily: fontFamily?.primaryFontFamilySemiBold,
              marginTop: 30,
              textTransform: 'uppercase',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {`${displayData?.length} events were found on ${dateString} / ${monthString} / ${yearString}`}
          </Text>
        </View>

        <View
          style={{
            height: '68%',
            // backgroundColor: 'red',
            marginTop: 20,
          }}>
          <CustomCarousalSlider
            bodyView={renderItem}
            paginationStyle={true}
            sliderArrowStyle={true}
            sliderData={displayData}
            indexVal={indexVal}
            setIndexVal={setIndexVal}
            // containerStyle={{backgroundColor: 'red'}}
          />
        </View>
        <View style={{marginTop: 10}}>{renderDateSection()}</View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <>
        <ScrollView>
          {displayData?.length !== 0
            ? renderNonEmptyComponent()
            : renderEmptyListComponent()}
        </ScrollView>
      </>
    );
  };

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColorDarkMode
          : colors?.white,
        flex: 1,
      }}>
      <SafeAreaView />
      <View
        style={{
          height: urlSelected ? (Platform?.OS === 'android' ? 90 : 60) : 90,
          marginTop: Platform?.OS === 'android' ? -20 : -20,
          marginLeft: -20,
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          onPress={() => {
            urlSelected === '' ? navigation?.goBack() : setURLSelected('');
          }}>
          <Image
            source={imagePaths.leftChevronIcon}
            style={{
              height: 25,
              width: 25,
              marginTop: Platform?.OS === 'android' ? 50 : 25,
              marginLeft: 30,
            }}
            height={25}
            width={25}
          />
        </TouchableOpacity>
      </View>
      {urlSelected ? (
        <WebView source={{uri: urlSelected}} style={{flex: 1}} />
      ) : (
        renderBody()
      )}
    </View>
  );
};
export default EventHistoryScreen;
