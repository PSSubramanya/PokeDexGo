import {useEffect, useRef} from 'react';

function useInterval(callback, interval) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no interval is specified.
    if (interval === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), interval);

    return () => clearInterval(id);
  }, [interval]);
}

export default useInterval;
