import { GET_SEARCH_PEOPLE, GET_VISITED_USER_DATA, GET_SEARCH_TEXT_USERS, ADD_NEW_FRIEND, REMOVE_FRIEND } from '../types'
import { getUserKey, apilink } from '../Helper'



export const peopleSearchTextChanged = (text) => {
    return {
        type: GET_SEARCH_TEXT_USERS,
        payload: text
    }
}

export const GetPeopleSearched = (searchFriendSTR) => dispatch => {

    getUserKey().then((value) => {
        console.log("auth key", value, searchFriendSTR)
        return new Promise((resolve, reject) => {

            return fetch(`${apilink}/user/search`, {
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
                        console.log("response error", responseJson)

                        reject(false)

                    }

                    else {
                        console.log("Get friends  success", responseJson)
                        dispatch({
                            type: GET_SEARCH_PEOPLE,
                            payload: responseJson
                        })
                        resolve(true)

                    }
                })
                .catch((error) => {
                    console.log("Get friends error", error)
                    reject(false)

                });
        });

    });
}


export const AddNewFriend = (user_id) => dispatch => {
    console.log("a8a", user_id)
    return new Promise((resolve, reject) => {
    getUserKey().then((value) => {

            console.log("auth key", value, user_id)
            return fetch(`${apilink}/user/sendrequest`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value

                },
                body: JSON.stringify({
                    'friendId': user_id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("response error [Add New Friend]", responseJson)
                        reject(false)
                    }

                    else {
                        console.log("response success [Add New Friend]", responseJson)
                        dispatch({
                            type: ADD_NEW_FRIEND,
                            payload: responseJson
                        })
                        resolve(true)

                    }
                })
                .catch((error) => {
                    console.log("POST error [Add New Friend]", error)
                    reject(false)

                });
        });
    });
}
export const RemoveFriend = (user_id) => dispatch => {
    return new Promise((resolve, reject) => {
        getUserKey().then((value) => {
            fetch(`${apilink}/user/removefriend`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value
                },
                body: JSON.stringify({
                    'friendId': user_id
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("response error [Remove Friend]", responseJson)
                        reject(false)
                    }

                    else {
                        console.log("response success [Remove Friend]", responseJson)
                        dispatch({
                            type: REMOVE_FRIEND,
                            payload: responseJson
                        })
                        resolve(true)

                    }
                })
                .catch((error) => {
                    console.log("POST error [Remove Friend]", error)
                    reject(false)

                });
        }
        );
    }
    );
}
export const GetVisitedUserInfo = (user_id)=> dispatch=> {
    return new Promise((resolve, reject) => {
        getUserKey().then((value) => {
            fetch(`${apilink}/user/userprofile`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authToken': value
                },
                body: JSON.stringify({
                    'userid': user_id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status != 200) {
                        console.log("response error [GET VISITED USER INFO]", responseJson)
                        reject(false)

                    }

                    else {
                        console.log(" success [GET VISITED USER INFO]", responseJson)
                        dispatch({
                            type: GET_VISITED_USER_DATA,
                            payload: responseJson
                        })
                        resolve(responseJson)

                    }
                })
                .catch((error) => {
                    console.log("response error [GET VISITED USER INFO]", error)
                    reject(false)

                });
        });
    });
}
// export const RemoveFriend = (user_id) => dispatch => {
//     console.log("a8a", user_id)

//     getUserKey().then((value) => {
//         return new Promise((resolve, reject) => {

//             console.log("auth key", value, user_id)
//             return fetch('http://yamp-env.pyvjpmvwyr.us-east-1.elasticbeanstalk.com/user/removefriend', {
//                 method: 'PUT ',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'authToken': value

//                 },
//                 body: JSON.stringify({
//                     'friendId': user_id
//                 })
//             })
//                 .then((response) => response.json())
//                 .then((responseJson) => {

//                     if (responseJson.status != 200) {
//                         console.log("response error [Remove Friend]", responseJson)
//                         reject(false)
//                     }

//                     else {
//                         console.log("response success [Remove Friend]", responseJson)
//                         dispatch({
//                             type: REMOVE_FRIEND,
//                             payload: responseJson
//                         })
//                         resolve(true)

//                     }
//                 })
//                 .catch((error) => {
//                     console.log("POST error [Remove Friend]", error)
//                     reject(false)

//                 });
//         });
//     });
// }
