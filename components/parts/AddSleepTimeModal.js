import {Button, Text, View} from 'react-native';
import Modal from 'modal-react-native-web';

export default class AddSleepTimeModal extends React.Component{

    state={
        isModalVisible:false,
    }

    constructor() {
        super();
        this.state.isModalVisible=false
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({isModalVisible:!this.state.isModalVisible})
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Button title="Show modal" onPress={this.toggleModal}/>

                <Modal
                    visible={this.state.isModalVisible}>
                    <View style={{flex: 1}}>
                        <Text>Hello!</Text>
                        <textarea></textarea>
                        <Button title="Hide modal" onPress={this.toggleModal}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
