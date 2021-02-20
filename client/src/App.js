import React from "react";
import './App.css';
import TodoApp from "./components/TodoApp/TodoApp";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import About from "./components/About/About";
import FormAuthorization from "./components/FormAuthorization/FormAuthorization";
import TodoCallback from "./components/TodoApp/Todo/TodoCallback/TodoCallback";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
    return (
        <BrowserRouter>
                <Route path='/about' render={() => <About />} />
                <Route path='/login' render={() => <FormAuthorization />} />
                <PrivateRoute path={'/todo'} render={() => <TodoApp />} />
                <Route path='/todo/callback' render={() => <TodoCallback />} />
                <Route exact path='/' render={() => <Redirect to="/login" />} />
        </BrowserRouter>
    )
}

export default App
