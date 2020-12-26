import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'modal-react-native-web';
import styles from "../../assets/style/styles";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from "react-native-web";
//

export default class SleepTimeModal extends React.Component {

    state = {
        isModalVisible : false,
        dateField      : this._getDefaultDate().toString(),
        goToBedField   : "00:00",
        getUpField     : "00:00",
    }

    constructor() {
        super();
        this.state.isModalVisible = false
        this.toggleModal          = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    };

    _getDefaultDate(){
        const d      = new Date();
        const year   = d.getFullYear();
        const month  = ("0"+(d.getMonth()+1)).slice(-2);
        const day    = ("0"+d.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }
    _handleDateChange = inputDate =>{
        this.setState({dateField:inputDate});
        console.log(inputDate);
    }
    _handleGetUpChange = inputGetUp =>{
        this.setState({getUpField:inputGetUp});
    }
    _handleGoToChange = inputGoTo =>{
        this.setState({goToBedField:inputGoTo});
    }
    render() {
        const recordTimeOfSleeping = ()=>{
            let date  = this.state.dateField;
            let goTo  = this.state.goToBedField;
            let getUp = this.state.getUpField;

            let sleepTime = goTo - getUp > 0 ? goTo - getUp : 0;

            //init react-native-storage
            const storage = new Storage({
                storageBackend:AsyncStorage,
            });
            console.log(date,goTo,getUp);
            storage.save({
                key:date,
                data:{
                    sleepTime:sleepTime,
                }
            }).then(()=>{
                this.toggleModal();
            }).catch((e)=>{
                console.error(e);
            })


        }
        return (
            <View style={styles.container}>
                <Button title="Show modal" onPress={this.toggleModal}/>
                <Modal
                    visible={this.state.isModalVisible}
                    animationType={"slide"}
                    style={styles.container}
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <Text>Hello!</Text>
                        <input type="date" value = {this.state.dateField} onChange = {this._handleDateChange}></input>
                        <input type="time" value = {this.state.getUpField} onChangeText = {this._handleGetUpChange}></input>
                        <input type="time" value = {this.state.goToBedField} onChangeText = {this._handleGoToChange}></input>
                        <Button title="記録" onPress={recordTimeOfSleeping}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
