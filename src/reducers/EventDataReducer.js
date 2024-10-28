import {
  EVENT_DATA_LOAD,
  DARK_MODE_STATUS,
  POKEMON_SELECTED_DATA,
} from '../constants/types';
import {combineReducers} from 'redux';

const initialState = {
  data: {},
};

const eventdataload = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_DATA_LOAD:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const darkModeValue = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE_STATUS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
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

const eventDataReducer = combineReducers({
  eventdataload,
  darkModeValue,
  pokemonSelectionValue,
});

export default eventDataReducer;
