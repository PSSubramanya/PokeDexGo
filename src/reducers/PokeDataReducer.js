import {POKEMON_SELECTED_DATA} from '../constants/types';
import {combineReducers} from 'redux';

const initialState = {
  data: {},
};

const pokemonSelectionValue = (state = initialState, action) => {
  switch (action?.type) {
    case POKEMON_SELECTED_DATA:
      return {
        ...state,
        data: action?.payload,
      };
    default:
      return state;
  }
};

const pokeDataReducer = combineReducers({
  pokemonSelectionValue,
});

export default pokeDataReducer;
