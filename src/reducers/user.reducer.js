import { ADD_FRIEND, DEL_FRIEND, GET_USER, UPLOAD_IMG } from "../actions/user.actions";

const initialState = {}

export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER:
            return action.payload;

        case UPLOAD_IMG:
            return {
                ...state,
                profilImage: action.payload
            }
        case ADD_FRIEND:
            return {
                ...state,
                friends: [action.payload.idFriend, ...state.friends]
            }
        case DEL_FRIEND:
            return {
                ...state,
                friends: state.friends.filter((id) => id !== action.payload.idFriend)
            }
        default:
            return state;
    }
}