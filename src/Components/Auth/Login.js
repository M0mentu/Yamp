import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Alert,KeyboardAvoidingView } from 'react-native'
import { Container, Content, Header, Input, Item, Button, Text,key} from 'native-base';
import { Spinner, Label } from '../../Common'
import { emailChangedSignIn, passwordChangedSignIn, SignInAction, VerifyEmailAction } from '../../Actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');
export class Login extends Component {
    constructor(props) {
        super(props)
        
       
    }
    //===========================================
    onEmailChange(text) {
        this.props.emailChangedSignIn(text);

    }
    //===========================================
    onPasswordChange(text) {
        this.props.passwordChangedSignIn(text);
    }
    //===========================================
    SignIn() {

        const { signinEmail, signinPassword } = this.props;
        if (signinEmail.length > 0 && signinPassword.length > 0) {
            this.props.SignInAction(signinEmail, signinPassword);
        }
        else (alert("sign in fail"))

    }
    renderButton() {
        if (this.props.signInLoading) {
            return (<Spinner size="large" />)
        }
        else {
            return (
                <Button onPress={this.SignIn.bind(this)} style={style.ButtonStyle}>
                    <Text style={style.ButtonText}>
                        CONTINUE
                </Text>
                </Button>
            )
        }
    }

    render() {
        const { ContainerStyle, inputStyle, ItemStyle, } = style
        const { signinEmail, signinPassword } = this.props

        return (
  
            <View style={ContainerStyle}>
                <Item rounded style={ItemStyle}>
                    <Input keyboardType={"email-address"}
                        textContentType={"emailAddress"}
                        keyboardAppearance={"dark"}
                        placeholderTextColor="#959DAD"
                        style={inputStyle} placeholder='Email'
                        value={signinEmail}
                        onChangeText={this.onEmailChange.bind(this)} />
                </Item>
                <Item rounded style={ItemStyle}>
                    <Input secureTextEntry
                        textContentType={"password"}
                        keyboardAppearance={"dark"}
                        placeholderTextColor="#959DAD"
                        style={inputStyle}
                        placeholder='Password'
                        value={signinPassword}
                        onChangeText={this.onPasswordChange.bind(this)} />
                </Item>
               
                <Label styl={{ color: '#fff' }}>FORGOT PASSWORD ?</Label>
                {this.renderButton()}
        
            </View>
        )
    }
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
const mapStateToProps = ({ auth }) => {
    const { signinEmail
        , signinPassword
        , signInLoading
        , user } = auth

    return {
        signinEmail
        , signinPassword
        , signInLoading
        , user
    }
}
export default connect(mapStateToProps, { emailChangedSignIn, passwordChangedSignIn, SignInAction, VerifyEmailAction })(Login)
