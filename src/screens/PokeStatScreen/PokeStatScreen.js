import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
import fontFamily from '../../ultilities/fontFamily.js';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import evolutionData from '../../ultilities/pokemonData/poke_evolution_data.json';
import pokemon_alolan_variants from '../../ultilities/pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from '../../ultilities/pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from '../../ultilities/pokemonData/pokemon_hisuian_variants';
import pokemon_paldean_variants from '../../ultilities/pokemonData/pokemon_paldean_variants.js';
import {toCamelCase} from '../../ultilities/commonFunctions.js';
import styles from './styles.js';
import TextToSpeechConverter from '../../components/TextToSpeechConverter/TextToSpeechConverter.js';
import TypeWriterEffect from 'react-native-typewriter-effect';

const PokeStatScreen = props => {
  //Destructred Data
  const {navigation, route} = props;
  const {params} = route;
  const {pokeStatData} = params;

  //Constants and varibales
  const fullPokemonData = evolutionData?.data;
  const objKeysArray = Object.keys(fullPokemonData);
  let indexValue = -1;

  //State Values
  const [shinyVersion, setShinyVersion] = useState(false);
  const [evolutionChart, setEvolutionChart] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState('');
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [numOfLines, setNumOfLines] = useState(0);

  // const [pokemonTouched, setPokemonTouched] = useState(false);
  /* If pokemon touched gets gif up to date//https://www.pkparaiso.com/imagenes/xy/sprites/animados/charizard-3.gif */

  //TODO:
  // Add Item images along with candy icon for special evolutions like vaporeon etc.
  // Add Mega Evolution for the ones that have Mega Evolutions - DONE
  // URL for pokemon gifs: https://projectpokemon.org/home/docs/spriteindex_148/3d-models-generation-1-pok%C3%A9mon-r90/

  //Hooks
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const onTextLayout = useCallback(e => {
    if (numOfLines == 0) {
      console.log('NUMLINES', pokemonData?.description?.length); //e.nativeEvent.lines.length);
      // setNumOfLines(e.nativeEvent.lines.length);
      setNumOfLines(pokemonData?.description?.length);
    }
  });

  //useEffect
  useEffect(() => {
    const tempName = pokeStatData?.pokemonStatsData?.pokemon_name;
    setPokemonName(tempName);
    setPokemonData(pokeStatData);

    calculatePokemonIndex(tempName);
  }, [pokeStatData]);

  const pokemonDescriptionHeight = useMemo(() => {
    const descriptionLines = pokemonData?.description?.length / 57;
    let pokeDescHeight = Math.floor(descriptionLines) * 25;
    pokeDescHeight = pokeDescHeight + 25;
    return pokeDescHeight;
  }, [pokemonData]);

  useEffect(() => {
    const val = loadEvolutions(pokemonName);
    setPokemonData(val);
    let temporaryEvolutionChart;
    temporaryEvolutionChart = val?.evolutionChart;
    setEvolutionChart(temporaryEvolutionChart);
  }, [pokemonName]);

  useEffect(() => {
    setEvolutionChart([]);
    const tempPokeName = objKeysArray[selectedPokemonIndex];
    setPokemonName(tempPokeName);
  }, [selectedPokemonIndex]);

  //Functions
  const onLayout = e => {
    const {height} = e.nativeEvent.layout;
    // const count = Math.floor(height / styles.text.lineHeight);
    const count = Math.floor(height / 20);
    console.log('countcountcount', e.nativeEvent.layout, count);
  };

  const calculatePokemonIndex = tempName => {
    for (let i of objKeysArray) {
      if (i === tempName) {
        indexValue = objKeysArray.indexOf(i);
      }
    }
    setSelectedPokemonIndex(indexValue);
  };

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

  const arrowIcon = () => {
    return (
      <Image
        source={imagePaths?.blackArrowIcon}
        height={1}
        width={1}
        resizeMode={'contain'}
        style={{
          height: 40,
          width: 40,
          // borderWidth: 1,
          // backgroundColor: 'red',
        }}
        // style={styles.arrowIcon}
      />
    );
  };

  const renderImage = (pokemonIndex, form, pokemonImageString) => {
    let imageURL = !shinyVersion ? '' : '';

    if (shinyVersion) {
      if (form === 'alolan') {
        imageURL = pokemon_alolan_variants[pokemonIndex + 's'];
      } else if (form === 'galarian') {
        imageURL = pokemon_galarian_variants[pokemonIndex + 's'];
      } else if (form === 'hisuian') {
        imageURL = pokemon_hisuian_variants[pokemonIndex + 's'];
      } else if (form === 'paldean') {
        imageURL = pokemon_paldean_variants[pokemonIndex + 's'];
      } else {
        imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex}.png`;
      }
    } else {
      if (form === 'alolan') {
        imageURL = pokemon_alolan_variants[pokemonIndex + 'ev'];
      } else if (form === 'galarian') {
        imageURL = pokemon_galarian_variants[pokemonIndex + 'ev'];
      } else if (form === 'hisuian') {
        imageURL = pokemon_hisuian_variants[pokemonIndex + 'ev'];
      } else if (form === 'paldean') {
        imageURL = pokemon_paldean_variants[pokemonIndex + 'ev'];
      } else {
        imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;
      }
    }
    return imageURL;
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
          <TouchableOpacity
            onPress={() => {
              const currentIndex = selectedPokemonIndex;
              if (currentIndex > 0) {
                setSelectedPokemonIndex(currentIndex - 1);
              }
            }}>
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
            // source={{
            //   uri: !shinyVersion
            //     ? `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemonData?.pokemon_name?.toLowerCase()}.gif`
            //     : `https://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/${pokemonData?.pokemon_name?.toLowerCase()}.gif`,
            // }}
            source={{
              uri: renderImage(
                pokemonData?.pokemon_id,
                pokemonData?.form,
                pokemonData?.imageString,
              ),
            }}
            //https://img.pokemondb.net/artwork/large/pecharunt.jpg
            // Below URLs check for GENS after 7
            // source={{
            //   uri: !shinyVersion
            //     ? `https://projectpokemon.org/images/normal-sprite/${pokemonData?.pokemon_name?.toLowerCase()}.gif`
            //     : `https://projectpokemon.org/images/sprites-models/swsh-shiny-sprites/${pokemonData?.pokemon_name?.toLowerCase()}.gif`,
            // }}
          />
          <TouchableOpacity
            onPress={() => {
              const currentIndex = selectedPokemonIndex;
              if (currentIndex < objKeysArray?.length - 1) {
                setSelectedPokemonIndex(currentIndex + 1);
              }
            }}>
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
              {pokemonData?.type1}
              {/* {toCamelCase(pokemonData?.type1)} */}
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
                {pokemonData?.type2}
                {/* {toCamelCase(pokemonData?.type2)} */}
              </Text>
            </View>
          ) : null}
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <TextToSpeechConverter targetText={pokemonData?.description} />
          </View>
        </View>
        <View style={{height: 400}}>
          <ScrollView style={{marginTop: 10}}>
            {pokemonData?.description?.length > 0 ? ( // <View style={{height: 123, backgroundColor: 'red'}}></View>
              <TypeWriterEffect
                content={pokemonData?.description?.toString()}
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
                  height: pokemonDescriptionHeight,
                  // backgroundColor: 'red',
                }}
                maxDelay={1}
                onTextLayout={onTextLayout}
                onLayout={onLayout}
              />
            ) : null}
            <Text
              style={{
                marginTop: 0,
                zIndex: 1,
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                fontSize: 12,
                lineHeight: 20,
                fontFamily: fontFamily?.primaryFontFamilyBold,
                color: colors?.white,
                textTransform: 'uppercase',
                textDecorationLine: 'underline',
              }}>
              The evolution tree
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
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {dat?.candy_required !== 0 ? arrowIcon() : null}
                            <TouchableOpacity
                              onPress={() => {
                                calculatePokemonIndex(dat?.name);
                              }}>
                              <View
                                style={{
                                  // backgroundColor: 'white',
                                  marginTop: 30,
                                  // marginHorizontal: 10,
                                  borderRadius: 5,
                                  height: 120,
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
                                    fontFamily:
                                      fontFamily?.primaryFontFamilyMedium,
                                  }}>
                                  {dat?.name}
                                </Text>
                                {dat?.candy_required !== 0 ? (
                                  <View style={{flexDirection: 'row'}}>
                                    <Image
                                      source={imagePaths?.candyIcon}
                                      height={20}
                                      width={20}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        alignSelf: 'center',
                                      }}
                                      resizeMode={'contain'}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        fontFamily:
                                          fontFamily?.primaryFontFamilyMedium,
                                        marginTop: 3,
                                      }}>
                                      {dat?.candy_required}
                                    </Text>
                                  </View>
                                ) : null}
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  );
                }}
              />
            </View>
            {JSON.stringify(pokemonData?.megaEvolution1) !== '{}' ? (
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 10,
                  fontFamily: fontFamily?.primaryFontFamilyBold,
                  alignSelf: 'center',
                }}>
                MEGA EVOLUTIONS
              </Text>
            ) : null}
            {JSON.stringify(pokemonData?.megaEvolution1) !== '{}' ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: pokemonData?.megaEvolution1?.imageSrc}}
                    style={{height: 120, width: 120}}
                    height={120}
                    width={120}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 10,
                      fontFamily: fontFamily?.primaryFontFamilyMedium,
                    }}>
                    {pokemonData?.megaEvolution1?.name}
                  </Text>
                </View>
                {JSON.stringify(pokemonData?.megaEvolution2) !== '{}' ? (
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: pokemonData?.megaEvolution2?.imageSrc}}
                      style={{height: 120, width: 120}}
                      height={120}
                      width={120}
                    />
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 10,
                        fontFamily: fontFamily?.primaryFontFamilyMedium,
                      }}>
                      {pokemonData?.megaEvolution2?.name}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default PokeStatScreen;
