import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'modal-react-native-web';
import styles from "../../assets/style/styles";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';//

export default class SleepTimeModal extends React.Component {

    state = {
        isModalVisible: false,
    }

    constructor() {
        super();
        this.state.isModalVisible = false
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    };

    render() {
        const defaultDate = ()=>{
            const d = new Date();
            const year   = d.getFullYear();
            const month  = ("0"+(d.getMonth()+1)).slice(-2);
            const day    = ("0"+d.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
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
                        <input type="date" value={defaultDate()}></input>
                        <input type="time" id="go_to_bed" required></input>
                        <input type="time" id="get_up" required></input>
                        <Button title="記録" onPress={()=>{

                            let goTo = document.getElementById("go_to_bed").value;
                            let getUp = document.getElementById("get_up").value;

                            //init react-native-storage
                            const storage = new Storage({
                                storageBackend:AsyncStorage,
                            });
                            console.log(goTo,getUp);//TODO save times
                            this.toggleModal();
                        }}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
