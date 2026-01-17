import {useEffect, useState, useRef} from 'react';
import {AppState} from 'react-native';

const useAppStatus = () => {
  const prevAppState = useRef('unknown');
  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to foreground');
      } else if (nextAppState === 'background') {
        console.log('App has gone to background');
        // Object.consoleLog('App has gone to background');
      }

      prevAppState.current = appState.current;
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return {appState, prevAppState};
};

export default useAppStatus;
