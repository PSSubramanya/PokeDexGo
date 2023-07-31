import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles.js';
import imagePaths from '../../constants/imagePaths.js';
import strings from '../../constants/strings.js';
import colors from '../../constants/colors.js';
import commonStyling from '../../ultilities/commonStyling/commonStyling.js';

const TrainerInfoScreen = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const bulletPoints = [
    {
      id: 1,
      description:
        'This app is a poke guide that is built on the basis of PokemonGo.',
    },
    {
      id: 2,
      description:
        'It is built with the intention of keeping track of all the events, egg data and field researches that we have on a daily basis.',
    },
    {
      id: 3,
      description:
        "Every event that is available for the selected date will be displayed in the event's list.",
    },
    {
      id: 4,
      description:
        'It is also displayed keeping the priority of the duration of an event in mind, shorter duration in ascending order.',
    },
    {
      id: 5,
      description:
        'The Calendar is installed in the application to let the users check for events by changing the date, month or year.',
    },
    {
      id: 6,
      description:
        "This app only provides data in sync with the current season, previous seasons' information will not be available.",
    },
    {
      id: 7,
      description:
        'This app also provides egg hatching data for 2,5,7,10,12 Kms of the current season.',
    },
    {
      id: 8,
      description: 'We also have the seasonal Raid Boss data available',
    },
    {
      id: 9,
      description:
        'Completed events will also be displayed until the data gets refreshed.',
    },
    {
      id: 10,
      description:
        'Pokemons and its variations in accordance to an event will be displayed appropriately.',
    },
  ];

  const futurePoints = [
    {
      id: 1,
      description:
        'We will implement push notification to inform the users in a timely manner about the upcoming events.',
    },
    {
      id: 2,
      description:
        'We will maintain the data of events completed in the previous seasons.',
    },
    {
      id: 3,
      description:
        'We will allow users to add their own events for which they want to be reminded of.',
    },
    {
      id: 4,
      description:
        'We will also have the seasonal field research data available.',
    },
  ];

  const renderAppPoints = (item, index) => {
    return (
      <View style={commonStyling.flexRow}>
        <View
          style={[
            styles.paginationDots,
            {
              backgroundColor: colors.purple,
            },
          ]}
        />
        <Text
          style={[
            styles.bulletPoints,
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.secondaryColor,
            },
          ]}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColorDarkMode
          : null,
      }}>
      <Image
        source={imagePaths.appIcon}
        height={1}
        width={1}
        style={styles.appIcon}
      />
      <Text
        style={[
          styles.appName,
          {
            color: darkModeValue
              ? colors.primaryTextColorDarkMode
              : colors.secondaryColor,
          },
        ]}>
        {strings.app_name}
      </Text>
      <Text
        style={[
          styles.appVersion,
          {
            color: darkModeValue
              ? colors.primaryTextColorDarkMode
              : colors.secondaryColor,
          },
        ]}>
        {strings.app_version}
      </Text>
      {bulletPoints.map((item, index) => {
        return renderAppPoints(item);
      })}
      <Text style={[styles.upcomingPoints, styles.secondaryColorStyle]}>
        {strings.futureImplementations}
      </Text>
      {futurePoints.map((item, index) => {
        return renderAppPoints(item);
      })}
      <View style={styles.itemSeparator} />
    </ScrollView>
  );
};
export default TrainerInfoScreen;
