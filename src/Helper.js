import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import { Actions } from 'react-native-router-flux';

export const apilink="http://yamp-env.pyvjpmvwyr.us-east-1.elasticbeanstalk.com"
export const storeUserKey = async (token) => {
    try {
        console.log("storeUserKey in")
        await AsyncStorage.setItem('@storage_Key', token)
        console.log('store value', token)
    } catch (e) {
        console.log("storeUserKey error", e)
    }
}

export const getUserKey = async () => {

    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value != null) {
           // console.log('get value', value);
            return value

            const decoded = jwt_decode(value);
            console.log('decoded', decoded);
            // const expire = new Date(decoded.exp * 1000);
            // const today = new Date();
            // expire > today ? Actions.shopmain({ type: 'reset' }) : false
        }
    } catch (e) {
        console.log("get error", e)
    }
}
export const removeUserKey = async (key) => {
    try {
        console.log("remove user key",key)
        await AsyncStorage.removeItem(`@storage_Key`);
        console.log("remove user key done")
        return true;
    }
    catch (exception) {
        return false;
    }
}
