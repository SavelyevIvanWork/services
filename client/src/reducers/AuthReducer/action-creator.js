import { AUTHORIZATION_FAILURE, LOADING_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_FAILURE,
         REGISTRATION_SUCCESS, USER_LOGOUT, USER_NAME_UPDATE, USER_PASSWORD_UPDATE } from "./actions";
import axios from "axios";

export const authorizationFailureAC = (error, message) => {
    return {type: AUTHORIZATION_FAILURE, error, message}
}

export const userLogoutAC = () => {
    localStorage.clear();
    return {type: USER_LOGOUT}
}

export const userNameUpdate = (username) => {
    return {type: USER_NAME_UPDATE, username}
}

export const userPasswordUpdate = (password) => {
    return {type: USER_PASSWORD_UPDATE, password}
}

export const loadingStartedAC = () => {
    return {type: LOADING_STARTED}
}

export const registrationSuccessAC = (messages) => {
    return {type: REGISTRATION_SUCCESS, messages}
}

export const registrationFailureAC = (error) => {
    return {type: REGISTRATION_FAILURE, error}
}

export const userRegistration = (username, password) => (dispatch) => {
    dispatch(loadingStartedAC());
    axios
        .post(`/todo/registration`, {
            username,
            password
        })
        .then(response => {
            dispatch(registrationSuccessAC(response.data));
        })
        .catch(err => {
            if (err.response) {
                dispatch(registrationFailureAC(err.message))
                dispatch(registrationSuccessAC(err.response.data))
            } else {
                dispatch(registrationFailureAC(err.message))
            }
        })
}

export const loginSuccessAC = (token) => {
    return {type: LOGIN_SUCCESS, token}
}
export const loginFailureAC = (error, message) => {
    return {type: LOGIN_FAILURE, error, message}
}

export const userLogin = (username, password) => (dispatch) => {
    dispatch(loadingStartedAC());
    axios
        .post(`/todo/login`, {
            username,
            password
        })
        .then(response => {
            localStorage.setItem("Token", response.data.token);
            dispatch(loginSuccessAC(response.data));
        })
        .catch(err => {
            console.log(err.response)
            if (err.response) {
                dispatch(loginFailureAC(err.message, err.response.data))

            } else {
                dispatch(loginFailureAC(err.message))
            }
        })
}
