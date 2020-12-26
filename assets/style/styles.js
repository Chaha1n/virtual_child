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
        height:Dimensions.get('window').height*0.4,

        backgroundColor: '#ffff00'
    },
    modalContents:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordModalButton: {
        alignItems: 'center',
        marginTop:20,
        height:40,

    },
    closeButton:{
        width:40,
        height:40,

    }

});
