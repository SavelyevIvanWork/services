import {Redirect, useLocation} from "react-router-dom";
import {loginSuccessAC} from "../../../../reducers/FormReducer/action-creator";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const TodoCallback = () => {
    const {isFetching} = useSelector(state => state.FormReducer)
    const dispatch = useDispatch()

    const token = localStorage.setItem("Token", useQuery().get('token'));
    dispatch(loginSuccessAC(token))

    return <Redirect from='/' to='/todo'/>
}

export default TodoCallback