import React, { Component } from 'react'
import { Text, View, ImageBackground, Dimensions, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Icon, Content, Button, Root, Toast } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { GetVisitedUserInfo, AddNewFriend, RemoveFriend } from '../../Actions'
import LoadingWait from '../../Common/LoadingWait'
import { Actions } from 'react-native-router-flux';
import { AlertBox } from '../../Common'

var { height, width } = Dimensions.get('window');

export class VisitedUserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            alertvisible: false,
            name: '',
            id: ''

        }
        this.props.GetVisitedUserInfo(this.props.id).then(() => {
            console.log("hi")
            this.setState({ loading: false })
        }).catch(() => {
            alert("unable to get user data")
        })
    }
    renderFriends() {
        const { visitedUser } = this.props
        if (visitedUser.user[0].friend) {
            if (visitedUser.user[0].mutualfriends.length <=0) {
                return (
                    <View>
                        <Text style={style.FriendsNumberText}>150</Text>
                        <Text style={style.FriendsText}>FRIENDS</Text>
                    </View>
                )
            }
            else {
                return (
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <View style={{flexDirection:'column',flex:0.3}}>
                            <Text style={style.FriendsNumberText}></Text>
                            <Text style={style.FriendsText}>FRIENDS</Text>
                        </View>
                        <View style={{flexDirection:'column',flex:0.3}}>
                            <Text style={style.FriendsNumberText}>150</Text>
                            <Text style={style.FriendsText}>FRIENDS</Text>
                        </View>
                    </View>
                )
            }
        }
        else {
            if (visitedUser.user[0].mutualfriends.length > 0) {
                return (
                    <View>
                        <Text style={style.FriendsNumberText}>{visitedUser.user[0].mutualfriends.length}</Text>
                        <Text style={style.FriendsText}>{visitedUser.user[0].mutualfriends.length > 1 ? "MUTUAL FRIENDS" : "MUTUAL FRIEND"}</Text>
                    </View>
                )
            }
        }
    }
    adduser(user_id) {
        console.log("the user id is", user_id)
        this.props.AddNewFriend(user_id).then(() => {
            Toast.show({
                text: `Friend Request sent`,
                type: "success"
            })
        }).catch(() => {
            Toast.show({
                text: `FRIEND REQUEST STILL PENDING `,
                type: "danger"
            })
        })
    }
    removeUser() {

        this.props.RemoveFriend(this.state.id).then(() => {
            this.setState({ alertvisible: false })
            Toast.show({
                text: `${this.state.Name} Was removed successfully `,
                type: "success"
            })
        })
    }
    removeUserAlert(userID, name) {
        this.setState({
            alertvisible: true,
            name: name,
            id: userID
        })
    }
    renderButton() {
        const { visitedUser } = this.props
        if (visitedUser.user[0].friend) {
            return (
                <View>
                    <Button onPress={_ => this.removeUserAlert(visitedUser.user[0]._id, visitedUser.user[0].name)} style={[style.AddButtonStyle,{backgroundColor:"#FF4B5D"}]}>
                        <Text style={style.ButtonTextStyle}>
                            <Icon type="Feather" name="user-minus"/>   Remove {visitedUser.user[0].name}
                             
                        </Text>
                    </Button>
                </View>
            )
        }
        else {

            return (
                <View>
                    <Button onPress={_ => this.adduser(visitedUser.user[0]._id)} style={style.AddButtonStyle}>
                        <Text style={style.ButtonTextStyle}>
                            <Icon type="Feather" name="user-plus" />   Add to friends
                        </Text>
                    </Button>
                </View>
            )
        }

    }
    render() {
        const { visitedUser } = this.props
        const { ImageStyle, IconStyle, linearGradient, ContainerStyle, NameTextStyle, BottomContainerStyle, FriendsText
            , FriendsNumberText, IconsContainer, InnerIconsContainer, IconText, seperatorStyle } = style

        if (this.state.loading == true) {
            return (
                <Container style={ContainerStyle}>
                    <LoadingWait visible={this.state.loading} animationType="fade" />
                    <ImageBackground resizeMode={'cover'} source={require("../../Assets/back.png")} style={ImageStyle}>
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
                                <Icon type="Entypo" name="dots-three-horizontal" style={IconStyle} />
                            </Right>
                        </Header>
                        <LinearGradient colors={['transparent', '#2A2E43']} style={linearGradient}>
                            <Text style={NameTextStyle}> </Text>
                        </LinearGradient>
                    </ImageBackground>
                   
                </Container>
            )
        }
        else {
            return (
                <Root>
                    <Container style={ContainerStyle}>
                    <Modal
                        isVisible={this.state.alertvisible}
                        animationIn={"slideInLeft"}
                        animationOut={"slideOutRight"}
                        backdropColor={'transparent'}
                        onBackdropPress={() => this.setState({ alertvisible: false })}
                        style={{
                            margin: 0, alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <AlertBox
                            cancelText={"Cancel"}
                            checkText={"Remove"}
                            cancel={() => { this.setState({ alertvisible: false }) }}
                            check={() => { this.removeUser() }}
                            title={"are you sure you want to remove " + this.state.Name + " from your friend list"}

                        />
                    </Modal>
                        <ImageBackground resizeMode={'cover'} source={{ uri: visitedUser.user[0].image }} style={ImageStyle}>

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
                                    <Icon type="Entypo" name="dots-three-horizontal" style={IconStyle} />
                                </Right>
                            </Header>
                            <LinearGradient colors={['transparent', '#2A2E43']} style={linearGradient}>
                                <Text style={NameTextStyle}>{visitedUser.user[0].name} </Text>
                            </LinearGradient>
                        </ImageBackground>
                        <View style={BottomContainerStyle} >
                            {this.renderFriends()}
                            {this.renderButton()}


                        </View>
                    </Container>
                </Root>
            )
        }

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
    },
    AddButtonStyle: {
        width: width * 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#665EFF',
        elevation: 0,
        justifyContent: 'center'

    },
    ButtonTextStyle: {
        textAlign: 'center',
        fontFamily: 'sspr',
        fontSize: 20,
        color: "#fff",

    }
})
const mapStateToProps = ({ main }) => {
    const { visitedUser } = main
    return { visitedUser }
}
export default connect(mapStateToProps, { GetVisitedUserInfo, AddNewFriend, RemoveFriend })(VisitedUserProfile)
