// NotificationContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import _BackgroundTimer from 'react-native-background-timer';

const NotificationContext = createContext();

const NotificationProvider = ({children}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    const intervalId = _BackgroundTimer?.setInterval(updateCurrentTime, 1000);

    return () => {
      _BackgroundTimer?.clearInterval(intervalId);
    };
  }, []);

  return (
    <NotificationContext.Provider value={currentTime}>
      {children}
    </NotificationContext.Provider>
  );
};

const useCurrentTime = () => {
  return useContext(NotificationContext);
};

export {NotificationProvider, useCurrentTime};
