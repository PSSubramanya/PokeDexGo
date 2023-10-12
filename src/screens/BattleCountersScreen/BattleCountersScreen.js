import React from 'react';
import {View, Text, Image} from 'react-native';
import {individualPokemonImageMapping} from '../../ultilities/commonFunctions.js';
import styles from './styles.js';
import colors from '../../constants/colors.js';
import imagePaths from '../../constants/imagePaths.js';

const BattleCountersScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {pokeImage, pokeName, pokeId, pokeData} = params; //props?.route?.params?.selectedDate;
  return (
    <View
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
        <Text style={styles?.pokemonName}>{pokeName}</Text>
      </View>
    </View>
  );
};
export default BattleCountersScreen;
