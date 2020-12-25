import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//Compornents
import HomeScreen from './components/HomeScreen';
import ChartScreen from './components/ChartScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chart: ChartScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
