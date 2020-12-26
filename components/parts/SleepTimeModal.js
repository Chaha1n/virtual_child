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
        isModalVisible: false,
        dateField: this._getDefaultDate().toString(),
        goToBedField: "00:00",
        getUpField: "00:00",
    }

    constructor() {
        super();
        this.state.isModalVisible = false
        this.toggleModal = this.toggleModal.bind(this);
        this._handleGetUpChange = this._handleGetUpChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._handleGoToChange = this._handleGoToChange.bind(this);
    }

    toggleModal() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    };

    _getDefaultDate() {
        const d = new Date();
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`;
    }

    _handleDateChange = inputDate => {
        this.setState({dateField: inputDate.target.value});
        console.log(inputDate.target.value);
    }
    _handleGetUpChange = inputGetUp => {
        this.setState({getUpField: inputGetUp.target.value});
        console.log(inputGetUp.target.value)
    }
    _handleGoToChange = inputGoTo => {
        this.setState({goToBedField: inputGoTo.target.value});
    }

    render() {
        const recordTimeOfSleeping = () => {
            let date = this.state.dateField.toString();
            let goTo = this.state.goToBedField.toString();
            let getUp = this.state.getUpField.toString();

            let [gotoH, gotoM] = goTo.toString().split(":");
            let [getUpH, getUpM] = getUp.toString().split(":");

            getUpH = parseInt(getUpH)<0 ? parseInt(getUpH) : parseInt(getUpH)+24;

            console.log(gotoH, gotoM, getUpH, getUpM);
            let sleepHours, sleepMinutes = "00";


            sleepHours = getUpH - parseInt(gotoH);
            sleepMinutes = parseInt(getUpM) - parseInt(gotoM);

            if (sleepMinutes < 0) {
                sleepHours -= 1;
                sleepMinutes += 60;
            }

            //init react-native-storage
            const storage = new Storage({
                storageBackend: AsyncStorage,
            });
            storage.save({
                key: date,
                data: {
                    hours: sleepHours,
                    minutes: sleepMinutes,
                }
            }).then(() => {
                this.toggleModal();
            }).catch((e) => {
                console.error(e);
            });
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
                        <input type="date" value={this.state.dateField} onChange={this._handleDateChange}></input>
                        <input type="time" value={this.state.goToBedField} onChange={this._handleGoToChange}></input>
                        <input type="time" value={this.state.getUpField} onChange={this._handleGetUpChange}></input>
                        <Button title="記録" onPress={recordTimeOfSleeping}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
