import {
    GET_SEARCH_PEOPLE, GET_VISITED_USER_DATA, GET_SEARCH_TEXT_USERS, ADD_NEW_FRIEND,REMOVE_FRIEND
} from '../types'
const INITIAL_STATE = {

    seachPeople: '', visitedUser: '',
    friendsSearchText: '', addFriendR: '', removeFriendR: '', removeFriendR: ''

}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case GET_SEARCH_PEOPLE:
            return { ...state, seachPeople: action.payload }

        case GET_VISITED_USER_DATA:
            return { ...state, visitedUser: action.payload }


        case GET_SEARCH_TEXT_USERS:
            return { ...state, friendsSearchText: action.payload }

        case REMOVE_FRIEND:
            return { ...state, removeFriendR: action.payload }

        case ADD_NEW_FRIEND:
            return { ...state, addFriendR: action.payload }

        // case REMOVE_FRIEND:
        //     return { ...state, removeFriendR: action.payload }
        default:
            return state
    }

}