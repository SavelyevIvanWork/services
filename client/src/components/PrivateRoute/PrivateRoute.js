import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const PrivateRoute = ({path, render}) => {
    const isFetching = useSelector(state => state.FormReducer.isFetching)
    return  <Route path={path} render={isFetching ? render : () => <Redirect to='/login'/>} />
}

export default PrivateRoute