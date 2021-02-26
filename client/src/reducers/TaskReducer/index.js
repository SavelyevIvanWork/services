import {
    ADD_TODO_ALL_SUCCESS, ADD_TODO_FAILURE,
    ADD_TODO_STARTED, ADD_TODO_SUCCESS,
    ALL_TODO_COMPLETED_SUCCESS, ALL_TODO_DELETE_SUCCESS,
    COMPLETED_TASK,
    DELETE_TASK, ERROR_MESSAGE,
    SET_TODOS, STATUS_TEXT, TODO_COMPLETED_SUCCESS, TODO_DELETE_SUCCESS,
    UPDATE_NEW_TASK
} from "./actions";

import {ALL_TASK_DELETE} from "../FilterReducer/actions"

const initialState = {
    tasks: [],
    newTask: '',
    loading: false,
    error: false
}

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_TASK:
            return {
                ...state,
                newTask: action.text,
            }

        case DELETE_TASK:
            return {
                ...state,
                tasks: [...state.tasks.filter((task) => task.id !== action.id)]
            }

        case COMPLETED_TASK:
            return {
                ...state,
                tasks: [...state.tasks.map((task) => {
                    if (task.id === action.id) {
                        task.completed = !task.completed
                    }
                    return task
                })]
            }

        case ALL_TODO_COMPLETED_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks.map((task) => {
                    task.completed = true
                    return task
                })],
                loading: false,
                error: false
            }

        case ALL_TASK_DELETE:
            return {
                ...state,
                tasks: [...state.tasks.filter((task) => !task.completed)]
            }

        case SET_TODOS:
            return {
                ...state,
                tasks: action.todos
            }

        case ADD_TODO_STARTED:
            return {
                ...state,
                loading: true
            }

        case ADD_TODO_SUCCESS:
            const changeId = (todo) => {
                todo.id = todo._id
                delete todo._id
                return todo
            }
            return {
                ...state,
                newTask: '',
                tasks: [...state.tasks, changeId(action.todo)],
                loading: false,
                error: false
            }
        case ADD_TODO_ALL_SUCCESS:
            return {
                ...state,
                tasks: action.todos.map(task => {
                    task.id = task._id
                    delete task._id
                    return task
                }),
                loading: false,
                error: false
            }

        case ADD_TODO_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case TODO_COMPLETED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                tasks: [...state.tasks.map((task) => {
                    if (task.id === action.todo._id) {
                        task.completed = action.todo.completed
                    }
                    return task
                })],
            }
        case TODO_DELETE_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks.filter(task => task.id !== action.id)],
                loading: false,
                error: false
            }

        case ALL_TODO_DELETE_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks.filter(task => task.completed === false)],
                loading: false
            }

        case ERROR_MESSAGE:
            return {
                ...state,
                error: {...state.error, status: action.errStatus, data: action.errData},
                loading: false
            }

        default:
            return state
    }
}

export default TaskReducer