import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import evolutionData from '../../ultilities/pokemonData/poke_evolution_data.json';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
import fontFamily from '../../ultilities/fontFamily';
import styles from './styles.js';
import TextInputField from '../../components/TextInputField/TextInputField.js';

const PokedexScreen = props => {
  const {navigation} = props;
  const [evolutionChart, setEvolutionChart] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [allPokemonData, setAllPokemonData] = useState([]);
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  //TODO:
  // All text strings in every file should come from string.js file
  // Same with colors and other constants
  // Optimise the code for all screens
  // Build a pokedex with all pokemons loading 100 at a time as we scroll, implement that feature in Flatlist
  // On Click navigate to new detail screen.
  // Try getting animated gif of each pokemon
  // Show evolution chart also
  // Let left and right arrow also
  // Follo dribbble and pokemonDB
  // style make it scaled

  useEffect(() => {
    const allPokeData = evolutionData?.data;
    const tempArray = [];

    for (const [key, value] of Object.entries(allPokeData)) {
      const tempObject = {
        pokemonName: key,
        pokemonStatsData: value,
      };
      tempArray?.push(tempObject);
    }

    setAllPokemonData(tempArray);
  }, []);

  console.log('allPokemonData', allPokemonData);

  useEffect(() => {
    setEvolutionChart([]);
  }, [selectedPokemon]);

  const loadEvolutions = pokemonName => {
    return evolutionData?.data?.[pokemonName];
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
      <Text
        style={{
          marginTop: 0,
          zIndex: 1,
          marginTop: 50,
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
            const val = loadEvolutions(selectedPokemon);
            let temporaryEvolutionChart;
            temporaryEvolutionChart = val?.evolutionChart;
            console.log('valvalval', temporaryEvolutionChart);
            setEvolutionChart(temporaryEvolutionChart);
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
      <View
        style={{
          height: 600,
          width: 380,
          flexDirection: 'column',

          paddingBottom: 60,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <FlatList
          data={allPokemonData}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={({item, index}) => {
            console.log('POKEDEX_ITEM', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('PokeStatScreen', {pokeStatData: item});
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
      </View>
    </View>
  );
};
export default PokedexScreen;
