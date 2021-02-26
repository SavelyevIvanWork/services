import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const PrivateRoute = ({path, render}) => {
    const isAuth = useSelector(state => state.AuthReducer.isAuth)
    return  <Route path={path} render={isAuth ? render : () => <Redirect to='/login'/>} />
}

export default PrivateRoute