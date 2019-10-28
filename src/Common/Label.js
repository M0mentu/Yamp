import React from 'react';
import { Text, TouchableOpacity,Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

const Label = ({onPress,children,style}) => {
    const { TextStyle,containerStyle} = styles;
    return (
        <TouchableOpacity onPress={onPress} style={[containerStyle]} >
            <Text style={[TextStyle,style]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};
const styles = {
    TextStyle: {


        color: '#959DAD',
        fontSize: 18,
        fontWeight: '600',
    },
    containerStyle: {
 
     
        marginTop: height * 0.07,
        marginLeft: 5,
        marginRight: 5,
       
    }

}

export { Label };