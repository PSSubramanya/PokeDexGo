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
        'This app is a poke guide that is built on the basis of PokemonGo Game.',
    },
    {
      id: 2,
      description:
        'It is built with the intention of keeping track of all the events, egg data and field researches that we have on a daily basis',
    },
    {
      id: 3,
      description:
        "Every event that is available for the selected date will be displayed in the event's list even if it has been started a few days ago.",
    },
    {
      id: 4,
      description:
        'It is also displayed keeping the priority of duration of the event in mind in such a way that the events with longer duration span or the ones that last for a lot of days in the season will go down in the list and the events which lasts for shorter span will be displayed on the top',
    },
    {
      id: 5,
      description:
        'A calandar is being installed in the application to let to the user check the events by changing the date, month or year',
    },
    {
      id: 6,
      description:
        "The app only provides the data that we have for the current season. After a season, the data of previous season won't be available",
    },
    {
      id: 7,
      description:
        'The App also provides seasonal egg data for 2,5,7,10,12 Km. eggs for both normal and special categories like alolan eggs',
    },
    {
      id: 8,
      description: 'We also have the seasonal Field Research data available',
    },
    {
      id: 9,
      description:
        'Finished events will also be denoted until the data gets refreshed.',
    },
    {
      id: 10,
      description:
        'Shiny Pokemons and all the pokemons available in its respective variations for every event will be shown to the user in the events section',
    },
  ];

  const futurePoints = [
    {
      id: 1,
      description:
        'In the upcoming versions of the application we are having a few interesting ideas to make it better',
    },
    {
      id: 2,
      description:
        'We will implement pus notification so that the app not only shows us the events but also notifies the user about the event in advance.',
    },
    {
      id: 3,
      description:
        'In the upcoming versions of the app, we are planning to maintain even the older events information, even if the season is finished and the data is rewritten. This might help the users to analyse their own strategies.',
    },
    {
      id: 4,
      description:
        'In the upcoming versions of the app, we will allow the user to add his own events that the user wants to be reminded about. For eg. If one wants to trade a particular pokemon on a special day during some special event, that user can add minimum description and add the event/task details and get reminded in similar way as other events.',
    },
    {
      id: 5,
      description:
        'Many more things to come into the app in the nearby future.',
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
