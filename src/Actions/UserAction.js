import React from 'react'
import { GET_USER_INFO, GET_USER_FRIENDS, SEARCH_FRIENDS, ADD_FRIEND, REMOVE_FRIEND, GET_SEARCH_TEXT_FRIENDS } from '../types'
import { getUserKey, apilink } from '../Helper'
export const getUserDataAction = () => dispatch => {
    //Get user data
}
export const getUserFriendsAction = () => dispatch => {
    return new Promise((resolve, reject) => {
        getUserKey().then((value) => {
            fetch(`${apilink}/user/listfriends`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("response error", responseJson)
                        reject(false)

                    }

                    else {
                        console.log("Get friends  success", responseJson)
                        dispatch({
                            type: GET_USER_FRIENDS,
                            payload: responseJson
                        })
                        resolve(responseJson)

                    }
                })
                .catch((error) => {
                    console.log("Get friends error", error)
                    reject(false)

                });
        });
    });
}
export const friendListSearchText = (text) => {
    return {
        type: GET_SEARCH_TEXT_FRIENDS,
        payload: text
    }
}
export const searchUserFriendsAction = (searchFriendSTR) => dispatch => {

    getUserKey().then((value) => {
        console.log("auth key[SEARCH FRIENDS]", value, searchFriendSTR)
        console.log("auth key[SEARCH FRIENDS]", searchFriendSTR)

        return new Promise((resolve, reject) => {

            return fetch(`${apilink}/user/searchinfriends`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value

                },
                body: JSON.stringify({
                    'name': searchFriendSTR.toLowerCase()
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("Response error [SEARCH FRIENDS]", responseJson)

                        reject(false)

                    }

                    else {
                        console.log("Success [SEARCH FRIENDS]", responseJson)
                        dispatch({
                            type: SEARCH_FRIENDS,
                            payload: responseJson
                        })
                        resolve(true)

                    }
                })
                .catch((error) => {
                    console.log("Response error [SEARCH FRIENDS]", error)
                    reject(false)
                });
        });

    });
}
export const GetUserInfo = () => dispatch => {
    return new Promise((resolve, reject) => {
        getUserKey().then((value) => {
            fetch(`${apilink}/user/getuserinfo`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("response error [GET USER INFO]", responseJson)
                        reject(false)

                    }

                    else {
                        console.log(" success [GET USER INFO]", responseJson)
                        dispatch({
                            type: GET_USER_INFO,
                            payload: responseJson
                        })
                        resolve(responseJson)

                    }
                })
                .catch((error) => {
                    console.log("response error [GET USER INFO]", error)
                    reject(false)

                });
        });
    });
}
export const AddFriendAction = () => dispatch => {
    //Get user friends
}
export const RemoveFriendAction = () => dispatch => {
    //Get user friends
}
