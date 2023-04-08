import {
  EVENT_LINKS,
  EVENT_SUMMARY,
  EVENT_START_DATE_TIME,
  EVENT_IMAGE_URL,
  EVENT_DATA_LOAD,
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

const eventlinks = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_LINKS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const eventsummary = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_SUMMARY:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
const eventtimestamps = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_START_DATE_TIME:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
const eventimages = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_IMAGE_URL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const eventDataReducer = combineReducers({
  eventlinks,
  eventsummary,
  eventtimestamps,
  eventimages,
  eventdataload,
});

export default eventDataReducer;
