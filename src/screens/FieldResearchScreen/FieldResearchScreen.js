import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import CardView from '../../components/CardView/CardView';
import {pokeImageMappingFunction} from '../../ultilities/commonFunctions';
import mockFieldResearchData from '../../ultilities/pokemonData/mock_field_research_data.json';
import imagePaths from '../../constants/imagePaths';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import styles from './styles.js';

const FieldResearchScreen = props => {
  // const dispData = mockFieldResearchData?.data;

  const springAnimationVariable = useRef(new Animated.Value(0)).current;

  const [displayData, setDisplayData] = useState([]);
  const [rewardSectionDisplay, setRewardSectionDisplay] = useState([]);

  useEffect(() => {
    const dispData = mockFieldResearchData?.data;
    setDisplayData(dispData);
  }, []);

  const handleSpringAnimation = (rewardsArray, selectedReward) => {
    const allowAnimation = rewardsArray?.includes(selectedReward);
    console.log('allowAnimation', allowAnimation, rewardsArray);
    springAnimationVariable.setValue(0.75);
    Animated.spring(springAnimationVariable, {
      toValue: allowAnimation ? 1 : 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const displayRewards = eventItem => {
    const tempRewardsSectionDisplay = rewardSectionDisplay;
    let tempArray = [];

    if (tempRewardsSectionDisplay.includes(eventItem?.researchtDescription)) {
      tempArray = tempRewardsSectionDisplay.filter(
        obj => obj !== eventItem?.researchtDescription,
      );
      setRewardSectionDisplay(tempArray);
    } else {
      tempArray = [
        ...tempRewardsSectionDisplay,
        eventItem?.researchtDescription,
      ];
      setRewardSectionDisplay(tempArray);
      handleSpringAnimation(tempArray, eventItem?.researchtDescription);
    }
  };

  const fieldResearchCardContainer = item => {
    return (
      <View style={{}}>
        <View style={styles.researchHeaderStyle}>
          <Text style={styles.researchHeaderText}>{item?.researchName}</Text>
        </View>
        {item?.events?.map((eventItem, eventIdx) => {
          /* ANIMATED EXPANDING CARD */
          /* THIS SHOULD BE ANOTHER FLAT LIST. See if mapping is enough*/

          const displayableImages = pokeImageMappingFunction(eventItem);

          // console.log('displayableImages 12345', displayableImages);

          return (
            <View style={styles.researchBodyStyle}>
              <TouchableOpacity
                onPress={() => {
                  const tempRewardsSectionDisplay = rewardSectionDisplay;
                  let tempArray = [];

                  if (
                    tempRewardsSectionDisplay.includes(
                      eventItem?.researchtDescription,
                    )
                  ) {
                    tempArray = tempRewardsSectionDisplay.filter(
                      obj => obj !== eventItem?.researchtDescription,
                    );
                    setRewardSectionDisplay(tempArray);
                  } else {
                    tempArray = [
                      ...tempRewardsSectionDisplay,
                      eventItem?.researchtDescription,
                    ];
                    setRewardSectionDisplay(tempArray);
                    handleSpringAnimation(
                      tempArray,
                      eventItem?.researchtDescription,
                    );
                  }
                }}
                // onPress={displayRewards(eventItem)}
              >
                <View
                  style={
                    rewardSectionDisplay.includes(
                      eventItem?.researchtDescription,
                    )
                      ? styles.researchtDescriptionView2
                      : styles.researchtDescriptionView
                  }>
                  <Text
                    style={
                      rewardSectionDisplay.includes(
                        eventItem?.researchtDescription,
                      )
                        ? styles.researchtDescriptionText2
                        : styles.researchtDescriptionText
                    }>
                    {eventItem?.researchtDescription}
                  </Text>
                  {!rewardSectionDisplay.includes(
                    eventItem?.researchtDescription,
                  ) ? (
                    <View style={styles.eventsItemNumber}>
                      <Text style={styles.numberOfEventsText}>
                        {eventItem?.imgSrc?.length}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              {rewardSectionDisplay.includes(
                eventItem?.researchtDescription,
              ) ? (
                <Animated.View
                  style={[
                    styles.researchtDescriptionBody,
                    {
                      // transform: [{translateY: springAnimationVariable}],
                      transform: [{scale: springAnimationVariable}],
                    },
                  ]}>
                  <Text style={styles.possibleRewardsText}>
                    Possible Rewards
                  </Text>
                  {/* One more flat list or perhaps mapping is enough here */}
                  {displayableImages?.map((val, idx) => {
                    console.log('displayableImages 12345', idx, '-', val);
                    return (
                      <View style={styles.rewardsSection}>
                        <View style={commonStyling?.flexRow}>
                          <View style={styles.rewardCircle}>
                            <Image
                              source={{uri: val}}
                              height={1}
                              width={1}
                              resizeMode={'contain'}
                              style={styles.rewardImageDisplay}
                            />
                            {eventItem?.shiny?.[idx] ? (
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
                          <Text style={styles.rewardText}>
                            {eventItem?.rewardNames[idx]}
                          </Text>
                        </View>
                        <View style={styles.rewardQuantity}>
                          {eventItem?.combatPower[idx] !== '0' ? (
                            <Text style={styles.rewardTextQuantitytext}>
                              CP : {eventItem?.combatPower?.[idx]}
                            </Text>
                          ) : null}
                          {eventItem?.quantity[idx] !== '0' ? (
                            <Text style={styles.rewardTextQuantitytext}>
                              {' '}
                              x {eventItem?.quantity?.[idx]}
                            </Text>
                          ) : null}
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
    <View style={{}}>
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

/*
{item?.Bonus?.length > 1 ? (
            <View style={[styles.bonusTextView, {width: horizontalScale(110)}]}>
              <Text numberOfLines={1} style={styles.bonusTextStyle}>
                {item?.Bonus?.[1]}
              </Text>
            </View>
          ) : null}
          {item?.Bonus?.length > 2 ? (
            <View style={[styles.bonusTextView]}>
              <Text numberOfLines={1} style={styles.bonusTextStyle}>
                {item?.Bonus?.length - 2}
                {strings.plus}
              </Text>
            </View>
          ) : null}
*/
