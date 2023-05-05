import React, {useState, useEffect, useRef} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import styles from './styles';

const CalendarView = ({
  setSelectedStartDate,
  selectedStartDate,
  calanderRef,
}) => {
  // const calanderRef = useRef();

  // TODO: Write condition to auto change month using ref and calanderRef.current.handleOnPressNext() and calanderRef.current.handleOnPressPrevious()
  // TODO: On press of every new date with help of calanderRef.current.handleOnPressDay(), clean the events of every day from display list as soon as new date is clicked
  // TODO: The month change should work even if I choose 3 - 4 or much more months earlier or later. Calculate how many months and loop the next or previous function that many times.

  // TODO: OnMonthChange write a function and pass it to that
  const currentDate = new Date();
  const selectedDate = new Date(selectedStartDate);

  console.log(
    'MONTH Cmaprison',
    currentDate,
    selectedDate,
    currentDate.getMonth(),
    selectedDate.getMonth(),
  );
  return (
    <CalendarPicker
      onDateChange={setSelectedStartDate}
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
      // selectMonthTitle={'JAN'}
      // initialView={'months'}
      // enableDateChange={true}
      // dayLabelsWrapper //ViewStyle
    />
  );
};

export default CalendarView;
