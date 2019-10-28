import React, { Component } from 'react'
import { Text, View, ImageBackground, Dimensions, StyleSheet, } from 'react-native'
import { Container, Header, Left, Body, Right, Icon, Content, Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker'
import { getUserKey } from '../Helper'

import { connect } from 'react-redux'
import { GetUserInfo } from '../Actions'

var { height, width } = Dimensions.get('window');




   class ImagePickerComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            filePath: '',
            fileData: '',
            fileUri: '',
            userKey: ''
        };
        getUserKey().then((val) => {
            this.setState({ userKey: val })
        })
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    LaunchCamera() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                //const source = { uri: response.uri };
                var myHeaders = new Headers();
                myHeaders.append("authToken", this.state.userKey);

                console.log("image", response)
                var formdata = new FormData();
                formdata.append("image", {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }, response.fileName);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };
                fetch('http://yamp-env.pyvjpmvwyr.us-east-1.elasticbeanstalk.com/user/image', requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result)).then(()=>{this.props.GetUserInfo()})
                    .catch(error => console.log('error', error));
            }
        });

    }
    LaunchGallery() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {

                var myHeaders = new Headers();
                myHeaders.append("authToken", this.state.userKey);

                console.log("image", response)
                var formdata = new FormData();
                formdata.append("image", {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }, response.fileName);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };
                fetch('http://yamp-env.pyvjpmvwyr.us-east-1.elasticbeanstalk.com/user/image', requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result)).then(()=>{this.props.GetUserInfo()})
                    .catch(error => console.log('error', error));
            }
        })


    }
    renderSeperator() {
        return (
            <View style={{ width: width * 0.40, height: height * 0.001, flexDirection: 'row', paddingLeft: width * 0.02 }}>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1, paddingRight: 1 }} />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff', 'transparent']} style={{ flex: 1 }} />
            </View>
        )
    }

    render() {
        console.log("the state", this.state)
        return (
            <View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn={"slideInLeft"}
                    animationOut={"slideOutRight"}
                    backdropColor={'transparent'}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    style={{
                        margin: 0, alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <LinearGradient
                        colors={['#00FFFF', '#17C8FF', 'transparent', 'transparent', '#6536FF', '#8000FF']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={{ height: height * 0.205, width: width * 0.705, alignItems: 'center', justifyContent: 'center', }}
                    >
                        <View style={style.InnecrContainerStyle}>

                            <Text style={style.TextStyle}>Select profile picture</Text>


                            <Button onPress={() => this.LaunchCamera()} style={style.ButtonStyle} iconLeft transparent>
                                <Icon name='camera' type="Feather" style={style.iconStyle} />
                                <Text style={style.ButtonTextStyle}>Camera</Text>
                            </Button>
                            {this.renderSeperator()}
                            <Button onPress={() => this.LaunchGallery()} style={[style.ButtonStyle, { marginTop: 0 }]} iconLeft transparent>
                                <Icon name='image' type="Feather" style={style.iconStyle} />
                                <Text style={style.ButtonTextStyle}>Gallery</Text>
                            </Button>


                        </View>
                    </LinearGradient>
                </Modal>
                <Icon onPress={() => this.toggleModal()} type="Feather" name="aperture" style={style.IconStyle} />
            </View >
        );
    }
};
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
export default connect(null,{GetUserInfo})(ImagePickerComp)