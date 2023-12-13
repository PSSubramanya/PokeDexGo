/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import StackNavigationScreen from './src/screens/StackNavigationScreen';
import {NotificationProvider} from './src/ultilities/customHooks/notificationContext';

const App = () => {
  return (
    <NotificationProvider>
      <StackNavigationScreen />
    </NotificationProvider>
  );
};

export default App;
