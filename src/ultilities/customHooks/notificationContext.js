// NotificationContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

const NotificationContext = createContext();

const NotificationProvider = ({children}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(intervalId);
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
