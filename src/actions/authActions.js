import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    RESET_PASSWORD
} from './types';

const rootPath = 'http://localhost:5000';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${rootPath}/api/users/register`, userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const loginUser = (userData, callback) => dispatch => {
    axios
        .post(`${rootPath}/api/users/login`, userData)
        .then(res => { 
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            callback(decoded);
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

export const resetPassword = (userData, callback) => dispatch => {
    console.log(userData);
    axios
        .post(`${rootPath}/api/users/reset-password`, userData)
        .then(res => {          
            callback(res);
            if (res.data.errors) {
                console.log(res);
                dispatch({
                    type:RESET_PASSWORD,
                    payload:res.data.errors
                })
            }
        })
        .catch(err => dispatch({
            type:RESET_PASSWORD,
            payload:err
        }))
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const userLoading = () => {
    return {
        type:USER_LOADING,
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
