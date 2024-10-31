import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import pokeAttackTypeData from '../../ultilities/pokemonData/pokeAttackTypeData.json';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import fontFamily from '../../ultilities/fontFamily.js';
import imagePaths from '../../constants/imagePaths.js';
import strings from '../../constants/strings.js';

//TODO:
/*
In info section, based on selected type, directly display info from json file pictorially and in chart, attacks, defence and chart

In compare section
For a single type anyhow we have the attack and defence chart directly show that for selected pokemon
For dual type, first calculate general defence by checking types/defence stats
DEFENCE: (From defence chart/stats/json values for types)
2 for super effective type,
4 -> this means super effective for both types
0.5 for not very effective
0.25 -> This means not effective for both types
0 -> no effect
1 -> For rest


ATTACK: (From attack chart/stats/json values for types)
2 for super effective type,
4 -> this means super effective for both types
0.5 for not very effective
0.25 -> This means not effective for both types
0 -> no effect
1 -> For rest

Then above these two, display the same calculation for the selected 2 pokemon.
(Take <number> directly from offence chart)
Eg:
Type 1 of my pokemon has <number> points against type 1 of o/p pokemon
Type 1 of my pokemon has <number> points against type 2 of o/p pokemon
Type 2 of my pokemon has <number> points against type 1 of o/p pokemon
Type 2 of my pokemon has <number> points against type 2 of o/p pokemon

Type 1 of o/p pokemon has <number> points against type 1 of my pokemon
Type 1 of o/p pokemon has <number> points against type 2 of my pokemon
Type 2 of o/p pokemon has <number> points against type 1 of my pokemon
Type 2 of o/p pokemon has <number> points against type 2 of my pokemon

Poke 1 points - Poke 2 Points
If the answer is positive then Poke 1 is winner, else Poke 2 is winner

Same for 1 vs 6, but here comparison between each vs the raid boss and score goes for each of them

*/

