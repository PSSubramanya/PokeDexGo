/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';
import StackNavigationScreen from './src/screens/StackNavigationScreen';
import {NotificationProvider} from './src/ultilities/customHooks/notificationContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const App = () => {
//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <NotificationProvider>
//         <StackNavigationScreen />
//       </NotificationProvider>
//     </GestureHandlerRootView>
//   );
// };

// TODO: Gesture handler for pinch zoom images

const App = () => {
  return (
    <NotificationProvider>
      <StackNavigationScreen />
    </NotificationProvider>
  );
};

export default App;
