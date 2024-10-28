import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import {useSelector} from 'react-redux';
import fontFamily from '../../ultilities/fontFamily.js';

const PokeAttackTypeCalculator = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {navigation} = props;

  const [changeButtonTitle, setChangeButtonTitle] = useState(false);

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
          //   backgroundColor: 'red',
          width: 350,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('PokedexScreen', {
              comingFrom: 'pokeCalculator',
              pokeSlot: 'first',
            });
          }}>
          <View>
            <View
              style={{
                height: 150,
                width: 150,
                borderWidth: 4,
                borderRadius: 8,
                backgroundColor: colors?.white,
                borderColor: colors?.secondaryRedColor,
              }}></View>
            <View></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('PokedexScreen', {
              comingFrom: 'pokeCalculator',
              pokeSlot: 'second',
            });
          }}>
          <View>
            <View
              style={{
                height: 150,
                width: 150,
                borderWidth: 4,
                borderRadius: 8,
                backgroundColor: colors?.white,
                borderColor: colors?.purple,
              }}></View>
            <View></View>
          </View>
        </TouchableOpacity>
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
