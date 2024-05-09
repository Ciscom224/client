import { GET_QUIZ } from "../actions/quiz.actions";

const initialState={}
export default function quizReducer(state=initialState,action){
    
    switch (action.type) {
        case GET_QUIZ:
            return action.payload;
     
        default:
            return state;
    }
}