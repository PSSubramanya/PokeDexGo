import {combineReducers} from 'redux';
import EventDataReducer from './EventDataReducer';

const AppReducer = combineReducers({
  eventDataReducer: EventDataReducer,
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
