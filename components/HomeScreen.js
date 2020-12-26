import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../assets/style/styles.js';

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Hello World!</Text>
        <Button
          title="Go to Chart"
          onPress={() => this.props.navigation.navigate('Chart')}
        />
        
      </View>
    );
  }
}

export default HomeScreen;