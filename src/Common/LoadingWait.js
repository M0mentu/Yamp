import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { View, Image, ImageBackground, StyleSheet, Text, Modal, Dimensions } from 'react-native'
var { height, width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

class LoadingWait extends Component {

    render() {
        const { animationType, visible } = this.props
        const { WrapperStyle, loaderImageStyle, loaderContainer } = style
        return (
            <Modal

                visible={visible}
                animationType={animationType}
                transparent={true}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)','rgba(0,0,0,0.5)', 'transparent', ]}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }} style={WrapperStyle}>
                    <LinearGradient
                        colors={['#00FFFF', '#17C8FF', 'transparent', 'transparent', '#6536FF', '#8000FF']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={loaderContainer}>
                        <Image
                            style={loaderImageStyle}
                            source={require('../Assets/cube.gif')}
                        />

                    </LinearGradient>

                    </LinearGradient>

            </Modal>
        );
    }

};
const style = StyleSheet.create({
    WrapperStyle: {
        zIndex: 9,
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,

    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',

        backgroundColor: '#2A2E43',

        width: 87, height: 87
    },
    loaderImageStyle: {
        width: 85,
        height: 85,


    }
})

LoadingWait.PropTypes = {
    animationType: PropTypes.string.isRequired,
    modalVisible: PropTypes.bool.isRequired
}
export default LoadingWait