import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import styles from './styles';

const CalendarView = ({
  setSelectedStartDate,
  selectedStartDate,
  setSelectedMonth,
  calanderRef,
}) => {
  const currentDate = new Date();
  const selectedDate = new Date(selectedStartDate);

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const [diff, setDiff] = useState(0);

  function differenceInYears(date1, date2) {
    const yearDiff = date1.getYear() - date2.getYear();
    return yearDiff;
  }

  function differenceInMonths(date1, date2) {
    const monthDiff = date1.getMonth() - date2.getMonth();
    const yearDiff = differenceInYears(date1, date2);
    return monthDiff + yearDiff * 12;
  }

  const goToPrevMonth = () => {
    calanderRef.current.handleOnPressPrevious();
  };

  const goToNextMonth = () => {
    calanderRef.current.handleOnPressNext();
  };

  const positiveDifferenceCondition = differenceInMonths(
    currentDate,
    selectedDate,
  );

  const negativeDifferenceCondition = -differenceInMonths(
    currentDate,
    selectedDate,
  );

  useEffect(() => {
    const smallerDateCondition =
      differenceInMonths(currentDate, selectedDate) !== 0 &&
      differenceInMonths(currentDate, selectedDate) > 0
        ? true
        : false;
    const greaterDateCondition =
      differenceInMonths(currentDate, selectedDate) !== 0 &&
      differenceInMonths(currentDate, selectedDate) < 0
        ? true
        : false;

    if (
      diff < positiveDifferenceCondition ||
      diff < negativeDifferenceCondition
    ) {
      if (smallerDateCondition) {
        goToPrevMonth();
      }
      if (greaterDateCondition) {
        goToNextMonth();
      }
      setDiff(val => val + 1);
    }
    setSelectedStartDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff]);

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : colors.secondaryBackgroundColor,
      }}>
      <CalendarPicker
        onDateChange={setSelectedStartDate}
        onMonthChange={setSelectedMonth}
        selectedStartDate={selectedStartDate}
        selectedDayStyle={styles.selectedDayStyle}
        textStyle={{
          fontFamily: fontFamily.primaryFontFamilyMedium,
          color: darkModeValue
            ? colors.primaryTextColorDarkMode
            : colors.primaryTextColor,
        }}
        selectedDayTextStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
          color: darkModeValue
            ? colors?.primaryTextColor
            : colors?.primaryTextColorDarkMode,
        }}
        todayBackgroundColor={'#18D183'}
        todayTextStyle={{
          color: darkModeValue
            ? colors.primaryTextColor
            : colors?.primaryTextColorDarkMode,
        }}
        previousTitle={'Prev'}
        nextTitle={'Next'}
        previousTitleStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
          color: darkModeValue
            ? colors.primaryColorDarkMode
            : colors.secondaryColor,
        }}
        nextTitleStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
          color: darkModeValue
            ? colors.primaryColorDarkMode
            : colors.secondaryColor,
        }}
        ref={calanderRef}
      />
    </View>
  );
};

export default CalendarView;
