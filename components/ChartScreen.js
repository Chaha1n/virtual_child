import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import styles from '../assets/style/styles.js';
import SleepTimeModal from "./parts/SleepTimeModal";
import { LineChart } from 'react-native-chart-kit'
import Storage from "react-native-storage";
import AsyncStorage from '@react-native-community/async-storage';
import {parse} from "react-native-svg";

//react-native-storage dependencies

class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    /**
     * DONT CALL _readSleepTimeData() directly,please use _calculateAverageSleepTime() instead.
     * this function returns how long user slept.
     * @param {string} date  - format is "mm-dd". For example,"12-26" "09-08".
     * @return {object{number,number}} time - format is like "{hours:8,minutes:25}".
     * if data does not found, return {hours:0,minutes:0};
    **/
    _readSleepTimeData(date){
        return new Promise(
            resolve => {
                const storage = new Storage({
                    storageBackend:AsyncStorage,
                });
                let sleepData = "00:00";
                storage.load({key:date}).then((d)=>{
                    sleepData = `${d.hours}:${d.minutes}`;
                }).catch((e)=>{
                    console.log(e)
                });
            }
        )
    }
    /**
     * This function returns the average of sleep time in last 5 days,
     * and the 5 days data.
     * @param{void}
     * @return{{average, daily: []}} - format is like
     * {
        "average":6.5, //means 6 hours 30 minutes
        "daily":[7.1,4.8,9.1,6.2,6.4]
        }
     *
     * **/
    async _calculateAverageSleepTime(){
        const storage = new Storage({
            storageBackend:AsyncStorage,
        });
        let date = new Date()
        let key = (date.getMonth()+1).toString()+"-";
        let today = date.getDate();
        let sum = 0;
        let dailyData = [];
        for(let i=0;i>-5;i--){
            this._readSleepTimeData(`${key}${today+i}`).then(date=>{
                let [hours,minutes] = data.toString().split(":");
                let sleepTime = Math.round((parseInt(hours)+parseInt(minutes)/60)*10)/10;
                dailyData.push(sleepTime);
                sum += sleepTime;
            });
        }

        let ret={
            "average":Math.round(sum/5*10)/10,
            "daily":dailyData,
        }
        alert(ret.average);
        alert(ret.daily)
        return ret;
    }
  render(){
        this._calculateAverageSleepTime();
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
        
        <SleepTimeModal render={this.render}/>
      </View>
    );
  }
}

export default ChartScreen;