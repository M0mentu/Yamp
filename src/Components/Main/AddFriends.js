import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, Image, Keyboard, TouchableOpacity } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Icon, Button, Item, Input, } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import {
    GetPeopleSearched, searchUserFriendsAction, AddFriendAction, RemoveFriendAction, peopleSearchTextChanged
    , AddNewFriend
} from '../../Actions'
import { Seperator } from '../../Common'
import * as Animatable from 'react-native-animatable';
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


export class AddFriends extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            searBarFocused: false,
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 100

        };
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    keyExtractor = (item, index) => item._id;

    adduser(user_id) {
        console.log("the user id is", user_id)
        this.props.AddNewFriend(user_id)
    }
    renderMutualFriends(mutualfriends) {
        if (mutualfriends.length != 0) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Icon type="Feather" name="users" style={{ color: "#78849E", fontSize: 18, paddingRight: 10 }} />
                    <Text style={style.TextStyleCountry}>{mutualfriends.length} Mutual friends</Text>
                </View>

            )
        }
    }

    renderItems = ({ item }) => {

        if (item.friend == false) {
            return (
                <View>
                    <TouchableOpacity onPress={()=>Actions.push("visiteduserprofile",{id:item._id})} style={style.listContainerStyle}>
                            <Animatable.View animation={"slideInLeft"} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Image style={style.ImageStyle} source={{ uri: item.image }} />
                            </Animatable.View>
                            <View style={{ flex: 2, justifyContent: "center", flexDirection: 'column' }}>
                                <Text style={style.TextStyleName} key={item.id}>{item.name.toUpperCase()}</Text>

                                {this.renderMutualFriends(item.mutualfriends)}

                            </View>
                            <Right>
                                <Button onPress={_ => this.adduser(item._id)} style={style.AddButtonStyle}>
                                    <Text style={style.ButtonTextStyle}>
                                        <Icon type="Feather" name="user-plus" />
                                    </Text>
                                </Button>
                            </Right>
                    </TouchableOpacity >

                    <View style={{ alignItems: 'center' }}>
                        <Seperator style={{ width: width }} />
                    </View>
                </View>

            )
        }
        else {
            return (false)
        }
    }
    SearchTextChanged(text) {
        this.props.peopleSearchTextChanged(text);

    }
    searchUsers() {
        console.log("search", this.props.friendsSearchText)
        this.props.GetPeopleSearched(this.props.friendsSearchText)
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
    render() {

        const { ContainerStyle, IconStyle, BodyStyle, FriendsTextStyle } = style
        return (
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
                                onChangeText={this.SearchTextChanged.bind(this)}
                                value={this.props.friendsSearchText}
                                style={{ color: '#2A2E43', }}
                                returnKeyType='search'
                                autoFocus={true}
                                onSubmitEditing={_ => this.searchUsers()}
                                placeholder='Search' />
                            <Animatable.View animation={this.state.searBarFocused ? "fadeInLeft" : "fadeInRight"}>
                                <Icon type="Feather" name={this.state.searBarFocused ? 'arrow-left' : 'search'} style={[IconStyle, { color: "#2A2E43" }]} />
                            </Animatable.View>

                        </Animatable.View >

                    </Right>
                </Header>
                <View style={BodyStyle}>
                    <Text style={FriendsTextStyle}>Discover new <Text style={[FriendsTextStyle, { color: "#78849E" }]}>People</Text></Text>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.props.seachPeople.users}
                        renderItem={this.renderItems}
                        viewabilityConfig={this.viewabilityConfig}
                    />
                </View>
            </Container>

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
        backgroundColor: '#665EFF',
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

const mapStateToProps = ({ main }) => {
    const { seachPeople, friendsSearchText } = main
    return { seachPeople, friendsSearchText }
}
export default connect(mapStateToProps, { GetPeopleSearched, searchUserFriendsAction, AddFriendAction, RemoveFriendAction, peopleSearchTextChanged, AddNewFriend })(AddFriends)
