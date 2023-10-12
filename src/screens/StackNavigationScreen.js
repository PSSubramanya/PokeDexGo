import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import HomeScreen from './HomeScreen/HomeScreen';
import EventViewScreen from './EventViewScreen/EventViewScreen';
import EggDetailsScreen from './EggDetailsScreen/EggDetailsScreen';
import TrainerInfoScreen from './TrainerInfoScreen/TrainerInfoScreen';
import FieldResearchScreen from './FieldResearchScreen/FieldResearchScreen';
import RaidBossScreen from './RaidBossScreen/RaidBossScreen';
import BattleCountersScreen from './BattleCountersScreen/BattleCountersScreen';
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
        <Stack.Screen name="EggDetailsScreen" component={EggDetailsScreen} />
        <Stack.Screen name="TrainerInfoScreen" component={TrainerInfoScreen} />
        <Stack.Screen
          name="FieldResearchScreen"
          component={FieldResearchScreen}
        />
        <Stack.Screen name="RaidBossScreen" component={RaidBossScreen} />
        <Stack.Screen
          name="BattleCountersScreen"
          component={BattleCountersScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigationScreen;
