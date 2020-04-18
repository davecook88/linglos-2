import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import globalReducer from "./globalReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    globals: globalReducer,
});