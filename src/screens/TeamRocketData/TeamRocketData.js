import React from 'react';
import {View, Text, SafeAreaView, Image, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles.js';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import {pokeImageMappingFunction} from '../../ultilities/commonFunctions';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
import fontFamily from '../../ultilities/fontFamily.js';
import teamRocketData from '../../ultilities/mockData/teamRocketData.json';

const TeamRocketData = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {navigation} = props;
  const teamRocketDataValue = teamRocketData?.data;

  const backgroundColorDecider = item => {
    if (item?.level === 'boss') {
      return {
        backgroundColor: colors?.tertiaryBackgroundColorDarkMode,
        textColor: colors?.secondaryRedColor,
        borderColor: colors?.white,
        fontFamily: fontFamily?.primaryFontFamilyBold,
      };
    } else if (item?.level === 'leader') {
      return {
        backgroundColor: colors?.orange2,
        textColor: colors?.black,
        borderColor: colors?.white,
        fontFamily: fontFamily?.primaryFontFamilyBold,
      };
    } else {
      return {
        backgroundColor: colors?.secondaryRedColor,
        textColor: colors?.white,
        borderColor: colors?.white,
        fontFamily: fontFamily?.primaryFontFamilyBold,
      };
    }
  };

  const imageDecider = item => {
    if (item?.name === 'Giovanni') {
      return imagePaths?.Giovanni;
    } else if (item?.name === 'Cliff') {
      return imagePaths?.Cliff;
    } else if (item?.name === 'Arlo') {
      return imagePaths?.Arlo;
    } else if (item?.name === 'Sierra') {
      return imagePaths?.Sierra;
    } else {
      if (item?.level === 'grunt') {
        if (item?.gender === 'male') {
          return imagePaths?.maleGrunt;
        } else if (item?.gender === 'female') {
          return imagePaths?.femaleGrunt;
        }
      } else {
        return {uri: item?.image};
      }
    }
  };
  const renderPokemonPossibilities = ({item, index}) => {
    const {possibilePokemons, pokemonLevel} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: -30,
            marginLeft: 20,
            fontSize: 24,
            fontFamily: fontFamily?.primaryFontFamilyBold,
            color: colors?.white,
          }}>
          L{pokemonLevel}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {possibilePokemons?.map((val, idx) => {
            return (
              <View>
                <Image
                  source={{uri: pokeImageMappingFunction(val?.image)}}
                  height={80}
                  width={80}
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: colors?.white,
                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colors?.purple,
                  }}
                />
                {val?.shiny ? (
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
                <View
                  style={{
                    alignSelf: 'center',
                    width: 80,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fontFamily?.primaryFontFamilyRegular,
                      color: colors?.white,
                    }}>
                    {val?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {val?.pokeType?.map((tyepVal, typeIdx) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                          }}>
                          <Image
                            source={{uri: pokeTypesData[tyepVal]}}
                            height={1}
                            width={1}
                            resizeMode={'contain'}
                            style={{height: 12, width: 12, marginLeft: 2}}
                          />
                          <Text
                            style={{
                              color: colors.white,
                              fontFamily: fontFamily?.primaryFontFamilyRegular,
                              fontSize: 8,
                              marginLeft: 1,
                            }}>
                            {tyepVal}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderPokemonsPossibilityDisplayerSection = item => {
    return (
      <View style={{marginTop: 5}}>
        <FlatList
          data={item?.pokemons}
          keyExtractor={item => item?.id}
          renderItem={renderPokemonPossibilities}
        />
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: backgroundColorDecider(item)?.backgroundColor,
            height: 80,
            marginTop: 40,
            marginHorizontal: 5,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 15,
                color: backgroundColorDecider(item)?.textColor,
                fontFamily: backgroundColorDecider(item)?.fontFamily,
                textTransform: 'uppercase',
                width: 250,
                fontSize: 16,
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                color: backgroundColorDecider(item)?.textColor,
                fontFamily: fontFamily?.primaryFontFamilyRegular,
                fontSize: 12,
                width: 250,
              }}>
              "{item?.description}"
            </Text>
          </View>
          <Image
            source={imageDecider(item)}
            height={100}
            width={100}
            resizeMethod="contain"
            style={{
              height: 110,
              width: 110,
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          />
        </View>
        {renderPokemonsPossibilityDisplayerSection(item)}
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
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={imagePaths?.teamRocketRadarGiovanni}
          height={100}
          width={100}
          style={{height: 100, width: 100}}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily?.primaryFontFamilyMedium,
            color: colors?.white,
            textTransform: 'uppercase',
          }}>
          Team Rocket Lineup
        </Text>
      </View>
      <View style={{height: '75%', marginBottom: 20}}>
        <FlatList
          data={teamRocketDataValue}
          keyExtractor={item => item}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
export default TeamRocketData;

/*

 <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                paddingRight: 20,
                paddingVertical: 5,
                borderRadius: 20,
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                source={{
                  uri: pokeTypesData[pokemonData?.type1],
                }}
                height={24}
                width={24}
                style={{
                  width: 24,
                  height: 24,
                  alignSelf: 'center',
                  marginLeft: 10,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: fontFamily?.primaryFontFamilySemiBold,
                }}>
                {pokemonData?.type1}
                </Text>
                </View>

*/
