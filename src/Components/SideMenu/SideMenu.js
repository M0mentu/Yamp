import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native'
import { Card } from '../../Common'
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
import { getUserKey,removeUserKey } from '../../Helper'

var { height, width } = Dimensions.get('window');

export class SideMenu extends Component {
    renderSeperator() {
        return (
            <View style={{ width: width * 0.40, height: height * 0.001, flexDirection: 'row', paddingLeft: width * 0.02 }}>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1, paddingRight: 1 }} />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1 }} />
            </View>
        )
    }
    LogOut(){
        getUserKey().then(()=>{
            removeUserKey().then(()=>{
                alert("Signed out")
                Actions.authmain({type:'reset'})
            })
        })
    }
    render() {
        console.log(this.props);
        const { ContainerStyle, ImageStyle, NameTextStyle, linearGradient,
            AddressTextStyle, ButtonsContainer, ButtonTextStyle, buttonStyle
            , LogOutViewStyle } = style
        return (
            <View style={ContainerStyle} >
                <ImageBackground blurRadius={0.2} source={{uri:this.props.userInfo.user.image}} style={ImageStyle}>
                    <LinearGradient colors={['transparent', '#2A2E43']} style={linearGradient}>
                        <Text style={NameTextStyle}>{this.props.userInfo.user.name} </Text>
                        <Text style={AddressTextStyle}>{this.props.userInfo.user.email}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={ButtonsContainer} >
                    <TouchableHighlight onPress={_ => { }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }} >

                        <View style={buttonStyle}>
                            <Icon type="SimpleLineIcons" name='home' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Home</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}


                    <TouchableHighlight onPress={_ => Actions.push("friendlist")} underlayColor={"#3497FD"} style={{ borderRadius: 10 }} >

                        <View style={buttonStyle}>
                            <Icon type="Feather" name='users' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Friends</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}

                    <TouchableHighlight onPress={_ => { Actions.push("userprofile") }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="Feather" name='user' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Profile</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}
                    <TouchableHighlight onPress={_ => { Actions.push("addfriends") }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="Feather" name='user-plus' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Add friends</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}
                    <TouchableHighlight onPress={_ => { }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="SimpleLineIcons" name='compass' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Places</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}
                    <TouchableHighlight onPress={_ => { }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="SimpleLineIcons" name='phone' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>Contact Us</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}
                    <TouchableHighlight onPress={_ => { }} underlayColor={"#3497FD"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="SimpleLineIcons" name='exclamation' style={{ fontSize: 19, color: '#fff' }} />
                            <Text style={ButtonTextStyle}>About Us</Text>
                        </View>
                    </TouchableHighlight>
                    {this.renderSeperator()}
                </View>
           

                <View style={LogOutViewStyle}>
                    <TouchableHighlight onPress={_ => {this.LogOut() }} underlayColor={"red"} style={{ borderRadius: 10 }}>
                        <View style={buttonStyle}>
                            <Icon type="SimpleLineIcons" name='logout' style={{ fontSize: 19, color: "rgba(255,255,255,0.5)", }} />
                            <Text style={[ButtonTextStyle, { color: "rgba(255,255,255,0.5)", }]}>Log Out</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    ContainerStyle: {
        flexDirection: 'column',
        backgroundColor: "#2A2E43",
        flex: 1
    },
    ImageStyle: {
        width: width * 0.5,
        height: height * 0.3,
        borderRadius: 10,
        elevation: 0,
        justifyContent: 'center'
    },
    NameTextStyle: {
        color: "#fff",
        fontSize: 25,
        marginTop: height * 0.20,
        fontWeight: '400',
        fontFamily: "sspr"
    },
    AddressTextStyle: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 15,
        fontFamily: "sspr",
        textAlign: 'center'
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }, ButtonsContainer: {
        height: height * 0.4,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: width * 0.01,
        marginTop: height * 0.05
    },
    ButtonTextStyle: {
        color: "#fff",
        fontSize: 19,
        fontWeight: '400',
        fontFamily: "sspr",
        paddingLeft: width * 0.05
    },
    buttonStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: width * 0.02

    },
    LogOutViewStyle: {
        flex: 1,

        flexDirection: 'column-reverse'
    },
    seperatorStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 110,
        width: width * 0.4,
        marginBottom: 30
    }
})
const mapStateToProps = ({ user }) => {
    const { userInfo, userFriends } = user
    return { userInfo, userFriends }
}
export default connect(mapStateToProps,null)(SideMenu)
