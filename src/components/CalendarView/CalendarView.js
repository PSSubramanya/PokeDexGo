import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import imagePaths from '../../constants/imagePaths';
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
  // const calanderRef = useRef();

  // TODO: Write condition to auto change month using ref and calanderRef.current.handleOnPressNext() and calanderRef.current.handleOnPressPrevious()
  // TODO: On press of every new date with help of calanderRef.current.handleOnPressDay(), clean the events of every day from display list as soon as new date is clicked
  // TODO: The month change should work even if I choose 3 - 4 or much more months earlier or later. Calculate how many months and loop the next or previous function that many times.

  const currentDate = new Date();
  const selectedDate = new Date(selectedStartDate);

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
    // console.log('MONTHS PREV');
  };

  const goToNextMonth = () => {
    calanderRef.current.handleOnPressNext();
    // console.log('MONTHS NEXT');
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
    <>
      <CalendarPicker
        onDateChange={setSelectedStartDate}
        onMonthChange={setSelectedMonth}
        selectedStartDate={selectedStartDate}
        selectedDayTextColor={'white'}
        selectedDayStyle={styles.selectedDayStyle}
        textStyle={{fontFamily: fontFamily.primaryFontFamilyMedium}}
        selectedDayTextStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
        }}
        todayBackgroundColor={'#18D183'}
        previousTitle={'Prev'}
        nextTitle={'Next'}
        previousTitleStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
          color: colors.secondaryColor,
        }}
        nextTitleStyle={{
          fontFamily: fontFamily.primaryFontFamilyBold,
          color: colors.secondaryColor,
        }}
        ref={calanderRef}
      />
    </>
  );
};

export default CalendarView;
