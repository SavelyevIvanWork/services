import {
    AUTHORIZATION_FAILURE, LOADING_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS, USER_LOGOUT, USER_NAME_UPDATE, USER_PASSWORD_UPDATE
} from "./actions";

const initialState = {
    username: '',
    password: '',
    isFetching: localStorage.getItem("Token"),
    loading: false,
    messages: {},
    error: '',
    token: ''
}

const Index = (state = initialState, action) => {
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
                error: action.error,
                messages: {...state.messages = action.messages}
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                isFetching: true,
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                messages: {...state.messages = action.message}
            }

        case AUTHORIZATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                isFetching: action.isFetching,
                messages: {...state.messages = action.message}
            }

        case USER_LOGOUT:
            return {
                ...state,
                isFetching: localStorage.removeItem("Token"),
            }
        default:
            return state
    }
}

export default Index