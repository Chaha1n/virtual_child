import React from 'react';
import {Image,View} from 'react-native';

class Smile extends React.Component {
    render(){
      return (
        <View>
          <Image
            source={require('../assets/baby_boy01_smile.png')}
            style={{backgroundColor:'white'}}
            style={{height:200,width:200}}
          />
        </View>
      );
    }
}
class Laugh extends React.Component {
    render(){
      return (
        <View>
          <Image
            source={require('../assets/baby_boy04_laugh.png')}
            style={{backgroundColor:'white'}}
            style={{height:200,width:200}}

          />
        </View>
      );
    }
}
class Shock extends React.Component {
    render(){
      return (
        <View>
          <Image
            source={require('../assets/baby_boy06_shock.png')}
            style={{backgroundColor:'white'}}
            style={{height:200,width:200}}

          />
        </View>
      );
    }
}


export default function Check(props){
    const child=props.child;
    if(child===1){
        return <Shock />;
    }
    else if(child===2){
        return <Laugh/>;

    }else{
        return <Smile/>;
    }
}



