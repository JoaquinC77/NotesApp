import { combineReducers } from "redux";
import userReducer from './userReducer';
import notasReducer from './notasReducer';

export default combineReducers({
    notas: notasReducer,
    users: userReducer,
})