import {
    SIGNUP_EMAIL_CHANGE, SIGNUP_NAME_CHANGE, SIGNUP_PASSWORD_CHANGE, SIGNUP_PASSWORD_RETYPE_CHANGE, SIGNUP_SUCCESS, SIGNUP_FAIL, SIGNUP
    , SIGNIN_EMAIL_CHANGE, SIGNIN_PASSWORD_CHANGE, SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNIN
    , VERIFY_ACCOUNT, VERIFY_SUCCESS, VERIFY_FAIL
} from '../types'
import { Actions } from 'react-native-router-flux'
import { storeUserKey, getUserKey,apilink } from '../Helper'
const axios = require('axios');


//=================SIGN UP===================
export const emailChangedSignUp = (Text) => {
    return {
        type: SIGNUP_EMAIL_CHANGE,
        payload: Text
    }
}
export const nameChangedSignUp = (Text) => {
    return {
        type: SIGNUP_NAME_CHANGE,
        payload: Text
    }
}
export const passwordChangedSignUp = (Text) => {
    return {
        type: SIGNUP_PASSWORD_CHANGE,
        payload: Text
    }
}
export const passwordRetypeChangedSignUp = (Text) => {
    return {
        type: SIGNUP_PASSWORD_RETYPE_CHANGE,
        payload: Text
    }
}
export const SignUpAction = (name, email, password) => dispatch => {
    console.log(email, name, password)
    dispatch({
        type: SIGNUP,
    })
    return new Promise((resolve, reject) => {
        axios.post(`${apilink}/user`, {
            name,
            email,
            password,
        })
            .then(function (response) {
                console.log(response.data);
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: response
                });
                Actions.verify();
                resolve(true)
            })

            .catch(function (error) {
                console.log("signup error", error);
                dispatch({
                    type: SIGNUP_FAIL
                });
                reject(false)
            });
        });
        // fetch('http://yamp-env.pyvjpmvwyr.us-east-1.elasticbeanstalk.com/user/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: name, email: email, password: password
        //     })
        // })
        //      .then((response) => response.json().catch((error)=>{console.log("awl response",error)}))
        //     .then((responseJson) => {
        //         console.log("after", responseJson)

        //         if (responseJson.status != 200) {
        //             console.log("status", responseJson.status)

        //             console.log("response error", responseJson)

        //             // dispatch({
        //             //     type: SIGNUP_FAIL
        //             // });
        //             // reject(false)

        //         }

        //         else {
        //             console.log("SignIn success", responseJson)
        //             // dispatch({
        //             //     type: SIGNUP_SUCCESS,
        //             //     payload: responseJson
        //             // });
        //             // Actions.verify();
        //             // resolve(true)

        //         }
        //     }).catch((error) => {
        //         console.log("SignIn error", error)
        //         dispatch({
        //             type: SIGNUP_FAIL,
        //             payload: responseJson
        //         });
        //         // reject(false)

        //     });

  
}
const SignUpSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_SUCCESS,
        payload: user
    })

    alert("signup success");

}
const SignUpFail = (dispatch, error) => {
    dispatch({
        type: SIGNUP_FAIL
    });
    alert(error);

}
//===========================================
//=================SIGN IN===================
export const emailChangedSignIn = (Text) => {
    return {
        type: SIGNIN_EMAIL_CHANGE,
        payload: Text
    }
}
export const passwordChangedSignIn = (Text) => {
    return {
        type: SIGNIN_PASSWORD_CHANGE,
        payload: Text
    }
}
export const SignInAction = (email, password) => dispatch => {
    console.log(email, password)
    dispatch({
        type: SIGNIN,
    })
    return new Promise((resolve, reject) => {

        fetch(`${apilink}/user/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email, 'password': password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 403) {


                }
                else if (responseJson.status != 200) {
                    console.log("status", responseJson.status)

                    console.log("response error", responseJson)

                    SignInFail(dispatch, responseJson.message)
                    reject(false)

                }

                else {
                    console.log("SignIn success", responseJson)
                    storeUserKey(responseJson.authToken)
                    SignInSuccess(dispatch, responseJson)
                    Actions.main({ type: 'reset' });
                    resolve(true)

                }
            })
            .catch((error) => {
                console.log("SignIn error", error)
                SignInFail(dispatch, responseJson.message)
                reject(false)

            });
    });
}
const SignInSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNIN_SUCCESS,
        payload: user
    })

}
const SignInFail = (dispatch, error) => {
    dispatch({
        type: SIGNIN_FAIL
    });
    alert(error);

}
//===========================================
export const VerifyEmailAction = (code, token) => dispatch => {
    console.log("Verify email params", code, token)
    dispatch({
        type: VERIFY_ACCOUNT
    })
    fetch(`${apilink}/user/activateemail`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify({
            'code': code
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.status != 200) {
                console.log("response error", responseJson)

                VerifyFail(dispatch, responseJson.message)
            }
            else {
                console.log("signup success", responseJson)
                VerifySuccess(dispatch, responseJson)
            }
        })
        .catch((error) => {
            console.log("signup error", error)
            SignUpFail(dispatch, responseJson.message)
        });

}
const VerifySuccess = (dispatch, user) => {
    dispatch({
        type: VERIFY_SUCCESS,

    })
    alert("VERIFY success");
    Actions.mapviewcomp()

}
const VerifyFail = (dispatch, error) => {
    dispatch({
        type: VERIFY_FAIL,
        payload: error
    });
    alert("VERIFY FAIL");


}