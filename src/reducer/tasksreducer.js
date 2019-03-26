import { GET_TASKS,DELETE_TASK } from "../actions/types";
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
        case DELETE_TASK:
        const taskId = action.data;
        return {
            tasks:state.tasks.filter(tasks => tasks._id !== taskId)
        };
        default:
        return state;
    }
}