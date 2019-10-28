import React, { Component } from 'react'
import { Text, View, ImageBackground, Dimensions, StyleSheet, } from 'react-native'
import { Container, Header, Left, Body, Right, Icon, Content, Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker'
import { getUserKey } from '../Helper'
var { height, width } = Dimensions.get('window');




const AlertBox = ({ cancel,checkText,cancelText,check,title}) => {
    return (
        <View>


            <LinearGradient
                colors={['#00FFFF', '#17C8FF', 'transparent', 'transparent', '#6536FF', '#8000FF']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={{ height: height * 0.205, width: width * 0.705, alignItems: 'center', justifyContent: 'center', }}
            >
                <View style={style.InnecrContainerStyle}>

                    <Text style={style.TextStyle}>{title}</Text>


                    <Button onPress={ cancel} style={style.ButtonStyle} iconLeft transparent>
                        <Icon name='x' type="Feather" style={style.iconStyle} />
                        <Text style={style.ButtonTextStyle}>{cancelText ? cancelText : 'No'}</Text>
                    </Button>
                    <View style={{ width: width * 0.40, height: height * 0.001, flexDirection: 'row', paddingLeft: width * 0.02 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1, paddingRight: 1 }} />
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1 }} />
                    </View>
                    <Button onPress={ check} style={[style.ButtonStyle, { marginTop: 0 }]} iconLeft transparent>
                        <Icon name='check' type="Feather" style={style.iconStyle} />
                        <Text style={style.ButtonTextStyle}>{checkText ?checkText : 'Yes'}</Text>
                    </Button>

                </View>
            </LinearGradient>

        </View >
    );
}

const style = StyleSheet.create({
    ImageStyle: {

        width: width,
        height: height * 0.55,
        //  position: 'absolute',
        backgroundColor: "#2A2E43",

    },
    IconStyle: {
        color: "#fff"
    },
    InnecrContainerStyle: {
        height: height * 0.20,
        width: width * 0.7,
        backgroundColor: "#2A2E43",
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',

    },
    TextStyle: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "sspr",
        fontWeight: '300',
        textAlign: 'center'
    },
    ButtonTextStyle: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "sspr",
        fontWeight: '200',
        textAlign: 'center'
    },
    ButtonStyle: {
        width: width * 0.3,
        borderRadius: 15,
        height: height * 0.05,
        marginTop: height * 0.02,
        elevation: 0,

    },
    iconStyle: {
        color: "#3497FD"
    }

})

export { AlertBox }