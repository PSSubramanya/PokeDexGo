import {EVENT_DATA_LOAD} from '../constants/types.js';

export function eventDataLoad(data) {
  return {
    type: EVENT_DATA_LOAD,
    payload: data,
  };
}
