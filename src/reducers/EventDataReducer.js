import {EVENT_DATA_LOAD} from '../constants/types';
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

const eventDataReducer = combineReducers({
  eventdataload,
});

export default eventDataReducer;
