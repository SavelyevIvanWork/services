import {applyMiddleware, combineReducers, createStore} from "redux";
import TaskReducer from "./TaskReducer";
import FilterReducer from "./FilterReducer";
import thunk from "redux-thunk";
import FormReducer from "./FormReducer";

const reducers = combineReducers({
    TaskReducer,
    FilterReducer,
    FormReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

// localStorage['state'] ? JSON.parse(localStorage.getItem('state')) : {}
// index.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(index.getState()))
// })

window.store = store
console.log(window.store.getState())

export default store

