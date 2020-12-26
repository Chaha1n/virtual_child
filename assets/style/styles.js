import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        marginTop:Dimensions.get('window').height*0.5,
        height:Dimensions.get('window').height*0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffff0'
    },
    showModalButton: {
        marginRight:Dimensions.get('window').width*0.2,
        marginTop: Dimensions.get('window').height*0.8,
    },
    closeButton:{
        width:200,
        height:200,
    }

});
