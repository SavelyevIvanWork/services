import {
    AUTHORIZATION_FAILURE, LOADING_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS, USER_LOGOUT, USER_NAME_UPDATE, USER_PASSWORD_UPDATE
} from "./actions";
import TokenService from "../../services/TokenService";
import ApiService from "../../services/ApiService";

export const authorizationFailure = (error) => {
    return {type: AUTHORIZATION_FAILURE, error}
}

export const userLogout = () => {
    TokenService.removeToken()
    return {type: USER_LOGOUT}
}

export const userNameUpdate = (username) => {
    return {type: USER_NAME_UPDATE, username}
}

export const userPasswordUpdate = (password) => {
    return {type: USER_PASSWORD_UPDATE, password}
}

export const loadingStarted = () => {
    return {type: LOADING_STARTED}
}

export const registrationSuccess = (messages) => {
    return {type: REGISTRATION_SUCCESS, messages}
}

export const registrationFailure = (err) => {
    return {type: REGISTRATION_FAILURE, err}
}

export const userRegistration = (username, password) => (dispatch) => {
    dispatch(loadingStarted());
    ApiService
        .post(`/todo/registration`, {
            username,
            password
        })
        .then(response => {
            dispatch(registrationSuccess(response));
        })
        .catch(err => {
            dispatch(registrationFailure(err))
        })
}

export const loginSuccess = (token) => {
    return {type: LOGIN_SUCCESS, token}
}
export const loginFailure = (err) => {
    return {type: LOGIN_FAILURE, err}
}

export const userLogin = (username, password) => (dispatch) => {
    dispatch(loadingStarted())
    ApiService
        .post(`/todo/login`, {
            username,
            password
        })
        .then(response => {
            TokenService.setToken(response.token)
            dispatch(loginSuccess(response.token))
        })
        .catch(err => {
            console.log(err)
            dispatch(loginFailure(err))
        })
}
