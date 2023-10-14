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
  retrieveData,
} from '../../ultilities/commonFunctions.js';
// import {postAPIRequest} from '../../ultilities/apiRequests.js';
import pokemon_mega_images from '../../ultilities/pokemonData/pokemon_mega_images.js';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';
import commonStyling from '../../ultilities/commonStyling/commonStyling.js';

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

    if (counterPokemons?.length === 0) {
      retrieveData('pokemonCounterData')
        .then(counterVal => {
          if (counterVal) {
            // Do something with the retrieved data, e.g., display it in your component.
            const serializedValue = JSON.parse(counterVal);
            loadedCounterData = serializedValue;
            setCounterPokemons(loadedCounterData);
            console.log(
              'COUNTER POKEMONS DATA VALUE from API',
              loadedCounterData,
            );
          }
        })
        .catch(err => {
          console.log('counter pokemons data fetch ERROR.', err);
        });
    }
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
    let finalDisplayImage;
    const pokemonNameString = pokemonItem?.item?.Name;
    const pokeSubString = pokemonNameString?.split(' ');
    console.log(
      'JKSCBJKASBC',
      // pokeItem,
      // pokemonNameString,
      pokeSubString,
    );

    const finalPokemonStringForImage =
      pokeSubString?.[pokeSubString?.length - 1]?.toLowerCase();

    if (pokeSubString?.[pokeSubString?.length - 1][0] === '(') {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${pokeSubString?.[0].toLowerCase()}.jpg`;
    } else if (pokeSubString?.[0] === 'Tapu') {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${pokeSubString?.[0].toLowerCase()}-${pokeSubString?.[1].toLowerCase()}.jpg`;
    } else if (pokeSubString?.[0] === 'Mega') {
      if (
        finalPokemonStringForImage === 'charizard' ||
        finalPokemonStringForImage === 'mewtwo'
      ) {
        if (pokeSubString?.[1] === 'Y') {
          const pokeString = finalPokemonStringForImage + 'Y';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        } else if (pokeSubString?.[1] === 'X') {
          const pokeString = finalPokemonStringForImage + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        }
      } else {
        const pokeString = finalPokemonStringForImage;
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        displayImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
      }
    } else if (pokeSubString?.[0] === 'Primal') {
      displayImageURL = `https://img.pokemondb.net/artwork/large/${finalPokemonStringForImage}-primal.jpg`;
    } else {
      if (finalPokemonStringForImage === "sirfetch'd") {
        displayImageURL =
          'https://img.pokemondb.net/artwork/large/sirfetchd.jpg';
      } else {
        displayImageURL = `https://img.pokemondb.net/artwork/large/${finalPokemonStringForImage}.jpg`;
      }
    }

    // finalDisplayImage = postAPIRequest();
    // console.log('AYE_YOOO WASSUP', finalDisplayImage);
    // return finalDisplayImage?.result_b64;
    return displayImageURL;
  };

  const renderItem = (pokeItem, idNo) => {
    const displayImage = fetchPokemonImages(pokeItem);
    const pokemonNameString = pokeItem?.item?.Name;
    const pokeSubString = pokemonNameString?.split(' ');
    return (
      <View>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={[
              {
                backgroundColor: colors.white, //TODO: NEED TO REMOVE WHITE BACKGROUND HERE
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
              style={styles?.gridIcons}
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
        <Text style={styles?.pokeName}>{pokeItem?.item?.Name}</Text>
        <View
          style={[
            commonStyling?.flexRow,
            commonStyling?.absoluteCenterStyling,
          ]}>
          <Text style={[styles?.scoreText]}>Score: </Text>
          <Text style={[styles?.scoreText, styles?.scoreDisplay]}>
            {pokeItem?.item?.Score}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles?.mainBackground}>
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
        <Text style={[styles?.textTitles, {fontSize: 20}]}>{pokeName}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={[styles?.infoText]}>
          This section shows top 18 pokemon counters against {pokeName}
        </Text>
      </View>
      <Text style={[styles?.textTitles, styles?.groupAlignment]}>Group 1</Text>
      <View style={styles?.groupView}>
        <FlatList
          data={round1Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
      <Text style={[styles?.textTitles, styles?.groupAlignment]}>Group 2</Text>
      <View style={styles?.groupView}>
        <FlatList
          data={round2Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
      <Text style={[styles?.textTitles, styles?.groupAlignment]}>Group 3</Text>
      <View style={styles?.groupView}>
        <FlatList
          data={round3Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};
export default BattleCountersScreen;
