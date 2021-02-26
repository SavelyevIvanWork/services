import {applyMiddleware, combineReducers, createStore} from "redux";
import TaskReducer from "./TaskReducer";
import FilterReducer from "./FilterReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import AuthReducer from "./AuthReducer";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import {authorizationFailureAC} from "./AuthReducer/action-creator";
import {errorMessage} from "./TaskReducer/action-creator";

const reducers = combineReducers({
    TaskReducer,
    FilterReducer,
    AuthReducer
})

const client = axios.create()


// axiosInst.interceptors.request.use(function (config) {
//     config.headers.Token = localStorage.getItem("Token")
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// })

// axiosInst.interceptors.response.use(function (response) {
//     return response;
// }, function (err) {
//     return Promise.reject(err)
//         .catch(err => {
//             if (err.response.status === 403) {
//                 console.log('ошибка 403')
//                 authorizationFailureAC(err.message, err.response.data)
//             } else {
//                 console.log('ошибка')
//                 errorMessage(err.response.statusText, err.response.data)
//             }
//         });
// })

// const middlewareConfig = {
//     interceptors: {
//         request: [{
//             success: function ({getState, dispatch, getSourceAction}, req) {
//                 req.headers = {'Token': localStorage.getItem("Token")}
//                 return req
//             },
//             error: function ({getState, dispatch, getSourceAction}, error) {
//                 //...
//                 return error
//             }
//         }
//         ],
//         response: [{
//             success: function ({getState, dispatch, getSourceAction}, res) {
//                 console.log(res); //contains information about request object
//                 //...
//                 return Promise.resolve(res);
//             },
//             error: function ({getState, dispatch, getSourceAction}, err) {
//                 return Promise.reject(err)
//                     .catch(err => {
//                         if (err.response.status === 403) {
//                             console.log('ошибка 403')
//                             // dispatch(authorizationFailureAC(err.message, err.response.data))
//                         } else if (err.response.status === 410) {
//                                  // dispatch(todoDeleteSuccess(todoID)
//                         } else {
//                             // dispatch(errorMessage(err.response.statusText, err.response.data))
//                         }
//                     });
//             }
//         }
//         ]
//     }
// };


const store = createStore(reducers, composeWithDevTools(applyMiddleware(axiosMiddleware(client), thunk)))

// localStorage['state'] ? JSON.parse(localStorage.getItem('state')) : {}
// index.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(index.getState()))
// })

window.store = store
console.log(window.store.getState())

export default store

