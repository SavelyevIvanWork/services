import {Redirect, useLocation} from "react-router-dom";
import {loginSuccess} from "../../../../reducers/AuthReducer/action-creator";
import {useDispatch} from "react-redux";
import React from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const TodoCallback = () => {
    const dispatch = useDispatch()

    const token = localStorage.setItem("Token", useQuery().get('token'));
    dispatch(loginSuccess(token))

    return <Redirect from='/' to='/todo'/>
}

export default TodoCallback