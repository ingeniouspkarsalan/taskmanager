import { GET_ERRORS,GET_TASKS,DELETE_TASK } from "./types";
import axios from 'axios';


export const alltasks = () => dispatch =>{
    axios.get('api/alltask')
    .then(res=>{
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


export const deletetask = (id,history) => dispatch =>{
    axios.delete(`api/deletetask/${id}`)
    .then(res=>{
        history.push('/dashboard')
        dispatch(setdeletetask(id))
    })
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};


export const setdeletetask = id =>{
    return{
        type:DELETE_TASK,
        payload:id
    }
}

export const updatetask = (id,history) => dispatch =>{
    axios.patch(`api/updatetask/${id}`)
    .then(res=>history.push('/dashboard'))
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};