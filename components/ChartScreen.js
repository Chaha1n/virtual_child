import React from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import styles from '../assets/style/styles.js';
import SleepTimeModal from "./parts/SleepTimeModal";
import {LineChart} from 'react-native-chart-kit'
import Storage from "react-native-storage";
import AsyncStorage from '@react-native-community/async-storage';
import {parse} from "react-native-svg";

//react-native-storage dependencies

class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this._calculateAverageSleepTime = this._calculateAverageSleepTime.bind(this);
        this.reload = this.reload.bind(this)
        this._calculateAverageSleepTime().then(
            (v)=>{
                this.setState({chartD1:parseInt(v[0])});
                this.setState({chartD2:parseInt(v[1])});
                this.setState({chartD3:parseInt(v[2])});
                this.setState({chartD4:parseInt(v[3])});
                this.setState({chartD5:parseInt(v[4])});
            }
        );
    }
    state={
        chartD1:0,
        chartD2:0,
        chartD3:0,
        chartD4:0,
        chartD5:0,

    }
    /**
     * DONT CALL _readSleepTimeData() directly,please use _calculateAverageSleepTime() instead.
     * this function returns how long user slept.
     * @param {string} date  - format is "mm-dd". For example,"12-26" "09-08".
     * @return {object{number,number}} time - format is like "{hours:8,minutes:25}".
     * if data does not found, return {hours:0,minutes:0};
     **/
    _readSleepTimeData(date) {
        return new Promise(
            resolve => {
                const storage = new Storage({
                    storageBackend: AsyncStorage,
                });
                let sleepData = "00:00";
                storage.load({key: date}).then((d) => {
                    sleepData = `${d.hours}:${d.minutes}`;
                }).catch((e) => {
                    //console.log(e)
                }).finally(() => {
                    resolve(sleepData);
                })
            }
        )
    }

    /**
     * This function returns the average of sleep time in last 5 days,
     * and the 5 days data.
     * @param{void}
     * @return{promise} - format is like
     * {
        "average":6.5, //means 6 hours 30 minutes
        "daily":[7.1,4.8,9.1,6.2,6.4]
        }
     *
     * **/
    _calculateAverageSleepTime() {
        let date = new Date();
        let key = `${date.getMonth()+1}-`
        return Promise.all([this._readSleepTimeData(`${key}${date.getDate() - 4}`), this._readSleepTimeData(`${key}${date.getDate() - 3}`), this._readSleepTimeData(`${key}${date.getDate() - 2}`), this._readSleepTimeData(`${key}${date.getDate() - 1}`), this._readSleepTimeData(`${key}${date.getDate()}`)]);

    }
    reload(){
        this._calculateAverageSleepTime().then(
            (v)=>{
                this.setState({chartD1:parseInt(v[0])});
                this.setState({chartD2:parseInt(v[1])});
                this.setState({chartD3:parseInt(v[2])});
                this.setState({chartD4:parseInt(v[3])});
                this.setState({chartD5:parseInt(v[4])});
            }
        );
    }
    render() {
        return (
            <View style={styles.container}>
               <Text style={{margin:50,fontSize:20}}>直近5日間の睡眠時間</Text>
                <LineChart
                    data={{
                        labels: [ '4日前', '3日前', '2日前', '1日前','今日'],
                        datasets: [{
                            data: [
                                this.state.chartD1,
                                this.state.chartD2,
                                this.state.chartD3,
                                this.state.chartD4,
                                this.state.chartD5,

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
                        color: (opacity = 0.5) => `rgba(0, 0, 0, 0.5)`,
                    }}
                    // bezier
                />

                <SleepTimeModal reload={this.reload}reRender={this.render}/>
            </View>)
    }
}

export default ChartScreen;