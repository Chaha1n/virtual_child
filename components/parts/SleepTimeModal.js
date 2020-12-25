import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'modal-react-native-web';
import styles from "../../assets/style/styles";

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
        return (
            <View style={styles.container}>
                <Button title="Show modal" onPress={this.toggleModal}/>
                <Modal
                    visible={this.state.isModalVisible}
                    animationType={"slide"}
                    style={styles.container}>
                    <View style={styles.container}>
                        <Text>Hello!</Text>
                        <input type="time" id="go_to_bed" required></input>
                        <input type="time" id="get_up" required></input>
                        <Button title="記録" onPress={()=>{
                            let goTo = document.getElementById("go_to_bed").value;
                            let getUp = document.getElementById("get_up").value;
                            console.log(goTo,getUp);//TODO save times
                            this.toggleModal();
                        }}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
