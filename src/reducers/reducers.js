import { combineReducers } from "redux";
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import quizReducer from "./quiz.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    quizReducer
})