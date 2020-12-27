import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style/styles.js';
import Check from './Child';
import Storage from "react-native-storage";
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    state={
        childStatus:2,
        childMessage:"素晴らしい"
    }
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
    _calculateAverageSleepTime() {
        let date = new Date();
        let key = `${date.getMonth()+1}-`
        return Promise.all([this._readSleepTimeData(`${key}${date.getDate() - 4}`), this._readSleepTimeData(`${key}${date.getDate() - 3}`), this._readSleepTimeData(`${key}${date.getDate() - 2}`), this._readSleepTimeData(`${key}${date.getDate() - 1}`), this._readSleepTimeData(`${key}${date.getDate()}`)]);

    }
    render(){
        this._calculateAverageSleepTime().then((arr)=>{
            let sum=0;
            arr.forEach(n=>sum+=n);
            if((sum/5)>8){
                this.setState({childStatus:2});
                this.setState({childMessage:"素晴らしい"});
            }else if((sum/5)>7){
                this.setState({childStatus:0});
                this.setState({childMessage:"良い"});
            }else{
                this.setState({childStatus:1});
                this.setState({childMessage:"辛い"});
            }
        })
        return (
            <View style={styles.container}>
                <Check child={this.state.childStatus}/>
                <Text style={{margin:50,fontSize:40}}>{this.state.childMessage}</Text>
            </View>
        );
    }
}

export default HomeScreen;