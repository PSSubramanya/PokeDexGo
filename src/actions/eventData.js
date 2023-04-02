import {
  EVENT_LINKS,
  EVENT_SUMMARY,
  EVENT_START_DATE_TIME,
  EVENT_IMAGE_URL,
} from '../constants/types.js';

export function eventLinks(data) {
  return {
    type: EVENT_LINKS,
    payload: data,
  };
}

export function eventSummary(data) {
  return {
    type: EVENT_SUMMARY,
    payload: data,
  };
}

export function eventStartTimeStamp(data) {
  return {
    type: EVENT_START_DATE_TIME,
    payload: data,
  };
}

export function eventImageLoad(data) {
  return {
    type: EVENT_IMAGE_URL,
    payload: data,
  };
}
