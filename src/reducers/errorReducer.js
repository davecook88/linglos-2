import { GET_ERRORS, RESET_PASSWORD } from "../actions/types";

const initialState = {};

export default function(state = initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        case RESET_PASSWORD:
            return action.payload
        default:
            return state;
    }
}