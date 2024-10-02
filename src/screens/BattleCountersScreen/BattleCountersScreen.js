import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  individualPokemonImageMapping,
  storeData,
  retrieveData,
} from '../../ultilities/commonFunctions.js';
// import {postAPIRequest} from '../../ultilities/apiRequests.js';
import pokemon_mega_images from '../../ultilities/pokemonData/pokemon_mega_images.js';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types.js';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import {
  horizontalScale,
  verticalScale,
  // viewportHeight,
  aspectRatio,
} from '../../ultilities/scale.js';
import imagePaths from '../../constants/imagePaths.js';
import commonStyling from '../../ultilities/commonStyling/commonStyling.js';
import {NotificationService} from '../../ultilities/services/notifications/notificationService.js';

const BattleCountersScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {pokeImage, pokeName, pokeId, pokeData} = params; //props?.route?.params?.selectedDate;

  const round1Pokemons = [];
  const round2Pokemons = [];
  const round3Pokemons = [];

  const viewCurrentPosition = useRef(null); //viewRef
  const viewRef = useRef(null);

  const [counterPokemons, setCounterPokemons] = useState([]);
  const [displayCounterPokemons, setDisplayCounterPokemons] = useState([]);
  const [round1Mons, setRound1Pokemons] = useState([]);
  const [round2Mons, setRound2Pokemons] = useState([]);
  const [round3Mons, setRound3Pokemons] = useState([]);
  const [attackIndexNumber, setAttackIndexNumber] = useState(0);
  const [selectedID, setSelectedID] = useState(0);
  const [attackModalStatus, setAttackModalStatus] = useState(false);
  const [fastAttack, setFastAttack] = useState('');
  const [chargedAttack, setChargedAttack] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);

  const [position, setPosition] = useState({x: 0, y: 0});
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  NotificationService(navigation);

  useEffect(() => {
    // TODO: ADD this also to cache if possible
    if (
      round1Mons.length === 0 ||
      round2Mons.length === 0 ||
      round3Mons.length === 0 ||
      counterPokemons.length === 0 ||
      displayCounterPokemons.length === 0
    ) {
      fetchCounterPokemonData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    round1Mons,
    round2Mons,
    round3Mons,
    counterPokemons,
    displayCounterPokemons,
  ]);

  useEffect(() => {
    const displayablePokemons = counterPokemons?.filter(
      pokeDataVal => pokeDataVal?.pokemon === pokeName,
    );
    const setPokemons = displayablePokemons?.[0]?.counter;
    setDisplayCounterPokemons(setPokemons);
    console.log(
      'COUNTER POKEMONS DATA VALUE from API',
      displayablePokemons?.[0]?.counter,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterPokemons]);

  useEffect(() => {
    displayCounterPokemons?.map((mons, ids) => {
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
  }, [displayCounterPokemons]);

  // const measureView = () => {
  //   viewRef.current.measure((fx, fy, width, height, px, py) => {
  //     setCurrentPosition(py);
  //     setPosition({x: px, y: py});
  //     setDimensions({width, height});
  //     console.log('CURRENT POSITIONS', fx, fy, width, height, px, py);
  //   });
  // };

  const fetchCounterPokemonData = () => {
    let loadedCounterData;
    const pokemonCountersURL =
      'https://getpantry.cloud/apiv1/pantry/27d83b8a-6b70-4994-8b39-86fe1d49c459/basket/pokeCounters';

    fetch(pokemonCountersURL)
      ?.then(response => {
        response.json()?.then(res => {
          loadedCounterData = res?.data;
          storeData('pokemonCounterData', loadedCounterData); //TODO: Try to add this for cache here
          setCounterPokemons(loadedCounterData);
          console.log(
            'pokeData1234counterPokemons1234 <||> ',
            JSON.stringify(loadedCounterData),
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
  };

  const fetchPokemonImages = pokemonItem => {
    let displayImageURL;
    let finalDisplayImage;
    const pokemonNameString = pokemonItem?.Name;
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
      if (pokeSubString?.[1]?.includes('Origin')) {
        displayImageURL = `https://img.pokemondb.net/artwork/large/${pokeSubString[0].toLowerCase()}-origin.jpg`;
      } else if (pokeSubString?.[1]?.includes('Altered')) {
        displayImageURL = `https://img.pokemondb.net/artwork/large/${pokeSubString[0].toLowerCase()}-altered.jpg`;
      } else if (finalPokemonStringForImage === "sirfetch'd") {
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

  const attackType = attackName => {
    const spliAttackName = attackName?.split('(')[1];
    return pokeTypesData[
      spliAttackName?.substring(0, spliAttackName?.length - 1)
    ];
  };

  const renderGroupHeaderAndAttacksContainer = (
    groupName,
    attacksDisplayCondition,
  ) => {
    return (
      <View style={{flexDirection: 'row', zIndex: 1}}>
        <Text style={[styles?.textTitles, styles?.groupAlignment]}>
          {groupName}
        </Text>
        {attacksDisplayCondition ? (
          <View
            style={[
              styles.attacksContainer,
              {
                top: attackIndexNumber > 2 ? verticalScale(130) : null,
                left:
                  attackIndexNumber % 3 === 0
                    ? horizontalScale(10)
                    : attackIndexNumber % 3 === 1
                    ? horizontalScale(120)
                    : horizontalScale(230),
              },
            ]}>
            <View>
              <Text style={styles.attackHeading}>Attacks</Text>
              <View style={styles?.attacksView}>
                <View style={commonStyling?.flexRow}>
                  <Image
                    source={{
                      uri: attackType(fastAttack),
                    }}
                    height={1}
                    width={1}
                    style={styles.pokemonTypeImageStyle}
                    resizeMode={'contain'}
                  />
                  <Text style={styles?.attackText}>
                    {fastAttack?.split('(')?.[0]}
                  </Text>
                </View>
                <View style={commonStyling?.flexRow}>
                  <Image
                    source={{
                      uri: attackType(chargedAttack),
                    }}
                    height={1}
                    width={1}
                    style={styles.pokemonTypeImageStyle}
                    resizeMode={'contain'}
                  />
                  <Text style={styles?.attackText}>
                    {chargedAttack?.split('(')?.[0]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const displayImage = fetchPokemonImages(item);
    const pokemonNameString = item?.Name;
    const pokeSubString = pokemonNameString?.split(' ');
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            setAttackModalStatus(true);
            console.log('verticalScale(180)', item, item?.['#'], index);
            setAttackIndexNumber(index);
            setSelectedID(item?.['#']);
            setFastAttack(item?.['Fast Attack']);
            setChargedAttack(item?.['Charged Attack']);
            // measureView();
          }}
          onPressOut={() => {
            setAttackModalStatus(false);
            setAttackIndexNumber(0);
          }}>
          <View
            ref={viewRef}
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
        <Text style={styles?.pokeName}>{item?.Name}</Text>
        <View
          style={[
            commonStyling?.flexRow,
            commonStyling?.absoluteCenterStyling,
          ]}>
          <Text style={[styles?.scoreText]}>Score: </Text>
          <Text style={[styles?.scoreText, styles?.scoreDisplay]}>
            {item?.Score}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles?.mainBackground}>
      <SafeAreaView />
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
      {renderGroupHeaderAndAttacksContainer(
        'Group 1',
        attackModalStatus && selectedID <= 6,
      )}
      <View style={styles?.groupView}>
        <FlatList
          data={round1Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
      {renderGroupHeaderAndAttacksContainer(
        'Group 2',
        attackModalStatus && selectedID > 6 && selectedID <= 12,
      )}
      <View style={styles?.groupView}>
        <FlatList
          data={round2Mons}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
      {renderGroupHeaderAndAttacksContainer(
        'Group 3',
        attackModalStatus && selectedID > 12 && selectedID <= 18,
      )}
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
