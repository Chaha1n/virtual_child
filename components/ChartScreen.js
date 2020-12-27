import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import styles from '../assets/style/styles.js';
import SleepTimeModal from "./parts/SleepTimeModal";
import { LineChart } from 'react-native-chart-kit'
import Storage from "react-native-storage";
import AsyncStorage from '@react-native-community/async-storage';//react-native-storage dependencies

class ChartScreen extends React.Component {
    /**
     * this function returns how long user slept.
     * @param {string} date  - format is "mm-dd". For example,"12-26" "09-08".
     * @return {object{number,number}} time - format is like "{hours:8,minutes:25}".
     * if data does not found, return {hours:0,minutes:0};
    **/
    _readSleepTimeData(date){
        const storage = new Storage({
            storageBackend:AsyncStorage,
        });
        let sleepData = {"hours":0,"minutes":0};
        storage.load({key:date}).then((d)=>{
            sleepData = d;
        }).catch((e)=>{
            console.log(e)
        });
        console.log(sleepData);
        return sleepData;
    }
  render(){
    return (
      <View style={styles.container}>
        <Text>起床就寝管理</Text>
        <LineChart
            data={{
                labels: ['5日前', '4日前', '3日前', '2日前', '1日前'],
                datasets: [{
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                }]
            }}
            width={300} // from react-native
            height={220}
            yAxisSuffix={'時'}
            chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 0.5) => `rgba(0, 0, 0,0.5)`,
            }}
                // bezier
        />
        
        <SleepTimeModal/>
      </View>
    );
  }
}

export default ChartScreen;