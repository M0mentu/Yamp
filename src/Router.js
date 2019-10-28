import React from 'react';
import { Scene, Router, ActionConst, Drawer } from 'react-native-router-flux';
import { TouchableOpacity, View, Image, Dimensions, StyleSheet, } from 'react-native';
//=====================NavBar=================================================
import NavBar from './Components/NavBar/Navbar'
//=====================SCREENS Main===========================================

//=====================SCREENS AUTH===========================================
import Auth from './Components/Auth/Auth'
import LogIn from './Components/Auth/Login'
import Blank from './Components/Auth/blank'
//============================================================================
//=====================SCREENS Main===========================================
import MapViewComponent from './Components/Main/MapViewComponent'
import test from './Components/Main/test'
import verify from './Components/Auth/Verify'
import FriendList from './Components/User/FriendList'
import AddFriends from './Components/Main/AddFriends'
import VisitedUserProfile from './Components/Main/VisitedUserProfile'
import chat from './Components/Main/chat'
import animatedMarker from './Components/Main/animatedMarker'
//============================================================================
//=====================SCREENS USER===========================================
import UserProfile from './Components/User/UserProfile'
//============================================================================
//=====================SIDE MENU==============================================
import SideMenu from './Components/SideMenu/SideMenu'
//============================================================================
var { height, width } = Dimensions.get('window');

const RouterComponent = () => {
    return (
        <Router>
            <Scene
                key="root"
                hideNavBar >
                <Scene key='blank' component={Blank} initial />
                <Scene key='verify' component={verify} hideNavBar />

                <Scene key="authmain"  >

                    <Scene key='auth' component={Auth} hideNavBar />
                    <Scene key='signin' component={LogIn} hideNavBar />
                </Scene>
                <Scene key="main" >
                    <Drawer
                        style={{ backgroundColor: 'red' }}
                        hideNavBar
                        key="drawerMenu"
                        drawerImage={require('./Assets/icon-nav.png')}
                        contentComponent={SideMenu}
                        drawerWidth={width * 0.5}
                    >
                    
                    <Scene key='mapviewcomp' component={animatedMarker} navBar={NavBar} />

                        {/* <Scene key='mapviewcomp' component={MapViewComponent} navBar={NavBar} /> */}

                    </Drawer>

                    <Scene key="friendlist" hideNavBar component={FriendList} />
                    <Scene key='userprofile' hideNavBar component={UserProfile} />
                    <Scene key='addfriends' hideNavBar component={AddFriends} />
                    <Scene key='visiteduserprofile' hideNavBar component={VisitedUserProfile} />
                    <Scene key='chat' component={chat} hideNavBar />


                </Scene>
            </Scene>

        </Router>
    )
}
const style = StyleSheet.create({
    tapStyle: {

    }
})
export default RouterComponent