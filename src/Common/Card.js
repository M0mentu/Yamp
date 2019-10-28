import React from 'react';
import { View,ScrollView,Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
   
     flexDirection: 'column',     
     paddingLeft:width*0.05 ,
     marginTop: height*0.07
    }
}

export  {Card};