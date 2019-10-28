import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Alert } from 'react-native'
import { Container, Content, Header, Input, Item, Button, Text } from 'native-base';
import { Spinner } from '../../Common'
import { emailChangedSignUp, nameChangedSignUp, passwordChangedSignUp, passwordRetypeChangedSignUp, SignUpAction, VerifyEmailAction } from '../../Actions'
import { connect } from 'react-redux'
import { thisExpression, updateExpression } from '@babel/types';
var { height, width } = Dimensions.get('window');


export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            femaleColor: "#999999",
            isSwitchOn: false,
            passwordError: '',
            emailError: '',
            nameError: ''
        }
    }
    onNameChange(text) {
        let reg = /^[a-zA-Z ]*$/;

        if (reg.test(text) === false) {
            this.setState({ nameError: 'Name only contains letters' })
            this.props.nameChangedSignUp(text);
            return false;
        }
        else {
            this.setState({ nameError: '' })
            this.props.nameChangedSignUp(text);

        }
    }
    renderNameError() {
        if (this.state.nameError) {
            return (
                <View >

                    <Text style={style.errortextStyle}>{this.state.nameError}</Text>


                </View>
            );
        }
    }
    //========================================================================================
    onEmailChange(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ emailError: 'Email is not correct' })
            this.props.emailChangedSignUp(text);
            return false;
        }
        else {
            this.setState({ emailError: '' })
            this.props.emailChangedSignUp(text);
            console.log("Email is  Correct");

        }
    }
    renderEmailError() {
        if (this.state.emailError) {
            return (
                <View >

                    <Text style={style.errortextStyle}>{this.state.emailError}</Text>


                </View>
            );
        }
    }
    //========================================================================================
    onPasswordChange(text) {
        this.props.passwordChangedSignUp(text);
        const { password, passwordRetype } = this.props
        console.log(password + "   zapasssss     " + passwordRetype)
        if (text == passwordRetype) {
            this.setState({ passwordError: '' })
        }
        else if (text != passwordRetype) {
            this.setState({ passwordError: 'password does not match' })
        }
    }
    onPasswordRetypeChange(text) {
        this.props.passwordRetypeChangedSignUp(text);

        const { signupPassword, signupPassRetypeword } = this.props
        console.log(signupPassword + "   zapasssss     " + signupPassRetypeword)

        if (signupPassword == text) {
            this.setState({ passwordError: '' })
        }
        else if (signupPassword != text) {
            this.setState({ passwordError: 'password does not match' })
        }
    }
    renderPasswordError() {
        if (this.state.passwordError) {
            return (
                <View >
                    <View >
                        <Text style={style.errortextStyle}>{this.state.passwordError}</Text>
                    </View>

                </View>
            );
        }
    }
    //========================================================================================
    renderButton() {
        if (this.props.signUpLoading) {
            return (<Spinner size="large" />)
        }
        else {
            return (
                <Button onPress={this.SignUpPressed.bind(this)} style={style.ButtonStyle}>
                    <Text style={style.ButtonText}>
                        CONTINUE
                </Text>
                </Button>
            )
        }
    }
    SignUpPressed() {
        const { signupEmail, signupPassword, signupName, signupPassRetypeword } = this.props
        // password == passwordRetype ? true : this.setState({ passwordError: 'password does not match' })
        if (signupEmail.length > 0 && signupPassword.length > 0 && signupName.length > 0) {
            if (this.state.passwordError == '' && this.state.emailError === '' && this.state.nameError == '') {
                //here hoes signup

                this.props.SignUpAction(signupName, signupEmail, signupPassword);
            }

        }
        else {
            //here goes catch condition
            alert("failes")
        }

    }
    render() {
        const { ContainerStyle, ContentStyle, inputStyle, ItemStyle, ButtonStyle, ButtonText } = style
        const { signupEmail, signupPassword, signupName, signupPassRetypeword } = this.props
        console.log(this.props, this.state)
        return (
            <View style={ContainerStyle}>
                <View style={ContentStyle}>
                    <Item rounded style={ItemStyle}  >
                        <Input keyboardType={"name-phone-pad"}
                            textContentType={"name"}
                            keyboardAppearance={"dark"}
                            placeholderTextColor="#959DAD"
                            style={inputStyle} placeholder='Name'
                            value={signupName}
                            onChangeText={this.onNameChange.bind(this)} />
                    </Item>
                    {this.renderNameError()}

                    <Item rounded style={ItemStyle}>
                        <Input keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            keyboardAppearance={"dark"}
                            placeholderTextColor="#959DAD"
                            style={inputStyle} placeholder='Email'
                            value={signupEmail}
                            onChangeText={this.onEmailChange.bind(this)} />
                    </Item>
                    {this.renderEmailError()}
                    <Item rounded style={ItemStyle}>
                        <Input secureTextEntry
                            textContentType={"password"}
                            keyboardAppearance={"dark"}
                            placeholderTextColor="#959DAD"
                            style={inputStyle}
                            placeholder='Password'
                            value={signupPassword}
                            onChangeText={this.onPasswordChange.bind(this)} />
                    </Item>
                    {this.renderPasswordError()}

                    <Item rounded style={ItemStyle}>
                        <Input secureTextEntry
                            textContentType={"password"}
                            keyboardAppearance={"dark"}
                            placeholderTextColor="#959DAD"
                            style={inputStyle}
                            placeholder='Renter Password'
                            value={signupPassRetypeword}
                            onChangeText={this.onPasswordRetypeChange.bind(this)} />
                    </Item>
                    {this.renderPasswordError()}

                    {this.renderButton()}
                </View>


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
    const { signupEmail
        , signupPassword
        , signupName
        , signupPassRetypeword
        , signUpLoading
    } = auth

    return {
        signupEmail
        , signupPassword
        , signupName
        , signupPassRetypeword
        , signUpLoading

    }
}
export default connect(mapStateToProps,
    {
        emailChangedSignUp,
        nameChangedSignUp,
        passwordChangedSignUp,
        passwordRetypeChangedSignUp,
        SignUpAction,
        VerifyEmailAction
    })(SignUp)
