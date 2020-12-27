import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style/styles.js';
import Check from './Child';
class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Check child={3}/>
        <Text style={{margin:50,fontSize:40}}>我が子の様子</Text>
      </View>
    );
  }
}

export default HomeScreen;