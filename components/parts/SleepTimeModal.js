import React from 'react';
import {Button, Text, View,Modal,Image,TouchableOpacity} from 'react-native';
import styles from "../../assets/style/styles";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class SleepTimeModal extends React.Component {

    state = {
        isModalVisible: false,
        dateField: this._getDefaultDate().toString(),
        goToBedField: "00:00",
        getUpField: "00:00",
        isDatePickerVisible:false,
        isGoToBedPickerVisible:false,
        isGetUpPickerVisible:false,
    }

    constructor() {
        super();
        this.state.isModalVisible = false
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDatePicker = this.toggleDatePicker.bind(this);
        this.toggleGoToBedPicker = this.toggleGoToBedPicker.bind(this);
        this.toggleGetUpPicker = this.toggleGetUpPicker.bind(this);
        this._handleGetUpChange = this._handleGetUpChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._handleGoToChange = this._handleGoToChange.bind(this);
    }
    toggleDatePicker(){
        this.setState({isDatePickerVisible:true});
    }
    toggleGoToBedPicker(){
        this.setState({isGoToBedPickerVisible:true});
    }
    toggleGetUpPicker(){
        this.setState({isGetUpPickerVisible:true});
    }
    toggleModal() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    };

    _getDefaultDate() {
        const d = new Date();
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        return (`${month}-${day}`);
    }

    _handleDateChange = (event,selectedDate)=> {
        const monthNameArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let d = selectedDate.toString().split(" ");
        this.setState({isDatePickerVisible:false});
        this.setState({dateField:`${monthNameArray.indexOf(d[1])+1}-${d[2]}`});
    }
    _handleGoToChange =(event,selectedTime) => {
        let d = selectedTime.toString().split(" ");
        this.setState({isGoToBedPickerVisible:false});
        this.setState({goToBedField:`${d[4]}`.slice(0,-3)});
    }
    _handleGetUpChange = (event,selectedTime) => {
        let d = selectedTime.toString().split(" ");
        this.setState({isGetUpPickerVisible:false});
        this.setState({getUpField:`${d[4]}`.slice(0,-3)});
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
                        <TouchableOpacity onPress={this.toggleModal} style={styles.closeButton}>
                            <Image
                                style={styles.closeButton}
                                source={require('../../assets/x-circle.png')
                                }>
                            </Image>
                        </TouchableOpacity>
                        <View style={styles.modalContents}>
                            <Text>日付</Text><Button title={this.state.dateField}    onPress={this.toggleDatePicker}/>
                            <Text>就寝</Text><Button title={this.state.goToBedField} onPress={this.toggleGoToBedPicker}/>
                            <Text>起床</Text><Button title={this.state.getUpField}   onPress={this.toggleGetUpPicker}/>

                            {this.state.isDatePickerVisible  && <DateTimePicker value={new Date()} onChange={this._handleDateChange} mode="date"/>}
                            {this.state.isGoToBedPickerVisible  && <DateTimePicker value={new Date()} onChange={this._handleGoToChange} mode="time"/>}
                            {this.state.isGetUpPickerVisible && <DateTimePicker value={new Date()} onChange={this._handleGetUpChange} mode="time"/>}
                        </View>
                        <View style={styles.recordModalButton}>
                            <Button color="green" title="記録" onPress={recordTimeOfSleeping}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

