import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import CardView from '../../components/CardView/CardView';
import {pokeImageMappingFunction} from '../../ultilities/commonFunctions';
import researchData from '../../ultilities/pokemonData/research.json';
import imagePaths from '../../constants/imagePaths';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import styles from './styles.js';
import colors from '../../constants/colors';
import {NotificationService} from '../../ultilities/services/notifications/notificationService';

const FieldResearchScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {loadData} = params;

  let eventTasks = [];
  let catchingTasks = [];
  let throwingTasks = [];
  let battleTasks = [];
  let exploreTasks = [];
  let trainingTasks = [];
  let rocketTasks = [];
  let buddyTasks = [];
  let sponsoredTasks = [];
  let scanningTasks = [];
  let otherTasks = [];

  const springAnimationVariable = useRef(new Animated.Value(0)).current;

  const [displayData, setDisplayData] = useState([]);
  const [rewardSectionDisplay, setRewardSectionDisplay] = useState([]);

  NotificationService(navigation);

  useEffect(() => {
    const dispData = loadData; //mockFieldResearchData?.data;
    setDisplayData(dispData);

    dispData?.map((dat, idx) => {
      if (dat?.type === 'event') {
        eventTasks.push(dat);
      } else if (dat?.type === 'explore') {
        exploreTasks.push(dat);
      } else if (dat?.type === 'catch') {
        catchingTasks.push(dat);
      } else if (dat?.type === 'throw') {
        throwingTasks.push(dat);
      } else if (dat?.type === 'battle') {
        battleTasks.push(dat);
      } else if (dat?.type === 'training') {
        trainingTasks.push(dat);
      } else if (dat?.type === 'rocket') {
        rocketTasks.push(dat);
      } else if (dat?.type === 'buddy') {
        buddyTasks.push(dat);
      } else if (dat?.type === 'sponsor') {
        sponsoredTasks.push(dat);
      } else if (dat?.type === 'scan') {
        scanningTasks.push(dat);
      } else {
        otherTasks.push(dat);
      }
    });

    const jsonData = [
      {
        researchName: 'Event Tasks',
        events: eventTasks,
      },
      {
        researchName: 'Catching Tasks',
        events: catchingTasks,
      },
      {
        researchName: 'Throwing Tasks',
        events: throwingTasks,
      },
      {
        researchName: 'Battling Tasks',
        events: battleTasks,
      },
      {
        researchName: 'Exploring Tasks',
        events: exploreTasks,
      },
      {
        researchName: 'Training Tasks',
        events: trainingTasks,
      },
      {
        researchName: 'Buddy & Friendship Tasks',
        events: buddyTasks,
      },
      {
        researchName: 'Sponsored Tasks',
        events: sponsoredTasks,
      },
      {
        researchName: 'Team GO Rocket Tasks',
        events: rocketTasks,
      },
      {
        researchName: 'AR Scanning Tasks',
        events: scanningTasks,
      },
      {
        researchName: 'Other Tasks',
        events: otherTasks,
      },
    ];

    setDisplayData(jsonData);
  }, []);

  const handleSpringAnimation = (rewardsArray, selectedReward) => {
    const allowAnimation = rewardsArray?.includes(selectedReward);
    console.log(
      'allowAnimation',
      allowAnimation,
      rewardsArray,
      selectedReward,
      rewardsArray?.[-1],
    );
    springAnimationVariable.setValue(0.75);
    Animated.spring(springAnimationVariable, {
      toValue: allowAnimation ? 1 : 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const fieldResearchCardContainer = item => {
    return (
      <View style={{backgroundColor: colors?.secondaryBackgroundColorDarkMode}}>
        {item?.events?.length > 0 ? (
          <View style={styles.researchHeaderStyle}>
            <Text style={styles.researchHeaderText}>{item?.researchName}</Text>
          </View>
        ) : null}
        {item?.events?.map((eventItem, eventIdx) => {
          /* ANIMATED EXPANDING CARD */
          /* THIS SHOULD BE ANOTHER FLAT LIST. See if mapping is enough*/

          return (
            <View style={styles.researchBodyStyle}>
              <TouchableOpacity
                onPress={() => {
                  const tempRewardsSectionDisplay = rewardSectionDisplay;
                  let tempArray = [];

                  if (tempRewardsSectionDisplay.includes(eventItem?.text)) {
                    tempArray = tempRewardsSectionDisplay.filter(
                      obj => obj !== eventItem?.text,
                    );
                    setRewardSectionDisplay(tempArray);
                  } else {
                    // NOTE: THIS BELOW FIRST COMMENTED CODE SNIPPET IS TO MAKE MULTIPLE EVENTS OPEN SIMULTANEOUSLY
                    // NOTE: THE ANIMATION HAS ISSUE HERE SO TEMPORARILY COMMENTED
                    /*
                    tempArray = [
                      ...tempRewardsSectionDisplay,
                      eventItem?.text,
                    ];
                    */
                    tempArray = [eventItem?.text];
                    setRewardSectionDisplay(tempArray);
                    handleSpringAnimation(tempArray, eventItem?.text);
                  }
                }}>
                <View
                  style={
                    rewardSectionDisplay.includes(eventItem?.text)
                      ? styles.researchtDescriptionView2
                      : styles.researchtDescriptionView
                  }>
                  <Text
                    style={
                      rewardSectionDisplay.includes(eventItem?.text)
                        ? styles.researchtDescriptionText2
                        : styles.researchtDescriptionText
                    }>
                    {eventItem?.text}
                  </Text>
                  {!rewardSectionDisplay.includes(eventItem?.text) ? (
                    <View style={styles.eventsItemNumber}>
                      <Text style={styles.numberOfEventsText}>
                        {eventItem?.rewards?.length}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              {rewardSectionDisplay.includes(eventItem?.text) ? (
                <Animated.View
                  style={[
                    styles.researchtDescriptionBody,
                    {
                      // transform: [{translateY: springAnimationVariable}],
                      transform: [{scaleY: springAnimationVariable}],
                    },
                  ]}>
                  <Text style={styles.possibleRewardsText}>
                    Possible Pokemon Rewards
                  </Text>
                  {/* One more flat list or perhaps mapping is enough here */}
                  {eventItem?.rewards?.map((val, idx) => {
                    return (
                      <View style={styles.rewardsSection}>
                        <View style={commonStyling?.flexRow}>
                          <View style={styles.rewardCircle}>
                            <Image
                              source={{
                                uri: pokeImageMappingFunction(val?.image),
                              }}
                              height={1}
                              width={1}
                              resizeMode={'contain'}
                              style={styles.rewardImageDisplay}
                            />
                            {val?.canBeShiny ? (
                              <View style={styles.shinyIconContainer}>
                                <Image
                                  source={imagePaths.shinyIcon}
                                  height={1}
                                  width={1}
                                  resizeMode={'contain'}
                                  style={styles.shinyIcon}
                                />
                              </View>
                            ) : null}
                          </View>
                          <Text style={styles.rewardText}>{val?.name}</Text>
                        </View>
                        <View style={styles.rewardQuantity}>
                          <Text style={styles.rewardTextQuantitytext}>
                            CP : {val?.combatPower?.min} -
                            {val?.combatPower?.max}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </Animated.View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <CardView
        innerView={fieldResearchCardContainer(item)}
        style={styles.cardInnerStyling}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors?.secondaryBackgroundColorDarkMode,
        flex: 1,
      }}>
      <SafeAreaView />
      <FlatList
        data={displayData}
        keyExtractor={item => item}
        renderItem={renderItem}
        // nestedScrollEnabled={true}
      />
    </View>
  );
};
export default FieldResearchScreen;
