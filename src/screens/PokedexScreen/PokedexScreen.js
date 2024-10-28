import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import evolutionData from '../../ultilities/pokemonData/poke_evolution_data.json';
import pokemonRegion from '../../ultilities/pokemonData/pokemon_regions.js';
import {selectedPokemonForCalculation} from '../../actions/pokeSelectedData.js';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
import fontFamily from '../../ultilities/fontFamily';
import styles from './styles.js';
import TextInputField from '../../components/TextInputField/TextInputField.js';

const PokedexScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {comingFrom, pokeSlot} = params;
  const dispatch = useDispatch();
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Kanto');
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokedexEntriesForRegion, setPokedexEntriesForRegion] = useState([]);
  const [allPokeRegions, setAllPokeRegions] = useState([]);
  const [autoSuggestedPokemonList, setAutoSuggestedPokemonList] = useState([]);
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  //TODO:
  // All text strings in every file should come from string.js file
  // Same with colors and other constants
  // Optimise the code for all screens
  // Build a pokedex with all pokemons
  // Load only 100 at a time as we scroll, implement that feature in Flatlist
  // Try getting animated gif of each pokemon - NEED BETTER GIFs
  // style make it scaled

  // Make region based filter like Kanto (Gen 1), Jhoto (Gen 2) till Paldea
  // Let left and right arrow also - DONE
  // Follow dribbble and pokemonDB - DONE
  // On Click navigate to new detail screen - DONE
  // Show evolution chart also - DONE
  // Auto name suggestion integrate for name search type pokemon search pokedex view - DONE

  useEffect(() => {
    const allPokeData = evolutionData?.data;
    const tempArray = [];

    const pokeRegions = Object?.keys(pokemonRegion);
    setAllPokeRegions(pokeRegions);

    for (const [key, value] of Object.entries(allPokeData)) {
      const tempObject = {
        pokemonName: key,
        pokemonStatsData: value,
      };
      tempArray?.push(tempObject);
    }

    setAllPokemonData(tempArray);
  }, []);

  useEffect(() => {
    const allPokeData = evolutionData?.data;
    const objKeysArray = Object.keys(allPokeData);
    const tempAutoSuggestionsArray = objKeysArray?.filter(val => {
      if (selectedPokemon?.length === 0) {
        setAutoSuggestedPokemonList([]);
      } else if (val?.includes(selectedPokemon)) {
        return val;
      }
    });
    console.log(
      'allPokemonData1234',
      selectedPokemon,
      tempAutoSuggestionsArray,
    );
    setAutoSuggestedPokemonList(tempAutoSuggestionsArray);
  }, [selectedPokemon]);

  useEffect(() => {
    const tempRegionalPokemons = allPokemonData?.filter((data, index) => {
      if (selectedRegion === data?.pokemonStatsData?.region) {
        return data;
      }
    });
    console.log('tempRegionalPokemons', tempRegionalPokemons);
    setPokedexEntriesForRegion(tempRegionalPokemons);
  }, [allPokemonData, selectedRegion]);

  const renderPokeRegions = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPokedexEntriesForRegion([]);
          setSelectedRegion(item);
        }}>
        <View
          style={{
            backgroundColor:
              selectedRegion === item
                ? colors?.white
                : colors?.secondaryBackgroundColorDarkMode,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 5,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: fontFamily?.primaryFontFamilyBold,
              color: selectedRegion === item ? colors?.black : colors?.white,
            }}>
            {item.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : null,
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SafeAreaView />
      <Text
        style={{
          marginTop: 0,
          zIndex: 1,
          marginTop: 100, //50
          marginLeft: 10,
          fontSize: 24,
          fontFamily: fontFamily?.primaryFontFamilyBold,
          color: colors?.white,
        }}>
        Pokedex
      </Text>
      <Text
        style={{
          marginTop: 0,
          zIndex: 1,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          fontSize: 12,
          fontFamily: fontFamily?.primaryFontFamilyRegular,
          color: colors?.white,
        }}>
        Search for a Pokémon by its name or using its Pokédex number
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TextInputField
          value={selectedPokemon}
          onChangeText={name => {
            setSelectedPokemon(name);
          }}
          containerStyle={{
            height: 50,
            backgroundColor: 'white',
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 10,
            flex: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            const searchingPokemonData = evolutionData?.data[selectedPokemon];
            const tempObject = {
              pokemonName: selectedPokemon,
              pokemonStatsData: searchingPokemonData,
            };
            if (comingFrom === 'pokeCalculator') {
              dispatch(selectedPokemonForCalculation(tempObject));
              navigation.goBack();
            } else {
              navigation?.navigate('PokeStatScreen', {
                pokeStatData: tempObject,
              });
            }
          }}
          style={{marginHorizontal: 10}}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: colors?.secondaryRedColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Image
              source={imagePaths?.searchIcon}
              height={20}
              width={20}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {selectedPokemon?.length === 0 ? (
        <View>
          <FlatList
            data={allPokeRegions}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderPokeRegions}
          />
        </View>
      ) : null}
      <View
        style={{
          // position: 'absolute',
          // top: 220,
          marginTop: 3,
          zIndex: 1,
        }}>
        <FlatList
          data={autoSuggestedPokemonList}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log('POKEDEX_ITEM', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  const searchingPokemonData = evolutionData?.data[item];
                  const tempObject = {
                    pokemonName: item,
                    pokemonStatsData: searchingPokemonData,
                  };
                  setSelectedPokemon('');
                  if (comingFrom === 'pokeCalculator') {
                    dispatch(selectedPokemonForCalculation(tempObject));
                    navigation.goBack();
                  } else {
                    navigation?.navigate('PokeStatScreen', {
                      pokeStatData: tempObject,
                    });
                  }
                }}
                activeOpacity={0.6}
                style={{marginHorizontal: 10}}>
                <View
                  style={{
                    height: 50,
                    width: Platform?.OS === 'android' ? 331 : 313,
                    backgroundColor: colors?.skinColor,
                    justifyContent: 'center',
                    paddingLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fontFamily?.primaryFontFamilyRegular,
                    }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          // ItemSeparatorComponent={() => {
          //   return <View />;
          // }}
        />
      </View>

      {selectedPokemon?.length === 0 ? (
        <View
          style={{
            height: 600,
            width: 380,
            flexDirection: 'column',
            paddingBottom: 120,
            justifyContent: 'center',
            alignItems: pokedexEntriesForRegion?.length === 0 ? 'center' : null,
            alignSelf: 'center',
          }}>
          {pokedexEntriesForRegion?.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                marginLeft: 10,
              }}
              data={pokedexEntriesForRegion}
              keyExtractor={item => item}
              numColumns={3}
              renderItem={({item, index}) => {
                // console.log('POKEDEX_ITEM', item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (comingFrom === 'pokeCalculator') {
                        dispatch(selectedPokemonForCalculation(item));
                        navigation.goBack();
                      } else {
                        navigation?.navigate('PokeStatScreen', {
                          pokeStatData: item,
                        });
                      }
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
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{uri: item?.pokemonStatsData?.imageSrc}}
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
                        {item?.pokemonName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View>
              <Image
                source={imagePaths?.arceusGif}
                height={100}
                width={100}
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 12,
                  fontFamily: fontFamily?.primaryFontFamilyMedium,
                  color: colors?.white,
                  textTransform: 'uppercase',
                }}>
                Feature under progress
              </Text>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};
export default PokedexScreen;
