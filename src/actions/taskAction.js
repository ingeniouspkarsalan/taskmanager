import { GET_ERRORS,GET_TASKS } from "./types";
import axios from 'axios';


export const alltasks = () => dispatch =>{
    axios.get('api/alltask')
    .then(res=>{
        console.log(res.data);
        dispatch(settasks(res.data));
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};

export const settasks = decoded => {
    return {
      type: GET_TASKS,
      payload : decoded
    };
  };


  export const addtask = (userdata,history) => dispatch =>{
    axios.post('api/addtask',userdata)
    .then(res=>history.push('/dashboard'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};