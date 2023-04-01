import {combineReducers} from 'redux';
import CountReducer from './CountReducer';

const AppReducer = combineReducers({
  counter: CountReducer, //Sample - Remove Later
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
