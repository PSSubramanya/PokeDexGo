import React from 'react';
import LandingPage from '../screens/LandingPage/LandingPage';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventViewScreen from './EventViewScreen/EventViewScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StackNavigationScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EventViewScreen" component={EventViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigationScreen;
