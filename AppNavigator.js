import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './components/HomeScreen';
import ChartScreen from './components/ChartScreen';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chart" component={ChartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}