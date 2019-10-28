import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { View, Image, ImageBackground, StyleSheet, Text, Modal, Dimensions } from 'react-native'
var { height, width } = Dimensions.get('window');

class Loading extends Component {

    render() {
        const { animationType, visible } = this.props
        const { WrapperStyle, loaderImageStyle,loaderContainer} = style
        return (
            <Modal

                visible={visible}
                animationType={animationType}
                transparent={true}
            >
                <View style={WrapperStyle}>
                    <View style={loaderContainer}>
                        <Image
                            style={loaderImageStyle}
                            source={require('../Assets/Ripple.gif')}
                        />

                    </View>
                </View>
            </Modal>
        );
    }

};
const style = StyleSheet.create({
    WrapperStyle: {
        zIndex: 9,
        position: "absolute",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,        
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '40%', top: '55%',
        backgroundColor:'#2A2E43',
        borderRadius:10,
        width:95,height:95
    },
    loaderImageStyle: {
        width: 90,
        height: 90,
    
    }
})

Loading.PropTypes = {
    animationType: PropTypes.string.isRequired,
    modalVisible: PropTypes.bool.isRequired
}
export default Loading