const PokeAttackTypeCalculator = props => {
  let typesStats = {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 1,
    fairy: 1,
  };

  // let verySuperEffectiveArray = [];
  // let superEffectiveArray = [];
  // let normalEffectiveArray = [];
  // let notVeryEffective = [];
  // let notVeryEffectiveTwoTimes = [];
  // let noEffectArray = [];

  const selectedPokemonData = useSelector(
    state => state?.pokemonSelectionReducer?.pokemonSelectionValue,
  );
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {navigation} = props;

  const pokeCalculatorData = pokeAttackTypeData?.data;

  const [changeButtonTitle, setChangeButtonTitle] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(0);

  const [pokemonSlot1, setPokemonSlot1] = useState('');
  const [pokemonSlot2, setPokemonSlot2] = useState('');
  const [pokemonSlot3, setPokemonSlot3] = useState('');
  const [pokemonSlot4, setPokemonSlot4] = useState('');
  const [pokemonSlot5, setPokemonSlot5] = useState('');
  const [pokemonSlot6, setPokemonSlot6] = useState('');
  const [pokemonSlotRaid, setPokemonSlotRaid] = useState('');

  const [typesStatForDefenceValues, setTypesStatForDefenceValues] = useState(
    {},
  );

  const [verySuperEffectiveArray, setVerySuperEffectiveArray] = useState([]);
  const [superEffectiveArray, setSuperEffectiveArray] = useState([]);
  const [normalEffectiveArray, setNormalEffectiveArray] = useState([]);
  const [notVeryEffective, setNotVeryEffectiveArray] = useState([]);
  const [notVeryEffectiveTwoTimes, setNotVeryEffectiveTwoTimesArray] = useState(
    [],
  );
  const [noEffectArray, setNoEffectArray] = useState([]);

  useEffect(() => {
    console.log('changeButtonTitle', changeButtonTitle);
  }, [changeButtonTitle]);

  useEffect(() => {
    if (currentSlot === 1) {
      const image1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.imageSrc;
      const name1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.pokemon_name;
      const type1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.type1;
      const type2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.type2 ??
        'none';
      const objectValue = {
        image: image1,
        name: name1,
        type1: type1,
        type2: type2,
      };
      setPokemonSlot1(objectValue);
    } else if (currentSlot === 2) {
      const image2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.imageSrc;
      const name2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.pokemon_name;
      const type1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.type1;
      const type2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.type2 ??
        'none';
      const objectValue = {
        image: image2,
        name: name2,
        type1: type1,
        type2: type2,
      };
      setPokemonSlot2(objectValue);
    }
  }, [selectedPokemonData, currentSlot]);

  useEffect(() => {
    if (pokemonSlot2 !== '') {
      calculateDefenseStats(pokemonSlot1?.type1, pokemonSlot1?.type2);
    }
  }, [pokemonSlot1, pokemonSlot2]);

  useEffect(() => {
    if (JSON?.stringify(typesStatForDefenceValues) !== JSON.stringify({})) {
      let verySuperEffectiveArrayValue = typesStatForDefenceValues?.filter(
        (val, ind) => {
          if (val?.weaknessCount >= 4) {
            return val;
          }
        },
      );

      let superEffectiveArrayValue = typesStatForDefenceValues?.filter(
        (val, ind) => {
          if (val?.weaknessCount === 2) {
            return val;
          }
        },
      );

      let normalEffectiveArrayValue = typesStatForDefenceValues?.filter(
        (val, ind) => {
          if (val?.weaknessCount === 1) {
            return val;
          }
        },
      );

      let notVeryEffectiveValue = typesStatForDefenceValues?.filter(
        (val, ind) => {
          if (val?.weaknessCount === 0.5) {
            return val;
          }
        },
      );

      let notVeryEffectiveTwoTimesValue = typesStatForDefenceValues?.filter(
        (val, ind) => {
          if (val?.weaknessCount <= 0.25 && val?.weaknessCount > 0) {
            return val;
          }
        },
      );

      let noEffectArrayValue = typesStatForDefenceValues?.filter((val, ind) => {
        if (val?.weaknessCount === 0) {
          return val;
        }
      });
      setVerySuperEffectiveArray(verySuperEffectiveArrayValue);
      setSuperEffectiveArray(superEffectiveArrayValue);
      setNormalEffectiveArray(normalEffectiveArrayValue);
      setNotVeryEffectiveArray(notVeryEffectiveValue);
      setNotVeryEffectiveTwoTimesArray(notVeryEffectiveTwoTimesValue);
      setNoEffectArray(noEffectArrayValue);
    }
  }, [typesStatForDefenceValues]);

  const calculateDefenseStats = (type1, type2) => {
    const typesStatForDefence = typesStats;
    const tempArray = [];
    pokeCalculatorData[type1]?.typesSuperEffective?.map((val, idx) => {
      if (typesStatForDefence?.[val] === 1) {
        typesStatForDefence[val] = 2;
      } else {
        typesStatForDefence[val] *= 2;
      }
    });

    pokeCalculatorData[type1]?.typesWithNoEffect?.map((val, idx) => {
      typesStatForDefence[val] = 0;
    });

    pokeCalculatorData[type1]?.typesNotVeryEffective?.map((val, idx) => {
      if (typesStatForDefence?.[val] === 1) {
        typesStatForDefence[val] = 0.5;
      } else {
        typesStatForDefence[val] /= 2;
      }
    });

    if (type2 !== 'none') {
      pokeCalculatorData[type2]?.typesSuperEffective?.map((val, idx) => {
        if (typesStatForDefence?.[val] === 1) {
          typesStatForDefence[val] = 2;
        } else {
          typesStatForDefence[val] *= 2;
        }
      });

      pokeCalculatorData[type2]?.typesWithNoEffect?.map((val, idx) => {
        typesStatForDefence[val] = 0;
      });

      pokeCalculatorData[type2]?.typesNotVeryEffective?.map((val, idx) => {
        if (typesStatForDefence?.[val] === 1) {
          typesStatForDefence[val] = 0.5;
        } else {
          typesStatForDefence[val] /= 2;
        }
      });
    }

    for (const [key, value] of Object.entries(typesStatForDefence)) {
      const tempObject = {
        pokemonType: key,
        weaknessCount: value,
      };
      tempArray?.push(tempObject);
    }

    setTypesStatForDefenceValues(tempArray);
  };

  const infoForSingleAndDualTypes = () => {
    // Single typing info
    // Dual typing info - VIA CHART VIEW is best
    // Show all pokemons of a selected type
    // How many is super effective against it and weak or not very effective against it
    // Display them all if required based on pokedex once pokedex is built
  };

  const pokeComparisonCalculator = () => {
    // two boxes vs
    // name and type info
    // best attacks to use if possible
    // Use raid scenario 1 vs 6 for same concept
    // Which pokemons I have can be used and how effective they are against a selected one

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View>
          <Text
            style={{
              color: colors?.white,
              fontFamily: fontFamily?.primaryFontFamilyMedium,
              textAlign: 'center',
            }}>
            YOUR CHOICE
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentSlot(1);
              navigation?.navigate('PokedexScreen', {
                comingFrom: 'pokeCalculator',
                pokeSlot: currentSlot,
              });
            }}
            style={{marginTop: 10}}>
            <View>
              <View
                style={{
                  height: 130,
                  width: 130,
                  borderWidth: 4,
                  borderRadius: 8,
                  backgroundColor: colors?.white,
                  borderColor: colors?.secondaryRedColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: pokemonSlot1?.image,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  width={100}
                  height={100}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: colors?.white,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
              }}>
              {pokemonSlot1?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: pokeTypesData[pokemonSlot1?.type1]}}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={{height: 12, width: 12, marginLeft: 2}}
                />
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: fontFamily?.primaryFontFamilyRegular,
                    fontSize: 10,
                    marginLeft: 1,
                  }}>
                  {pokemonSlot1?.type1}
                </Text>
              </View>
              {pokemonSlot1?.type2 !== 'none' && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 3,
                  }}>
                  <Image
                    source={{uri: pokeTypesData[pokemonSlot1?.type2]}}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={{height: 12, width: 12, marginLeft: 2}}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fontFamily?.primaryFontFamilyRegular,
                      fontSize: 10,
                      marginLeft: 1,
                    }}>
                    {pokemonSlot1?.type2 !== 'none' ? pokemonSlot1?.type2 : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <Image
          source={imagePaths?.vsIcon2}
          style={{
            height: 100,
            width: 100,
            marginTop: 40,
          }}
          width={100}
          height={100}
        />

        <View>
          <Text
            style={{
              color: colors?.white,
              fontFamily: fontFamily?.primaryFontFamilyMedium,
              textAlign: 'center',
            }}>
            O/P CHOICE
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentSlot(2);
              navigation?.navigate('PokedexScreen', {
                comingFrom: 'pokeCalculator',
                pokeSlot: currentSlot,
              });
            }}
            style={{marginTop: 10}}>
            <View>
              <View
                style={{
                  height: 130,
                  width: 130,
                  borderWidth: 4,
                  borderRadius: 8,
                  backgroundColor: colors?.white,
                  borderColor: colors?.purple,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: pokemonSlot2?.image,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  width={100}
                  height={100}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: colors?.white,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
              }}>
              {pokemonSlot2?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: pokeTypesData[pokemonSlot2?.type1]}}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={{height: 12, width: 12, marginLeft: 2}}
                />
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: fontFamily?.primaryFontFamilyRegular,
                    fontSize: 10,
                    marginLeft: 1,
                  }}>
                  {pokemonSlot2?.type1}
                </Text>
              </View>
              {pokemonSlot2?.type2 !== 'none' && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 3,
                  }}>
                  <Image
                    source={{uri: pokeTypesData[pokemonSlot2?.type2]}}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={{height: 12, width: 12, marginLeft: 2}}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fontFamily?.primaryFontFamilyRegular,
                      fontSize: 10,
                      marginLeft: 1,
                    }}>
                    {pokemonSlot2?.type2 !== 'none' ? pokemonSlot2?.type2 : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View></View>
      </View>
    );
  };

  const buttonView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            setChangeButtonTitle(false);
          }}
          style={{}}>
          <View
            style={[
              styles?.bottomTabBar,
              {
                backgroundColor: !changeButtonTitle
                  ? colors?.purple
                  : colors?.tertiaryBackgroundColorDarkMode,
              },
            ]}>
            <Text
              style={{
                fontSize: 14,
                textTransform: 'uppercase',
                color: colors?.white,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
              }}>
              Info Section
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setChangeButtonTitle(true);
          }}
          style={{}}>
          <View
            style={[
              styles?.bottomTabBar,
              {
                backgroundColor:
                  changeButtonTitle === true
                    ? colors?.purple
                    : colors?.tertiaryBackgroundColorDarkMode,
              },
            ]}>
            <Text
              style={{
                fontSize: 14,
                textTransform: 'uppercase',
                color: colors?.white,
                fontFamily: fontFamily?.primaryFontFamilyMedium,
              }}>
              Calculate
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWeaknessStats = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginLeft: 5,
          borderWidth: 0.5,
          borderRadius: 2,
          borderColor: colors?.white,
          padding: 3,
          paddingRight: 10,
        }}>
        <Image
          source={{uri: pokeTypesData[item?.pokemonType]}}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={{height: 15, width: 15, marginLeft: 2, marginTop: 2}}
        />
        <Text
          style={{
            color: colors.white,
            fontFamily: fontFamily?.primaryFontFamilyRegular,
            fontSize: 15,
            marginLeft: 6,
          }}>
          {item?.pokemonType}
        </Text>
      </View>
    );
  };

  const defenceStatsView = () => {
    return (
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginRight: 20,
          backgroundColor: colors?.quaternaryBackgroundColorDarkMode,
          borderRadius: 5,
          paddingBottom: 20,
        }}>
        <Text
          style={{
            fontFamily: fontFamily?.primaryFontFamilyMedium,
            textTransform: 'uppercase',
            color: colors?.white,
            marginTop: 20,
            marginLeft: 10,
          }}>
          Defense
        </Text>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: colors?.white,
            marginTop: 5,
            marginHorizontal: 10,
          }}
        />

        {verySuperEffectiveArray?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 4 damage against:
            </Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
              {verySuperEffectiveArray?.map((val, idx) =>
                renderWeaknessStats(val, idx),
              )}
            </View>
          </>
        )}

        {superEffectiveArray?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 2 damage against:
            </Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
              {superEffectiveArray?.map((val, idx) =>
                renderWeaknessStats(val, idx),
              )}
            </View>
          </>
        )}

        {normalEffectiveArray?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 1 damage against:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: 5,
              }}>
              {normalEffectiveArray?.map((val, idx) =>
                renderWeaknessStats(val, idx),
              )}
            </View>
          </>
        )}

        {notVeryEffective?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 0.5 damage against:
            </Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
              {notVeryEffective?.map((val, idx) =>
                renderWeaknessStats(val, idx),
              )}
            </View>
          </>
        )}

        {notVeryEffectiveTwoTimes?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 0.25 damage against:
            </Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
              {notVeryEffectiveTwoTimes?.map((val, idx) =>
                renderWeaknessStats(val, idx),
              )}
            </View>
          </>
        )}

        {noEffectArray?.length !== 0 && (
          <>
            <Text
              style={{
                fontFamily: fontFamily?.primaryFontFamilyMedium,
                color: colors?.white,
                marginTop: 20,
                marginLeft: 10,
              }}>
              Takes x 0 damage against:
            </Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
              {noEffectArray?.map((val, idx) => renderWeaknessStats(val, idx))}
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColorDarkMode
          : colors?.white,
      }}>
      <SafeAreaView />
      <ScrollView>
        {changeButtonTitle
          ? pokeComparisonCalculator()
          : infoForSingleAndDualTypes()}
        {changeButtonTitle && pokemonSlot2 !== '' && defenceStatsView()}
      </ScrollView>
      {buttonView()}
    </View>
  );
};
export default PokeAttackTypeCalculator;
