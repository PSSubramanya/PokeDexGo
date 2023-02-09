import React from 'react';
import styles from './styles';
import colors from '../../constants/colors';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import fontFamily from '../../ultilities/fontFamily';

const CalendarView = ({navigation}) => {
  const event1 = {
    key: "Akka's Wedding Anniversary",
    color: colors.purple,
    selectedDotColor: 'blue',
  };
  const event2 = {
    key: 'My Upanayana Anniversary',
    color: colors.pink,
    selectedDotColor: 'blue',
  };
  const event3 = {key: 'Sunday', color: colors.red};
  const event4 = {key: 'Dratini Community Day', color: colors.purple};
  const event5 = {key: 'Rachi Bday', color: colors.purple};

  return (
    <CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={months => {
        console.log('now these months are visible', months);
      }}
      calendarStyle={styles.calendarStyle}
      horizontal={true}
      pagingEnabled={true}
      calendarHeight={100}
      scrollEnabled={true}
      showScrollIndicator={false}
      // calendar inner theme styles
      theme={{
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: colors.orange,
          },
          dayTextAtIndex6: {
            color: colors.darkBlue,
          },
        },
        calendarBackground: '#ffffff',
        textSectionTitleColor: colors.bluishGrey,
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: colors.darkBlue,
        selectedDayTextColor: colors.darkGrey,
        todayTextColor: colors.darkBlue,
        dayTextColor: colors.bluishGrey,
        textDisabledColor: '#d9e1e8',
        dotColor: colors.darkBlue,
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: fontFamily.primaryFontFamilySemiBold,
        textMonthFontFamily: fontFamily.primaryFontFamilyBold,
        textDayHeaderFontFamily: fontFamily.primaryFontFamilySemiBold,
        textDayFontSize: 16,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 12,
      }}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      // There are other types like 'period','multi-period','custom'
      markingType={'multi-dot'}
      // Make markedDates immutable
      markedDates={{
        '2022-11-05': {dots: [event4], disabled: false},
        '2022-11-06': {
          marked: true,
          dots: [event1, event2, event3],
          selected: true,
          selectedColor: colors.orange,
          dotColor: colors.pink,
        },
        '2022-11-23': {
          dots: [event5],
          disabled: false,
          selected: true,
          selectedColor: colors.orange,
        },
      }}
      // For custom styling the Days this below param
      /*
        dayComponent={({date, state}) => {
            return (
            <View>
                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
            </View>
            );
        }}
    */
    />
  );
};

export default CalendarView;
