import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Image, FlatList} from 'react-native';
import evolutiionData from '../../ultilities/pokemonData/poke_evolution_data.json';
import colors from '../../constants/colors.js';
import styles from './styles.js';

const PokedexScreen = props => {
  const [evolutionChart, setEvolutionChart] = useState([]);
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const evolutionData = evolutiionData?.data;

  useEffect(() => {
    evolutionData?.map(item => {
      loadEvolutions(item);
    });
  }, []);

  // console.log('tempEvolutionArray', evolutionChart);

  const loadEvolutions = item => {
    let arrayOfMultipleEvolutions = [];

    item?.map((dat, id) => {
      let tempItem = dat;
      let tempEvolutionArray = [];

      while (tempItem?.evolvesTo !== 'none') {
        let tempPokemonDataObject = {};
        tempPokemonDataObject.form = tempItem?.form;
        tempPokemonDataObject.pokemon_id = tempItem?.pokemon_id;
        tempPokemonDataObject.pokemon_name = tempItem?.pokemon_name;
        tempPokemonDataObject.imageSrc = tempItem?.imageSrc;
        tempPokemonDataObject.description = tempItem?.description;
        tempEvolutionArray = [...tempEvolutionArray, tempPokemonDataObject];
        tempItem = tempItem?.evolvesTo;
      }
      tempPokemonDataObject = {};
      tempPokemonDataObject = tempItem;
      tempEvolutionArray = [...tempEvolutionArray, tempPokemonDataObject];

      arrayOfMultipleEvolutions = [
        ...arrayOfMultipleEvolutions,
        tempEvolutionArray,
      ];
    });

    setEvolutionChart(arrayOfMultipleEvolutions);
  };

  const renderItem = ({item, index}) => {
    return <View style={{backgroundColor: 'white', height: 100}}></View>;
  };

  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : null,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{marginTop: 0, zIndex: 1}}>Evolution Chart</Text>

      <View style={{marginTop: 0}}>
        <FlatList
          data={evolutionChart}
          // horizontal={true}
          keyExtractor={item => item}
          // renderItem={renderItem}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {item?.map((dat, idx) => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      <Image
                        source={{uri: dat?.imageSrc}}
                        style={{height: 75, width: 75}}
                        height={75}
                        width={75}
                      />
                      <Text>{dat?.pokemon_name}</Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default PokedexScreen;
