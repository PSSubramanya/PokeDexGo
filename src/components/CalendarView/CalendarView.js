import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import fontFamily from '../../ultilities/fontFamily';
import styles from './styles';

const CalendarView = ({setSelectedStartDate, selectedStartDate}) => {
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
      previousTitleStyle={{fontFamily: fontFamily.primaryFontFamilyBold}}
      nextTitleStyle={{fontFamily: fontFamily.primaryFontFamilyBold}}
      // enableDateChange={true}
      // dayLabelsWrapper //ViewStyle
    />
  );
};

export default CalendarView;
