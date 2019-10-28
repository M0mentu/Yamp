import {
    SIGNUP_EMAIL_CHANGE, SIGNUP_NAME_CHANGE, SIGNUP_PASSWORD_CHANGE, SIGNUP_PASSWORD_RETYPE_CHANGE, SIGNUP_SUCCESS, SIGNUP_FAIL, SIGNUP,
    SIGNIN_EMAIL_CHANGE, SIGNIN_PASSWORD_CHANGE, SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNIN
    , VERIFY_ACCOUNT, VERIFY_SUCCESS, VERIFY_FAIL,

} from '../types'
const INITIAL_STATE = {
    signupEmail: '', signupPassword: '', signupPassRetypeword: '', signupName: '', signUpLoading: false, user: '',
    signinEmail: '', signinPassword: '', signInLoading: false,
    verifyLoading: false, verifyError: '',

}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_EMAIL_CHANGE:
            return { ...state, signupEmail: action.payload }

        case SIGNUP:
            return { ...state, signUpLoading: true }

        case SIGNUP_SUCCESS:
            return { ...state, signUpLoading: false, user: action.payload }

        case SIGNUP_FAIL:
            return { ...state, signUpLoading: false }

        case SIGNIN:
            return { ...state, signInLoading: true }

        case SIGNIN_SUCCESS:
            return { ...state, signInLoading: false, user: action.payload }

        case SIGNIN_FAIL:
            return { ...state, signInLoading: false }

        case SIGNUP_NAME_CHANGE:
            return { ...state, signupName: action.payload }

        case SIGNUP_PASSWORD_CHANGE:
            return { ...state, signupPassword: action.payload }

        case SIGNUP_PASSWORD_RETYPE_CHANGE:
            return { ...state, signupPassRetypeword: action.payload }

        case SIGNIN_EMAIL_CHANGE:
            return { ...state, signinEmail: action.payload }

        case SIGNIN_PASSWORD_CHANGE:
            return { ...state, signinPassword: action.payload }

        case VERIFY_ACCOUNT:
            return { ...state, verifyLoading: true }

        case VERIFY_SUCCESS:
            return { ...state, verifyLoading: false }

        case VERIFY_FAIL:
            return { ...state, verifyLoading: false, verifyError: action.payload }

        default:
            return state
    }

}