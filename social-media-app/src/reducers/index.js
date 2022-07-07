import {combineReducers} from "redux";
import reducer from "./posts";
import authReducer from "./auth"

const rootReducer=combineReducers({
    posts:reducer,
    auth:authReducer

})

export default rootReducer;

