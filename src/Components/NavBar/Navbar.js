import {
    View, Image, StatusBar, TouchableWithoutFeedback, Dimensions, Text
} from 'react-native';
import { searchTextChange, SearchItemsAction } from '../../Actions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Container, Header, Content, Left, Right, Body, Icon, Input, Item } from 'native-base'
import { Actions, Router, Scene } from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');

export class Navbar extends Component {
    render() {
        return (

            <Header
                iosStatusbar='#2A2E43'
                androidStatusBarColor='#2A2E43'
                style={styles.headerStyle}>
                <Left style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
                        <Icon type="AntDesign" name="menufold" style={{ color:'#fff',fontSize: 35 }} />
                    </TouchableWithoutFeedback>
                </Left>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text> </Text>
                </View>
                <Right style={{ flex: 1 }}>
                    <Text></Text>
                    {/* <Item style={{ width: width * 0.80, borderBottomWidth: 0 }}>
                        <Input onChangeText={this.onTextChange.bind(this)}
                            returnKeyType='search'
                            autoFocus={true}

                            onSubmitEditing={_ => {
                                if (this.props.searchText != '') {
                                    Actions.searchresult()
                                }
                            }}
                            value={this.props.searchText} placeholder="Search Item"
                            style={{ fontSize: 15, height: 40, borderWidth: 1, borderRadius: 10, borderColor: "#fefefefe", backgroundColor: "#fefefefe" }} />
                        <Icon onPress={_ => this.setState({ searchBool: false })} type="Feather" name="search" />
                    </Item> */}
                </Right>
            </Header>

        )
    }
}
const styles = {
    backgroundStyle: {
        backgroundColor: '#f2f2f2',
        height: 50,
        justifyContent: 'center',
    },
    backarrowStyle: {
        resizeMode: 'contain',
        flexDirection: 'row',
        width: 35,
        height: 35,
        left: 0,
        justifyContent: 'flex-start'
    },
    helpStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        left: 220,
        justifyContent: 'flex-end',
        position: 'relative'

    },
    settingStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        position: 'relative',
        left: 210
    },
    headerStyle: {
        backgroundColor: '#2A2E43',
        elevation: 0,
        borderBottomWidth: 0,
    },
};

export default Navbar

