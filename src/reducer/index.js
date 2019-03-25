import { combineReducers } from "redux";
import authReducer from "./authreducer";
import taskReducer from "./tasksreducer";
import errorReducer from "./errorreducer";
export default combineReducers({
    auth:authReducer,
    task:taskReducer,
    errors:errorReducer
});