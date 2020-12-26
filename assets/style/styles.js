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
        backgroundColor: 'gray'
    }

});
