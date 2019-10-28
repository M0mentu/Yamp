import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, Image, Keyboard, Alert,TouchableOpacity } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, Button, Item, Input, Root, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Modal from "react-native-modal";

import { getUserFriendsAction, searchUserFriendsAction, friendListSearchText, RemoveFriend } from '../../Actions'
import * as Animatable from 'react-native-animatable';
import { Seperator } from '../../Common'
import { AlertBox } from '../../Common'

var { height, width } = Dimensions.get('window');

const ListTest = [
    {
        id: 1,
        country: 'Canda',
        name: 'mai',
        pic: require('../../Assets/p1.png')
    },
    {
        id: 2,
        country: 'Egypt',
        name: 'Arya',
        pic: require('../../Assets/p2.png')
    },
    {
        id: 3,
        country: 'USA',
        name: 'Silva',
        pic: require('../../Assets/p3.png')
    },
    {
        id: 4,
        country: 'Russia',
        name: 'Dany',
        pic: require('../../Assets/p4.png')
    },
    {
        id: 5,
        country: 'Japan',
        name: 'Yi',
        pic: require('../../Assets/p5.png')
    },
    {
        id: 6,
        country: 'France',
        name: 'Anita',
        pic: require('../../Assets/p6.png')
    },
]


export class FriendList extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;

        this.state = {
            searBarFocused: false,
            visible: false,
            Name: '',
            uid: ''
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100,
        };
        this.props.getUserFriendsAction();
    }
    keyExtractor = (item, index) => item._id;
    renderMutualFriends(item) {
        if (item.mutualfriends != undefined) {
            if (item.mutualfriends.length != 0) {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Icon type="Feather" name="users" style={{ color: "#78849E", fontSize: 18, paddingRight: 10 }} />
                        <Text style={style.TextStyleCountry}>{item.mutualfriends.length} Mutual friends</Text>
                    </View>

                )
            }
        }

    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    RemoveFriend(id, name) {
        this.setState({
            visible: true,
            Name: name,
            uid: id
        })
    }
    renderItems = ({ item }) => {

        return (
            <View>
                <TouchableOpacity onPress={()=>Actions.push("visiteduserprofile",{id:item._id})} style={style.listContainerStyle}>
                    <Animatable.View animation={"slideInLeft"} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Image style={style.ImageStyle} source={{ uri: item.image }} />
                    </Animatable.View>
                    <Animatable.View animation={"slideInLeft"} style={{ flex: 2, justifyContent: "center", flexDirection: 'column' }}>
                        <Text style={style.TextStyleName} key={item.id}>{item.name.toUpperCase()}</Text>
                        {this.renderMutualFriends(item)}
                    </Animatable.View>

                    <Right>
                        <Button onPress={_ => this.RemoveFriend(item._id, item.name)} style={style.AddButtonStyle}>
                            <Text style={style.ButtonTextStyle}>
                                <Icon type="Feather" name="user-minus" />
                            </Text>
                        </Button>
                    </Right>

                </TouchableOpacity >
                <View style={{ justifyContent: 'center' }}>
                    <Seperator style={{ width: width }} />
                </View>
            </View>

        )
    }
    componentDidMount() {
        this.keyBoardDidShow = Keyboard.addListener('keyboardDidShow', this.keyBoardDidShow)
        this.keyBoardDidHide = Keyboard.addListener('keyboardDidHide', this.keyBoardDidHide)

    }
    keyBoardDidShow = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ searBarFocused: true })
        }

    }

    keyBoardDidHide = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ searBarFocused: false })
        }
    }
    SearchTextChanged = (text) => {
        this.props.friendListSearchText(text)
    }
    SearchFriends = () => {
        this.props.searchUserFriendsAction(this.props.searchTextFriends);

    }
    renderList() {
        if (this.props.searchTextFriends.length != 0) {
            console.log("if")
            return (
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.searchFriends.friends}
                    renderItem={this.renderItems}
                    viewabilityConfig={this.viewabilityConfig}
                />
            )
        }

        else {
            console.log("else")

            return (
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.userFriends.friends}
                    renderItem={this.renderItems}
                    viewabilityConfig={this.viewabilityConfig}
                />
            )
        }

    }
    Removepressed() {
        const { uid } = this.state;
        this.props.RemoveFriend(uid).then(() => {
            this.props.getUserFriendsAction();
        }).then(() => {
            this.setState({ visible: false })
            Toast.show({
                text: `${this.state.Name} Was removed successfully `,
                type: "success"
            })
        })

    }

    render() {

        console.log(this.state);
        const { ContainerStyle, IconStyle, BodyStyle, FriendsTextStyle } = style
        return (
            <Root>

                <Container style={ContainerStyle}>
                    <Header
                        searchBar rounded
                        transparent iosStatusbar='#2A2E43'
                        androidStatusBarColor='transparent'>
                        <Left>
                            <Icon onPress={_ => Actions.pop()} type="Feather" name="arrow-left" style={IconStyle} />
                        </Left>
                        <Body>
                            <Text></Text>
                        </Body>
                        <Right>
                            <Animatable.View animation='slideInRight' duration={500} style={{ width: width * 0.8, borderBottomWidth: 0, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row-reverse', alignItems: 'center' }} >
                                <Input
                                    style={{ color: '#2A2E43', }}
                                    placeholder='Search'
                                    onChangeText={this.SearchTextChanged.bind(this)}
                                    value={this.props.searchTextFriends}
                                    autoFocus={true}
                                    onSubmitEditing={_ => this.SearchFriends()}
                                    returnKeyType='search'
                                />
                                <Animatable.View animation={this.state.searBarFocused ? "fadeInLeft" : "fadeInRight"}>
                                    <Icon type="Feather" name={this.state.searBarFocused ? 'arrow-left' : 'search'} style={[IconStyle, { color: "#2A2E43" }]} />
                                </Animatable.View>
                            </Animatable.View >
                        </Right>
                    </Header>

                    <View style={BodyStyle}>
                        <Text style={FriendsTextStyle}>Friends <Text style={[FriendsTextStyle, { color: "#78849E" }]}>80</Text></Text>
                        {this.renderList()}
                    </View>


                    <Modal
                        isVisible={this.state.visible}
                        animationIn={"slideInLeft"}
                        animationOut={"slideOutRight"}
                        backdropColor={'transparent'}
                        onBackdropPress={() => this.setState({ visible: false })}
                        style={{
                            margin: 0, alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <AlertBox
                            cancelText={"Cancel"}
                            checkText={"Remove"}
                            cancel={() => { this.setState({ visible: false }) }}
                            check={() => { this.Removepressed() }}
                            title={"are you sure you want to remove " + this.state.Name + " from your friend list"}

                        />
                    </Modal>


                </Container>
            </Root>


        )
    }
}
const style = StyleSheet.create({
    ContainerStyle: {
        backgroundColor: "#2A2E43",
        flex: 1

    },
    IconStyle: {
        color: "#fff"

    },
    BodyStyle: {
        flex: 1,
        justifyContent: 'center',

    },
    FriendsTextStyle: {
        color: "#fff",
        fontSize: 45,
        fontFamily: "sspl",
        fontWeight: '500',
        paddingLeft: width * 0.02
    },
    listContainerStyle: {
        flexDirection: 'row',
        height: 120,
        marginTop: 10,
        marginBottom: 10,



    },
    ImageStyle: {
        width: width * 0.2,
        height: height * 0.2,
        resizeMode: 'contain',
        borderRadius: 10
    },
    TextStyleName: {
        color: "#fff",
        fontSize: 25,
        fontFamily: 'sspr'

    },
    TextStyleCountry: {
        color: "#78849E",
        fontSize: 15,
        fontFamily: 'sspr'
    },
    seperatorStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 110,
        alignSelf: 'center',
        width: width * 0.95,

    },
    AddButtonStyle: {
        width: width * 0.1,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#FF4B5D',
        elevation: 0,
        justifyContent: 'center'
    },
    ButtonTextStyle: {
        textAlign: 'center',
        fontFamily: 'sspr',
        fontSize: 18,
        color: "#fff"
    }
})
const mapStateToProps = ({ user }) => {
    const { userFriends, searchFriends, searchTextFriends } = user
    return { userFriends, searchFriends, searchTextFriends }
}
export default connect(mapStateToProps, { getUserFriendsAction, searchUserFriendsAction, friendListSearchText, RemoveFriend })(FriendList)
