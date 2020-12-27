import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style/styles.js';
import Check from './Child';
class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Check child={3}/>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Hello World!</Text>
        
        
      </View>
    );
  }
}

export default HomeScreen;