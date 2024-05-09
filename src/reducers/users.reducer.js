import { GET_USERS ,DEL_USER} from "../actions/users.actions";

const initialState={}

export default function usersReducer(state=initialState,action) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        case DEL_USER:
                return action.payload;
        default:
            return state;
    }
}