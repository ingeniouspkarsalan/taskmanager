import { GET_TASKS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    having : false,
    tasks : {}
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_TASKS:
        return{
            ...state,
            having:!isEmpty(action.payload),
            tasks:action.payload
        }
        default:
        return state;
    }
}