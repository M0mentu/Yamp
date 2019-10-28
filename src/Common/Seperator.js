import React from 'react'
import { View, Dimensions, } from 'react-native'
var { height, width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

const Seperator = ({style}) => {

    return (
        <View style={[{ width: width * 0.40, height: height * 0.001, flexDirection: 'row', },style]}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1, paddingRight: 1 }} />
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1 }} />
        </View>
    )

}
export {Seperator}