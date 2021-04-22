import {
    AUTHORIZATION_FAILURE, LOADING_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS, USER_LOGOUT, USER_NAME_UPDATE, USER_PASSWORD_UPDATE
} from "./actions";

const initialState = {
    username: '',
    password: '',
    isAuth: localStorage.getItem("Token"),
    loading: false,
    messages: {},
    error: null,
    token: ''
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_NAME_UPDATE:
            return {
                ...state,
                username: action.username
            }

        case USER_PASSWORD_UPDATE:
            return {
                ...state,
                password: action.password
            }

        case LOADING_STARTED:
            return {
                ...state,
                loading: true,
                error: '',
                messages: {}
            }

        case REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: {...state.messages = action.messages},
            }

        case REGISTRATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.err,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                isAuth: true,
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: {...state.error = action.err},
            }

        case AUTHORIZATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error.message,
                isAuth: action.error.isAuth,
                messages: {...state.message = action.error}
            }

        case USER_LOGOUT:
            return {
                ...state,
                isAuth: false,
            }
        default:
            return state
    }
}

export default AuthReducer