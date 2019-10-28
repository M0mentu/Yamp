import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import MainReducer from './MainReducer';
export default combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    main: MainReducer,
});