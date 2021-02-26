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
import {authorizationFailureAC} from "../AuthReducer/action-creator";
import store from "../../reducers";

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

export const errorMessage = (errStatus, errData) => {
    return {type: ERROR_MESSAGE, errStatus, errData}
}

// const fetching = () => {
//     const axiosInstance = axios.create();
//     axiosInstance.defaults.headers.common['Token'] = localStorage.getItem("Token");
//     return axiosInstance;
// }

const dispatch = store.dispatch
const axiosInst = axios.create()

axiosInst.interceptors.request.use(function (config) {
    config.headers.Token = localStorage.getItem("Token")
    return config;
}, function (err) {
    return Promise.reject(err)
})

axiosInst.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    return Promise.reject(err)
        .catch(err => {
            if (err.response.status === 403) {
                console.log('ошибка 403')
                dispatch(authorizationFailureAC(err.message, err.response.data))
            } else if (err.response.status === 410) {
                dispatch(errorMessage(err.response.statusText, err.response.data))
            } else {
                console.log('ошибка')
                dispatch(errorMessage(err.response.statusText, err.response.data))
            }
        });
})

// const response = await fetch(`/todo`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({completed: true, message})
// })
// if (response.ok) {
//     let json = await response.json();
//     console.log(json)
//     // .then(response => {
//     //     dispatch(addTodoSuccess(response.data));
//     // })
// }

class APIService {

    post = (url, data, config) => {
       return new Promise ((resolve,reject) => {
           fetch(url).then(response => response.json().then(data) => resolve(data))
       })
    }
    addTodoAll = () => {

    }
}

const API = new APIService()


// Добавляем одну таску
// export const addTodoSuccess = (todo) => {
//     return {type: ADD_TODO_SUCCESS, todo}
// }
// export const addTodo = (message) => (dispatch) => {
//     dispatch(addTodoStarted());
//     API.addTodo(message)
// }

export const addTodoSuccess = (todo) => {
    return {type: ADD_TODO_SUCCESS, todo}
}
export const addTodo = (message) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .post(`/todo`, {
            completed: false,
            message
        })
        .then(response => {
            dispatch(addTodoSuccess(response.data));
        })
}

//  Добавляем все таски при загрузке
export const addTodoALLSuccess = (todos) => {
    return {type: ADD_TODO_ALL_SUCCESS, todos}
}
export const addAllTodos = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .get(`/todo`)
        .then(response => {
            dispatch(addTodoALLSuccess(response.data));
        })
        .catch(err => err)
}

// Комплитим одну таску
export const todoCompletedSuccess = (todo) => {
    return {type: TODO_COMPLETED_SUCCESS, todo}
}
export const todoCompleted = (todoID, todoCompleted) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .put(`/todo/${todoID}`, {
            id: todoID,
            completed: !todoCompleted,
        })
        .then(response => {
            dispatch(todoCompletedSuccess(response.data));
        })
        .catch(err => {
            // dispatch(errorMessage(err.response.statusText, err.response.data))
            dispatch(todoDeleteSuccess(todoID))
            return err
        })
}

// Комплитим все таски
export const allTodoCompletedSuccess = () => {
    return {type: ALL_TODO_COMPLETED_SUCCESS}
}
export const allTodoCompleted = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .post(`/todo/all-todo-completed`)
        .then(response => {
            dispatch(allTodoCompletedSuccess(response.data));
        })
        .catch(err => err)
}

// Удаляем одну таску
export const todoDeleteSuccess = (todoID) => {
    return {type: TODO_DELETE_SUCCESS, id: todoID}
}
export const todoDelete = (todoID) => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .delete(`/todo/${todoID}`)
        .then(response => {
            dispatch(todoDeleteSuccess(todoID));
        })
        .catch(err => err)
}

// Удаляем все таски
export const allTodoDeleteSuccess = (todoID) => {
    return {type: ALL_TODO_DELETE_SUCCESS, id: todoID}
}
export const AllTodoDelete = () => (dispatch) => {
    dispatch(addTodoStarted());
    axiosInst
        .post(`/todo/all-todo-delete`)
        .then(response => {
            dispatch(allTodoDeleteSuccess());
        })
        .catch(err => err)
}