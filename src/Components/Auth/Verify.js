import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import { Container, Content, Header, Input, Item, Button, Text, key } from 'native-base';
import { Spinner, Label } from '../../Common'
import { VerifyEmailAction } from '../../Actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');

export class Verify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
    }
    oncodeChange(text) {
        this.setState({ code: text })
    }
    verify() {
        this.props.VerifyEmailAction(this.state.code,this.props.user.authToken)
       
    }
    renderButton() {
        if (this.props.verifyLoading) {
            return (<Spinner size="large" />)
        }
        else {
            return (
                <Button onPress={this.verify.bind(this)} style={style.ButtonStyle}>
                    <Text style={style.ButtonText}>
                        VERIFY
        </Text>
                </Button>
            )
        }
    }

    renderError() {
        if (this.props.verifyError.length > 0) {
            return (
                <View >
                    <Text style={style.errortextStyle}>{this.props.verifyError}</Text>
                </View>
            );
        }
        else {
            return (
                <View >
                    <Text style={style.errortextStyle}></Text>
                </View>
            )
        }

    }
    render() {
        const { ContainerStyle, inputStyle, ItemStyle, } = style
        return (
            <View style={ContainerStyle}>
                <Text style={{ fontSize: 25, color: "#fff", fontWeight: '100' }}>Account Verification</Text>
                <Item rounded style={ItemStyle}>
                    <Input keyboardType={"number-pad"}
                        textContentType={"oneTimeCode"}
                        keyboardAppearance={"dark"}
                        maxLength={4}
                        placeholderTextColor="#959DAD"
                        style={inputStyle} placeholder='Verification code'
                        value={this.state.code}
                        onChangeText={this.oncodeChange.bind(this)} />
                </Item>
                {this.renderError()}
                {this.renderButton()}

            </View>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    const { user, verifyLoading, verifyError } = auth
    return { user, verifyLoading, verifyError }
}
const style = StyleSheet.create({
    ContainerStyle: {
        backgroundColor: "#2A2E43",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center"
    },
    ItemStyle: {
        width: width * 0.90,
        marginTop: height * 0.05,
        height: height * 0.08,
        backgroundColor: "#454F63",
        borderWidth: 0,
        borderColor: "#454F63",
        borderRadius: 15
    },
    inputStyle: {
        color: "#fff"
    },
    ButtonStyle: {
        width: width * 0.90,
        borderRadius: 15,
        height: height * 0.08,
        marginTop: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0

    },
    ButtonText: {
        fontSize: 20,
        fontWeight: '100'
    },
    errortextStyle: {

        color: '#b30004',
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: '300',

    },
})
export default connect(mapStateToProps, { VerifyEmailAction })(Verify)
