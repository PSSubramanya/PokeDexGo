// sample file - Remove Later
import {COUNTER_CHANGE} from '../constants/types.js';

export function changeCount(count) {
  return {
    type: COUNTER_CHANGE,
    payload: count,
  };
}
