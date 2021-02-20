import {
    ADD_TODO_ALL_SUCCESS,
    ADD_TODO_FAILURE,
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    ALL_TODO_COMPLETED_SUCCESS,
    ALL_TODO_DELETE_SUCCESS,
    COMPLETED_TASK, ERROR_MESSAGE,
    SET_TODOS,
    TODO_COMPLETED_SUCCESS,
    TODO_DELETE_SUCCESS,
    UPDATE_NEW_TASK
} from "./actions";
import {ALL_TASK_DELETE} from "../FilterReducer/actions";
import axios from "axios";
import {authorizationFailureAC} from "../FormReducer/action-creator";

export const addTodoStarted = () => {
    return {type: ADD_TODO_STARTED}
}
export const todoFailure = (error) => {
    return {type: ADD_TODO_FAILURE, error}
}

export const updateNewTask = (text) => {
    return {type: UPDATE_NEW_TASK, text: text}
}

export const completedTaskActionCreator = (taskID) => {
    return {type: COMPLETED_TASK, id: taskID,}
}

export const AllDeleteTaskActionCreator = () => {
    return {type: ALL_TASK_DELETE}
}

export const setTodosActionCreator = (todos) => {
    return {type: SET_TODOS, todos}
}

export const errorMessage = (error) => {
    return {type: ERROR_MESSAGE, error}
}

const axiosInstance = axios.create({
    headers: {'Token': localStorage.getItem("Token")},
})

//Добавляем одну таску
export const addTodoSuccess = (todo) => {
    return {type: ADD_TODO_SUCCESS, todo}
}
export const addTodo = (message) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .post(`/todo`, {
            completed: false,
            message
        })
        .then(response => {
            dispatch(addTodoSuccess(response.data));
        })
        .catch(err => {
            if (err.response.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response.statusText));
            }
        })
}

//  Добавляем все таски при загрузке
export const addTodoALLSuccess = (todos) => {
    return {type: ADD_TODO_ALL_SUCCESS, todos}
}
export const addAllTodos = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .get(`/todo`)
        .then(response => {
            dispatch(addTodoALLSuccess(response.data));
        })
        .catch(err => {
            if (err.response.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response.statusText));
            }
        })
}

// Комплитим одну таску
export const todoCompletedSuccess = (todo) => {
    return {type: TODO_COMPLETED_SUCCESS, todo}
}
export const todoCompleted = (todoID, todoCompleted) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .put(`/todo/${todoID}`, {
            id: todoID,
            completed: !todoCompleted,
        })
        .then(response => {
            console.log(response.data)
            dispatch(todoCompletedSuccess(response.data));
        })
        .catch(err => {
            if (err.response.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response.statusText));
            }
        })
}

// Комплитим все таски
export const allTodoCompletedSuccess = () => {
    return {type: ALL_TODO_COMPLETED_SUCCESS}
}
export const allTodoCompleted = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .post(`/todo/all-todo-completed`)
        .then(response => {
            dispatch(allTodoCompletedSuccess(response.data));
        })
        .catch(err => {
            if (err.response.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response.statusText));
            }
        })
}

// Удаляем одну таску
export const todoDeleteSuccess = (todoID) => {
    return {type: TODO_DELETE_SUCCESS, id: todoID}
}
export const todoDelete = (todoID) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .delete(`/todo/${todoID}`)
        .then(response => {
            dispatch(todoDeleteSuccess(todoID));
        })
        .catch(err => {
            if (err.response.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response.statusText));
            }
        })
}

// Удаляем все таски
export const allTodoDeleteSuccess = (todoID) => {
    return {type: ALL_TODO_DELETE_SUCCESS, id: todoID}
}
export const AllTodoDelete = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInstance
        .post(`/todo/all-todo-delete`)
        .then(response => {
            dispatch(allTodoDeleteSuccess());
        })
        .catch(err => {
            if (err.response?.status === 403) {
                dispatch(authorizationFailureAC(err.message, err.response.data));
            } else {
                dispatch(errorMessage(err.response?.statusText));
            }
        })
}