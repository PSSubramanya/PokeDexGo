import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  individualPokemonImageMapping,
  storeData,
} from '../../ultilities/commonFunctions.js';
import pokemon_mega_images from '../../ultilities/pokemonData/pokemon_mega_images.js';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';

const BattleCountersScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {pokeImage, pokeName, pokeId, pokeData} = params; //props?.route?.params?.selectedDate;

  const round1Pokemons = [];
  const round2Pokemons = [];
  const round3Pokemons = [];

  const [counterPokemons, setCounterPokemons] = useState([]);
  const [round1Mons, setRound1Pokemons] = useState([]);
  const [round2Mons, setRound2Pokemons] = useState([]);
  const [round3Mons, setRound3Pokemons] = useState([]);
  const [pokemondId, setPokemondId] = useState(0);

  useEffect(() => {
    // TODO: ADD this also to cache if possible

    let loadedCounterData;
    const pokemonCountersURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/counters';

    fetch(pokemonCountersURL)
      ?.then(response => {
        response.json()?.then(res => {
          loadedCounterData = res?.data;
          storeData('pokemonCounterData', loadedCounterData); //TODO: Try to add this for cache here

          const displayablePokemons = loadedCounterData?.filter(
            pokeDataVal => pokeDataVal?.pokemon === pokeName,
          );
          const setPokemons = displayablePokemons?.[0]?.counter;

          setCounterPokemons(setPokemons);

          console.log(
            'COUNTER POKEMONS DATA VALUE from API',
            displayablePokemons?.[0]?.counter,
          );
        });
      })
      .catch(err => {
        console.log('COUNTER POKEMONS DATA VALUE ERROR', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    counterPokemons?.map((mons, ids) => {
      console.log('THE-MONS', mons, ids);
      if (ids < 6) {
        round1Pokemons.push(mons);
      } else if (ids >= 6 && ids < 12) {
        round2Pokemons.push(mons);
      } else if (ids >= 12 && ids < 18) {
        round3Pokemons.push(mons);
      }
    });
    setRound1Pokemons(round1Pokemons);
    setRound2Pokemons(round2Pokemons);
    setRound3Pokemons(round3Pokemons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterPokemons]);

  const fetchPokemonImages = pokemonItem => {
    let displayImageURL;
    const pokemonNameString = pokemonItem?.item?.Name;
    const pokeSubString = pokemonNameString?.split(' ');
    console.log(
      'JKSCBJKASBC',
      // pokeItem,
      // pokemonNameString,
      pokeSubString,
    );

    const finalPokemonStringForImage =
      pokeSubString[pokeSubString.length - 1]?.toLowerCase();
    if (
      pokeSubString[pokeSubString.length - 1] === '(Ordinary)' ||
      pokeSubString[pokeSubString.length - 1] === '(Unbound)'
    ) {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${pokeSubString[0].toLowerCase()}.jpg`;
    } else if (pokeSubString[0] === 'Mega') {
      if (
        finalPokemonStringForImage === 'charizard' ||
        finalPokemonStringForImage === 'mewtwo'
      ) {
        if (pokeSubString[1] === 'Y') {
          const pokeString = finalPokemonStringForImage + 'Y';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        } else if (pokeSubString[1] === 'X') {
          const pokeString = finalPokemonStringForImage + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        }
      } else {
        const pokeString = finalPokemonStringForImage;
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
      }
    } else if (pokeSubString[0] === 'Primal') {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${finalPokemonStringForImage}-primal.jpg`;
    } else {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${finalPokemonStringForImage}.jpg`;
    }
    return displayImageURL;
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors?.secondaryBackgroundColorDarkMode,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: individualPokemonImageMapping(
              pokeData?.image,
              pokeData?.pokeId,
              pokeData?.name,
            ),
          }}
          height={1}
          width={1}
          style={styles.pokemonIcon}
        />
        <Text style={styles?.textTitles}>{pokeName}</Text>
      </View>
      <Text
        style={[
          styles?.textTitles,
          {marginHorizontal: 20, marginTop: 30, marginBottom: 5},
        ]}>
        Round 1
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: colors?.white,
          marginVertical: 10,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <FlatList
          data={round1Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={(pokeItem, idNo) => {
            const displayImage = fetchPokemonImages(pokeItem);
            const pokemonNameString = pokeItem?.item?.Name;
            const pokeSubString = pokemonNameString?.split(' ');
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={[
                    {
                      // backgroundColor: colors.white,
                    },
                    styles.gridBorderStyle,
                  ]}>
                  <Image
                    source={{
                      uri: displayImage,
                    }}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={{height: 100, width: 100}}
                  />
                  {pokeSubString?.[0] === 'Shadow' ? (
                    <View style={styles.shadowIconContainer}>
                      <Image
                        source={imagePaths.shadowIcon}
                        height={1}
                        width={1}
                        resizeMode={'contain'}
                        style={styles.shadowIcon}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Text
        style={[
          styles?.textTitles,
          {marginHorizontal: 20, marginTop: 30, marginBottom: 5},
        ]}>
        Round 2
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: colors?.white,
          marginVertical: 10,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <FlatList
          data={round2Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={(pokeItem, idNo) => {
            const displayImage = fetchPokemonImages(pokeItem);
            const pokemonNameString = pokeItem?.item?.Name;
            const pokeSubString = pokemonNameString?.split(' ');
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={[
                    {
                      // backgroundColor: colors.white,
                    },
                    styles.gridBorderStyle,
                  ]}>
                  <Image
                    source={{
                      uri: displayImage,
                    }}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={{height: 100, width: 100}}
                  />
                  {pokeSubString?.[0] === 'Shadow' ? (
                    <View style={styles.shadowIconContainer}>
                      <Image
                        source={imagePaths.shadowIcon}
                        height={1}
                        width={1}
                        resizeMode={'contain'}
                        style={styles.shadowIcon}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Text
        style={[
          styles?.textTitles,
          {marginHorizontal: 20, marginTop: 30, marginBottom: 5},
        ]}>
        Round 3
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: colors?.white,
          marginVertical: 10,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <FlatList
          data={round3Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={(pokeItem, idNo) => {
            const displayImage = fetchPokemonImages(pokeItem);
            const pokemonNameString = pokeItem?.item?.Name;
            const pokeSubString = pokemonNameString?.split(' ');
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={[
                    {
                      // backgroundColor: colors.white,
                    },
                    styles.gridBorderStyle,
                  ]}>
                  <Image
                    source={{
                      uri: displayImage,
                    }}
                    height={1}
                    width={1}
                    resizeMode={'contain'}
                    style={{height: 100, width: 100}}
                  />
                  {pokeSubString?.[0] === 'Shadow' ? (
                    <View style={styles.shadowIconContainer}>
                      <Image
                        source={imagePaths.shadowIcon}
                        height={1}
                        width={1}
                        resizeMode={'contain'}
                        style={styles.shadowIcon}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
export default BattleCountersScreen;
