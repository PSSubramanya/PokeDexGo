import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
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
import moment from 'moment';

const EventHistoryScreen = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {route} = props;
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

  //https://getpantry.cloud/apiv1/pantry/27d83b8a-6b70-4994-8b39-86fe1d49c459/basket/previousEvents

  useEffect(() => {
    const filteredData = previousEventsData?.filter((val, idx) => {
      console.log(
        'CALCulate',
        val?.dateTime,
        selectedDateValue,
        moment(val?.dateTime, 'ddd DD-MMM-YYYY h:mm A (HH:mm)')?.format(
          'DD / MM / YYYY',
        ),
        moment(val?.dateTime, 'ddd DD-MMM-YYYY h:mm A (HH:mm)')?.format(
          'DD / MM / YYYY',
        ) === selectedDateValue,
      );
      if (
        moment(val?.dateTime, 'ddd DD-MMM-YYYY h:mm A (HH:mm)')
          ?.format('DD / MM / YYYY')
          ?.includes(selectedDateValue)
      ) {
        return val;
      }
    });
    setDisplayData(filteredData);
  }, [dateString, monthString, yearString, selectedDateValue]);

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
          }}>
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

  // console.log('HISTORY YEAR', displayData);

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColorDarkMode
          : colors?.white,
        flex: 1,
      }}>
      <SafeAreaView />
      {urlSelected ? (
        <WebView source={{uri: urlSelected}} style={{flex: 1}} />
      ) : (
        <View>
          <View>
            <Text
              style={{
                color: colors?.white,
                fontFamily: fontFamily?.primaryFontFamilySemiBold,
                marginLeft: 20,
                marginTop: 40,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              // backgroundColor: 'red',
            }}>
            <TextInputField
              placeholderText={'DD'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 50,
                justifyContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: 4,
                paddingBottom: 4,
              }}
              onChangeText={val => {
                setDateString(val);
              }}
              textInputData={dateString}
            />
            <TextInputField
              placeholderText={'MM'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 50,
                justifyContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: 4,
                paddingBottom: 4,
              }}
              onChangeText={val => {
                setMonthString(val);
              }}
              textInputData={monthString}
            />
            <TextInputField
              placeholderText={'YYYY'}
              containerStyle={{
                backgroundColor: colors?.white,
                height: 50,
                width: 60,
                justifyContent: 'center',
                marginRight: 10,
                borderRadius: 5,
                paddingLeft: 2,
                paddingBottom: 4,
              }}
              onChangeText={val => {
                setYearString(val);
              }}
              textInputData={yearString}
            />
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
        </View>
      )}
    </View>
  );
};
export default EventHistoryScreen;
