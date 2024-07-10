import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors.js';
import fontFamily from '../../ultilities/fontFamily.js';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import evolutionData from '../../ultilities/pokemonData/poke_evolution_data.json';
import {toCamelCase} from '../../ultilities/commonFunctions.js';
import styles from './styles.js';

const PokeStatScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {pokeStatData} = params;
  const [shinyVersion, setShinyVersion] = useState(false);
  const [evolutionChart, setEvolutionChart] = useState([]);
  // const [pokemonTouched, setPokemonTouched] = useState(false);
  /* If pokemon touched gets gif up to date//https://www.pkparaiso.com/imagenes/xy/sprites/animados/charizard-3.gif */

  //TODO:
  // Let left and right arrow also to go to previous and next pokemon in the list
  // So consider current item and search for its index and then based on that get the next and previous item on click of those left and right icons

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  useEffect(() => {
    const val = loadEvolutions(pokeStatData?.pokemonStatsData?.pokemon_name);
    let temporaryEvolutionChart;
    temporaryEvolutionChart = val?.evolutionChart;
    console.log('valvalval', temporaryEvolutionChart);
    setEvolutionChart(temporaryEvolutionChart);
  });

  const loadEvolutions = pokemonName => {
    return evolutionData?.data?.[pokemonName];
  };

  const pokedexBackgroundDisplayColor = pokeType => {
    return colors?.[pokeType];
  };

  const pokedexID = id => {
    if (id?.length === 1) {
      return '00' + id;
    } else if (id?.length === 2) {
      return '0' + id;
    } else {
      return id;
    }
  };
  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : null,
        flex: 1,
      }}>
      <View
        style={{
          height: '30%',
          width: '110%',
          marginLeft: -22,
          //   marginTop: 20,
          backgroundColor: colors.secondaryBackgroundColorDarkMode,
          zIndex: 1,
          borderBottomLeftRadius: 200,
          borderBottomRightRadius: 200,
          //   borderRadius: 1000,
        }}>
        {/* <Image
          source={{
            uri: pokeTypesData['grass'],
            // uri: pokeTypesData[pdata],
          }}
          height={150}
          width={150}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
            alignSelf: 'center',
          }}
          resizeMode={'contain'}
        /> */}
        <Image
          style={{
            width: 1,
            height: 1,
            marginTop: 120,
            zIndex: 1,
            alignSelf: 'center',
            // marginTop: -125,
          }}
          height={160}
          width={160}
          resizeMode="contain"
          source={{
            uri: !shinyVersion
              ? `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokeStatData?.pokemonName?.toLowerCase()}.gif`
              : `https://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/${pokeStatData?.pokemonName?.toLowerCase()}.gif`,
          }}
        />
      </View>
      <View
        style={{
          height: '100%',
          backgroundColor: pokedexBackgroundDisplayColor(
            pokeStatData?.pokemonStatsData?.type1,
          ),
          marginTop: -120,
        }}>
        {/* <Image
          source={{
            uri: pokeTypesData['water'],
            // uri: pokeTypesData[pdata],
          }}
          height={150}
          width={150}
          style={{
            width: 150,
            height: 150,
            // marginTop: 120,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            flex: 1,
          }}
          resizeMode={'contain'}
        /> */}
        <Text
          style={{
            marginTop: 0,
            zIndex: 1,
            marginTop: 140,
            marginLeft: 10,
            fontSize: 24,
            fontFamily: fontFamily?.primaryFontFamilyBold,
            color: colors?.white,
          }}>
          {pokeStatData?.pokemonStatsData?.pokemon_name}
        </Text>
        <Text
          style={{
            marginTop: 0,
            zIndex: 1,
            marginTop: 5,
            marginLeft: 10,
            fontSize: 12,
            fontFamily: fontFamily?.primaryFontFamilyBold,
            color: colors?.white,
          }}>
          #{pokedexID(pokeStatData?.pokemonStatsData?.pokemon_id?.toString())}
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
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
                uri: pokeTypesData[pokeStatData?.pokemonStatsData?.type1],
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
              {toCamelCase(pokeStatData?.pokemonStatsData?.type1)}
            </Text>
          </View>
          {pokeStatData?.pokemonStatsData?.type2 !== 'none' ? (
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                paddingRight: 20,
                paddingVertical: 5,
                borderRadius: 20,
                alignItems: 'center',
                marginLeft: 10,
                backgroundColor: 'white',
              }}>
              <Image
                source={{
                  uri: pokeTypesData[pokeStatData?.pokemonStatsData?.type2],
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
                {toCamelCase(pokeStatData?.pokemonStatsData?.type2)}
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={{
            marginTop: 0,
            zIndex: 1,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 12,
            lineHeight: 20,
            fontFamily: fontFamily?.primaryFontFamilySemiBold,
            color: colors?.white,
          }}>
          {pokeStatData?.pokemonStatsData?.description}
        </Text>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={evolutionChart}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  {item?.map((dat, idx) => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'white',
                          marginTop: 30,
                          marginHorizontal: 10,
                          borderRadius: 5,
                          height: 100,
                          width: 100,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: dat?.img}}
                          style={{height: 75, width: 75}}
                          height={75}
                          width={75}
                        />
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 10,
                            fontFamily: fontFamily?.primaryFontFamilyMedium,
                          }}>
                          {dat?.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default PokeStatScreen;
