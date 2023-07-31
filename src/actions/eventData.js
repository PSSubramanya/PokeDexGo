import {EVENT_DATA_LOAD, DARK_MODE_STATUS} from '../constants/types.js';

export function eventDataLoad(data) {
  return {
    type: EVENT_DATA_LOAD,
    payload: data,
  };
}

export function darkModeActivation(value) {
  return {
    type: DARK_MODE_STATUS,
    payload: value,
  };
}
