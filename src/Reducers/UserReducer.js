import {
    GET_USER_INFO, GET_USER_FRIENDS, SEARCH_FRIENDS, ADD_FRIEND, REMOVE_FRIEND, GET_SEARCH_TEXT_FRIENDS
} from '../types'
const INITIAL_STATE = {
    userInfo: '', userFriends: '', searchFriends: '', addFriendR: '', searchTextFriends: ''
}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_USER_INFO:
            return { ...state, userInfo: action.payload }

        case GET_USER_FRIENDS:
            return { ...state, userFriends: action.payload }


        case SEARCH_FRIENDS:
            return { ...state, searchFriends: action.payload }

        case ADD_FRIEND:
            return { ...state, addFriendR: action.payload }  

        case GET_SEARCH_TEXT_FRIENDS:
            return { ...state, searchTextFriends: action.payload }



        default:
            return state
    }

}