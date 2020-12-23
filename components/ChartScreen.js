import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import styles from '../assets/style/styles.js';

class ChartScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Hello World!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        
      </View>
    );
  }
}

export default ChartScreen;