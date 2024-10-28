import {combineReducers} from 'redux';
import EventDataReducer from './EventDataReducer';
import PokeDataReducer from './PokeDataReducer';

const AppReducer = combineReducers({
  eventDataReducer: EventDataReducer,
  pokemonSelectionReducer: PokeDataReducer,
});

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'hydrate':
      return action.payload;
    default:
      return AppReducer(state, action);
  }
};
export default mainReducer;
