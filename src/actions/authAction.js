import { GET_ERRORS,SET_CURRENT_USER,GET_TASKS } from "./types";
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registeruser = (userdata,history) => dispatch =>{
    axios.post('api/signup',userdata)
    .then(res=>history.push('/login'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};


export const loginuser = userdata => dispatch =>{
    axios.post('api/login',userdata)
    .then(res=>{
        const { token } = res.data;
        localStorage.setItem('jwt_token',token);
        setAuthToken(token);
        const decode = jwt_decode(token);
        dispatch(setCurrentUser(decode));
    })
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
};

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload : decoded
    };
  };


  export const changeimage = (file)  => dispatch =>{
    axios.post('/api/fileUpload',file)
    .then(res=>{
        const { token } = res.data;
        localStorage.setItem('jwt_token',token);
        setAuthToken(token);
        const decode = jwt_decode(token);
        dispatch(setCurrentUser(decode));
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
  };

  export const removeimage = (user) => dispatch =>{
    axios.post('/api/removeimage',user)
    .then(res=>{
        const { token } = res.data;
        localStorage.setItem('jwt_token',token);
        setAuthToken(token);
        const decode = jwt_decode(token);
        dispatch(setCurrentUser(decode));
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

  export const logoutuser = () => dispatch =>{
    localStorage.removeItem('jwt_token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch(settasks({}));
};

