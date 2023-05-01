import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../constants/colors';
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
      previousTitleStyle={{
        fontFamily: fontFamily.primaryFontFamilyBold,
        color: colors.secondaryColor,
      }}
      nextTitleStyle={{
        fontFamily: fontFamily.primaryFontFamilyBold,
        color: colors.secondaryColor,
      }}
      // enableDateChange={true}
      // dayLabelsWrapper //ViewStyle
    />
  );
};

export default CalendarView;
