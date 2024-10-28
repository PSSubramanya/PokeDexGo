import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import fontFamily from '../../ultilities/fontFamily.js';
import imagePaths from '../../constants/imagePaths.js';

const PokeAttackTypeCalculator = props => {
  const selectedPokemonData = useSelector(
    state => state?.pokemonSelectionReducer?.pokemonSelectionValue,
  );
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {navigation} = props;

  const [changeButtonTitle, setChangeButtonTitle] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(0);

  const [imageSlot1, setImageSlot1] = useState('');
  const [imageSlot2, setImageSlot2] = useState('');
  const [imageSlot3, setImageSlot3] = useState('');
  const [imageSlot4, setImageSlot4] = useState('');
  const [imageSlot5, setImageSlot5] = useState('');
  const [imageSlot6, setImageSlot6] = useState('');
  const [imageSlotRaid, setImageSlotRaid] = useState('');

  useEffect(() => {
    if (currentSlot === 1) {
      const image1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.imageSrc;
      const name1 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.pokemon_name;
      const objectValue = {
        image: image1,
        name: name1,
      };
      setImageSlot1(image1);
    } else if (currentSlot === 2) {
      const image2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.imageSrc;
      const name2 =
        selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData?.pokemon_name;
      const objectValue = {
        image: image2,
        name: name2,
      };
      setImageSlot2(image2);
    }
  }, [selectedPokemonData, currentSlot]);

  const infoForSingleAndDualTypes = () => {
    // Single typing info
    // Dual typing info - VIA CHART VIEW is best
    // Show all pokemons of a selected type
    // How many is super affective against it and weak or not very affective against it
    // Display them all if required based on pokedex once pokedex is built
  };

  const pokeComparisonCalculator = () => {
    // two boxes vs
    // name and type info
    // best attacks to use if possible
    // Use raid scenario 1 vs 6 for same concept
    // Which pokemons I have can be used and how affective they are against a selected one

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setCurrentSlot(1);
              navigation?.navigate('PokedexScreen', {
                comingFrom: 'pokeCalculator',
                pokeSlot: currentSlot,
              });
            }}>
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
                    uri: imageSlot1,
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
          <View>
            <Text style={{color: colors?.white}}>
              {
                selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData
                  ?.pokemon_name
              }
            </Text>
          </View>
        </View>

        <Image
          source={imagePaths?.vsIcon2}
          style={{
            height: 100,
            width: 100,
          }}
          width={100}
          height={100}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              setCurrentSlot(2);
              navigation?.navigate('PokedexScreen', {
                comingFrom: 'pokeCalculator',
                pokeSlot: currentSlot,
              });
            }}>
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
                    uri: imageSlot2,
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
          <View>
            <Text style={{color: colors?.white}}>
              {
                selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData
                  ?.pokemon_name
              }
            </Text>
          </View>
        </View>

        <View></View>
      </View>
    );
  };

  const buttonView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChangeButtonTitle(!changeButtonTitle);
        }}>
        <View
          style={{
            height: 40,
            width: 120,
            marginTop: 20,
            backgroundColor: colors?.purple,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              textTransform: 'uppercase',
              color: colors?.white,
              fontFamily: fontFamily?.primaryFontFamilyMedium,
            }}>
            {changeButtonTitle ? 'Info Section' : 'Compare'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(
    'selectedPokeData---->',
    selectedPokemonData?.data?.pokemonInfo?.pokemonStatsData,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColorDarkMode
          : colors?.white,
        alignItems: 'center',
      }}>
      <SafeAreaView />
      {changeButtonTitle
        ? pokeComparisonCalculator()
        : infoForSingleAndDualTypes()}
      {buttonView()}
      {/* We use the above button to shift above 2 characteristics  */}
    </View>
  );
};
export default PokeAttackTypeCalculator;
