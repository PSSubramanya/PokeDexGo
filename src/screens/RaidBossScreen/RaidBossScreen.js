import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors.js';
import CardView from '../../components/CardView/CardView';
import {
  individualPokemonImageMapping,
  toCamelCase,
} from '../../ultilities/commonFunctions';
// import mockFieldResearchData from '../../ultilities/pokemonData/mock_field_research_data.json';
// import mockRaidBossData from '../../ultilities/pokemonData/mock_raid_boss_data.json';
import imagePaths from '../../constants/imagePaths';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import pokemonTypesData from '../../ultilities/pokemonData/pokemon_types';
import styles from './styles.js';
import {NotificationService} from '../../ultilities/services/notifications/notificationService.js';

const RaidBossScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {loadData} = params;

  const raidBossLevels = [
    'Tier 1',
    'Tier 2',
    'Tier 3',
    'Tier 4',
    'Tier 5',
    'Mega',
  ];

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const springAnimationVariable = useRef(new Animated.Value(0)).current;

  const [displayData, setDisplayData] = useState([]);
  const [loader, setLoader] = useState(true);

  NotificationService(navigation);

  useEffect(() => {
    // const dispData = mockFieldResearchData?.data;

    // const dispData = mockRaidBossData?.data; //
    const dispData = loadData; // //loadData
    console.log('RAID DATA', JSON.stringify(loadData));
    setDisplayData(dispData);
  }, []);

  /*

  useEffect(() => {
    setLoader(true);
    const dispData = loadData;
    setDisplayData(dispData);
    setLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  */

  const firstTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[0],
  );
  const secondTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[1],
  );
  const thirdTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[2],
  );
  const fourthTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[3],
  );
  const fiveTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[4],
  );
  const megaTierRaidArray = displayData?.filter(
    raidData => raidData?.tier === raidBossLevels[5],
  );

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

  const renderRaidBossViews = (tierTitle, tierData) => {
    return (
      <View>
        <View
          style={[
            styles.raidTierHeaderStyle,
            {
              backgroundColor: darkModeValue
                ? colors.purple
                : colors.vermillionLighter,
            },
          ]}>
          <Image
            source={imagePaths?.raidIcon}
            height={1}
            width={1}
            resizeMode={'contain'}
            style={styles.raidIcon}
          />
          <Text style={styles.tierHeaderStyle}>{tierTitle}</Text>
        </View>

        <FlatList
          contentContainerStyle={[
            styles.raidListStyle,
            {
              backgroundColor: darkModeValue ? null : colors.orangeLighter,
              borderColor: darkModeValue
                ? colors.secondaryColor
                : colors.orangeLight,
            },
          ]}
          data={tierData}
          keyExtractor={item => item}
          renderItem={({item, index}) => {
            return (
              <View style={styles.rewardsSection}>
                <View style={commonStyling?.flexRow}>
                  <View style={styles.rewardCircle}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('BattleCountersScreen', {
                          pokeImage: item?.image,
                          pokeName: item?.name,
                          pokeId: item?.pokeId,
                          pokeData: item,
                        });
                      }}>
                      <Image
                        source={{
                          uri: individualPokemonImageMapping(
                            item?.image,
                            item?.pokeId,
                            item?.name,
                          ),
                        }}
                        height={1}
                        width={1}
                        resizeMode={'contain'}
                        style={styles.raidBossImageDisplay}
                      />
                    </TouchableOpacity>
                    {item?.canBeShiny ? (
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
                  <View style={styles?.pokemonInfoSection}>
                    <Text
                      style={[
                        styles.rewardText,
                        {
                          color: darkModeValue
                            ? colors.white
                            : colors.bluishGrey,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                    {item?.types?.map((val, idx) => {
                      return (
                        <View
                          style={[
                            commonStyling.flexRow,
                            styles.pokemonTypeStyle,
                          ]}>
                          <Image
                            source={{
                              uri: val?.image,
                            }}
                            height={1}
                            width={1}
                            style={styles.pokemonTypeImageStyel}
                            resizeMode={'contain'}
                          />
                          <Text
                            style={[
                              styles.pokemonNameStyle,
                              {
                                color: darkModeValue
                                  ? colors.darkBlue
                                  : colors.vermillion,
                              },
                            ]}>
                            {val?.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View>
                  <View
                    style={[
                      styles.rewardQuantity,
                      {
                        borderColor: colors.purple,
                        backgroundColor: darkModeValue
                          ? colors.secondaryColor
                          : null,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.rewardTextQuantitytext,
                        {color: darkModeValue ? colors.white : colors.purple},
                      ]}>
                      CP : {item?.combatPower?.normal?.min} -
                      {item?.combatPower?.normal?.max}
                    </Text>
                  </View>
                  <View
                    style={[
                      commonStyling.flexRow,
                      styles.rewardQuantity,
                      {
                        borderColor: colors.boostedGreen,
                        backgroundColor: colors.boostedGreen,
                        alignItems: 'center',
                      },
                    ]}>
                    <View>
                      {item?.boostedWeather?.map((val, idx) => {
                        return (
                          <Image
                            source={{
                              uri: val?.image,
                            }}
                            height={1}
                            width={1}
                            style={styles.pokemonTypeImageStyel}
                            resizeMode={'contain'}
                          />
                        );
                      })}
                    </View>
                    <Text style={styles.boostedText}>
                      CP : {item?.combatPower?.boosted?.min} -
                      {item?.combatPower?.boosted?.max}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          // nestedScrollEnabled={true}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : null,
        flex: 1,
      }}>
      <SafeAreaView />
      <ScrollView style={styles.raidBossScrollPageStyle}>
        {firstTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[0], firstTierRaidArray)}
        {secondTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[1], secondTierRaidArray)}
        {thirdTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[2], thirdTierRaidArray)}
        {fourthTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[3], fourthTierRaidArray)}
        {fiveTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[4], fiveTierRaidArray)}
        {megaTierRaidArray?.length !== 0 &&
          renderRaidBossViews(raidBossLevels[5], megaTierRaidArray)}
      </ScrollView>
    </View>
  );
};
export default RaidBossScreen;
