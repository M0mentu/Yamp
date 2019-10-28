import React, { Component } from 'react'
import { Text, View, ImageBackground, Dimensions, StyleSheet, Button } from 'react-native'
import { Container, Header, Left, Body, Right, Icon, Content } from 'native-base'
import { GetUserInfo, getUserFriendsAction } from '../../Actions'
import ImagePickerComp  from '../../Common/ImagePickerComp'
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Modal from "react-native-modal";

var { height, width } = Dimensions.get('window');

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            response: ''
        };

    }

    componentDidUpdate(prevProps) {
        console.log("previous", prevProps)

        if (prevProps.userInfo !== this.props.userInfo) {
     console.log("wtf",this.props.userInfo)
        }
    }
    render() {
        const { userInfo } = this.props
        console.log("dsadsads", this.props.userInfo);
        console.log('user props', this.props)
        const { ImageStyle, IconStyle, linearGradient, ContainerStyle, NameTextStyle, BottomContainerStyle, FriendsText
            , FriendsNumberText, IconsContainer, InnerIconsContainer, IconText, seperatorStyle } = style
        return (
            <Container style={ContainerStyle}>

                <ImageBackground resizeMode={'cover'} source={{ uri: userInfo.user.image }} style={ImageStyle}>
                    <Header
                        transparent iosStatusbar='#2A2E43'
                        androidStatusBarColor='transparent'>
                        <Left>
                            <Icon onPress={_ => Actions.pop()} type="Feather" name="arrow-left" style={IconStyle} />
                        </Left>
                        <Body>
                            <Text></Text>
                        </Body>
                        <Right>
                            <ImagePickerComp />
                        </Right>
                    </Header>
                    <LinearGradient colors={['transparent', '#2A2E43']} style={linearGradient}>
                        <Text style={NameTextStyle}>{userInfo.user.name} </Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={BottomContainerStyle} >
                    <Text style={FriendsNumberText}>{userInfo.user.friends.length}</Text>
                    <Text style={FriendsText}>{userInfo.user.friends.length > 1 ? "FRIENDS" : "FRIEND"}</Text>
                    <View style={IconsContainer}>
                        <View style={InnerIconsContainer}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon onPress={() => Actions.push('chat')} type="MaterialIcons" name="chat-bubble-outline" style={{ color: "#3ACCE1", fontSize: 35, }} />
                                <Text style={IconText}>Chat</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon type="Ionicons" name="md-square-outline" style={{ color: "#3497FD", fontSize: 35 }} />
                                <Text style={IconText}>Docks</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon type="SimpleLineIcons" name="location-pin" style={{ color: "#665EFF", fontSize: 35 }} />
                                <Text style={IconText}>Location</Text>
                            </View>
                        </View>
                        <View style={seperatorStyle} />
                        <View style={InnerIconsContainer}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon onPress={_ => Actions.push('friendlist')} type="Feather" name="users" style={{ color: "#C840E9", fontSize: 35 }} />
                                <Text style={IconText}>Friends</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon type="Feather" name="sliders" style={{ color: "#FF4F9A", fontSize: 35 }} />
                                <Text style={IconText}>Docks</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Icon type="Feather" name="bell" style={{ color: "#FF9057", fontSize: 35 }} />
                                <Text style={IconText}>Location</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
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
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ContainerStyle: {
        flex: 2,
        backgroundColor: "#2A2E43",

    },
    NameTextStyle: {
        color: "#fff",
        fontSize: 45,
        marginTop: height * 0.35,
        fontWeight: '400',
        fontFamily: "sspl"
    },
    BottomContainerStyle: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FriendsNumberText: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "sspr",
        fontWeight: '200',
        textAlign: 'center'
    },
    FriendsText: {
        color: "#707070",
        fontSize: 20,
        fontFamily: "sspr",
        textAlign: 'center'
    },
    IconsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: height * 0.05,
        alignItems: 'center'
    },
    InnerIconsContainer: {

        flex: 1,
        width: width,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    IconText: {
        color: "#707070",
        fontSize: 20,
        fontFamily: "sspr",
        textAlign: 'center',
        paddingTop: 15
    },
    seperatorStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 110,
        width: width * 0.90,
        marginBottom: 30
    }
})
const mapStateToProps = ({ user }) => {
    const { userInfo, userFriends } = user
    return { userInfo, userFriends }
}
export default connect(mapStateToProps, {
    GetUserInfo,
    getUserFriendsAction
})(UserProfile)
