import {applyMiddleware, combineReducers, createStore} from "redux";
import TaskReducer from "./TaskReducer";
import FilterReducer from "./FilterReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import AuthReducer from "./AuthReducer";


const reducers = combineReducers({
    TaskReducer,
    FilterReducer,
    AuthReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store

