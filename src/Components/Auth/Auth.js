import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Content, Header, ScrollableTab, Tabs, Tab } from 'native-base';
import Login from './Login'
import SignUp from './SignUp'
export class Auth extends Component {
    render() {
        const { ContainerStyle } = style
        return (

            <Container style={ContainerStyle}>
                <Header
                    hasTabs
                    transparent iosStatusbar='#2A2E43'
                    androidStatusBarColor='#2A2E43'
                    style={{ height: 0 }} />
                <Content>
                    <Tabs
                        tabBarUnderlineStyle={{}}
                    >
                        <Tab heading="SIGN IN"
                            textStyle={{ color: '#fff' }}
                            tabStyle={{ backgroundColor: "#2A2E43" }}
                            activeTabStyle={{ backgroundColor: "#2A2E43" }}>
                            <Login />
                        </Tab>
                        <Tab heading="SIGN UP"
                            textStyle={{ color: '#fff' }}
                            tabStyle={{ backgroundColor: "#2A2E43" }}
                            activeTabStyle={{ backgroundColor: "#2A2E43" }}>
                            <SignUp />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}
const style = StyleSheet.create({
    ContainerStyle: {
        backgroundColor: "#2A2E43",
        flex: 1

    }
})

export default Auth
