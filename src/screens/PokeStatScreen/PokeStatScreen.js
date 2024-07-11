import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
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
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState('');
  // const [pokemonTouched, setPokemonTouched] = useState(false);
  /* If pokemon touched gets gif up to date//https://www.pkparaiso.com/imagenes/xy/sprites/animados/charizard-3.gif */

  //TODO:
  // Let left and right arrow also to go to previous and next pokemon in the list
  // So consider current item and search for its index and then based on that get the next and previous item on click of those left and right icons
  // Arrow and candy for evolution

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  useEffect(() => {
    const tempName = pokeStatData?.pokemonStatsData?.pokemon_name;
    setPokemonName(tempName);
    setPokemonData(pokeStatData);
  }, [pokeStatData]);

  useEffect(() => {
    const val = loadEvolutions(pokemonName);
    setPokemonData(val);
    let temporaryEvolutionChart;
    temporaryEvolutionChart = val?.evolutionChart;
    setEvolutionChart(temporaryEvolutionChart);
  }, [pokemonName]);

  const loadEvolutions = pokeName => {
    return evolutionData?.data?.[pokeName];
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
        <View
          style={{
            height: 100,
            marginTop: Platform?.OS === 'android' ? -40 : null,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}>
            <Image
              source={imagePaths.leftChevronIcon}
              style={{
                height: 25,
                width: 25,
                marginTop: 50,
                marginLeft: 30,
              }}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 30,
            zIndex: 2,
            marginTop: Platform?.OS === 'android' ? -10 : null,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                backgroundColor: 'white',
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Image
                source={imagePaths.leftChevronIcon}
                height={15}
                width={15}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </View>
          </TouchableOpacity>
          <Image
            style={{
              width: 1,
              height: 1,
              marginTop: 20,
              zIndex: 1,
              alignSelf: 'center',
            }}
            height={160}
            width={160}
            resizeMode="contain"
            source={{
              uri: !shinyVersion
                ? `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemonData?.pokemon_name?.toLowerCase()}.gif`
                : `https://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/${pokemonData?.pokemon_name?.toLowerCase()}.gif`,
            }}
          />
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                backgroundColor: 'white',
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Image
                source={imagePaths.rightChevronIcon}
                height={15}
                width={15}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          backgroundColor: pokedexBackgroundDisplayColor(pokemonData?.type1),
          marginTop: -120,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 140,
          }}>
          <Text
            style={{
              marginTop: 0,
              zIndex: 1,
              marginLeft: 10,
              fontSize: 24,
              fontFamily: fontFamily?.primaryFontFamilyBold,
              color: colors?.white,
            }}>
            {pokemonData?.pokemon_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <TouchableOpacity
              onPress={() => {
                setShinyVersion(false);
              }}>
              <Image
                source={imagePaths?.pokeBallIcon}
                height={24}
                width={24}
                style={{
                  width: 24,
                  height: 24,
                  alignSelf: 'center',
                  marginLeft: 10,
                  borderWidth: !shinyVersion ? 3 : 0,
                  borderColor: colors?.secondaryBlueColor,
                  borderRadius: 25,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShinyVersion(true);
              }}>
              <Image
                source={imagePaths?.masterBallIcon}
                height={24}
                width={24}
                style={{
                  width: 24,
                  height: 24,
                  alignSelf: 'center',
                  marginLeft: 10,
                  borderWidth: shinyVersion ? 3 : 0,
                  borderColor: colors?.secondaryBlueColor,
                  borderRadius: 25,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          #{pokedexID(pokemonData?.pokemon_id?.toString())}
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
              {toCamelCase(pokeStatData?.pokemonStatsData?.type1)}
            </Text>
          </View>
          {pokemonData?.type2 !== 'none' ? (
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
                  uri: pokeTypesData[pokemonData?.type2],
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
          {pokemonData?.description}
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
                      <TouchableOpacity
                        onPress={() => {
                          setPokemonName(dat?.name);
                        }}>
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
                      </TouchableOpacity>
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
