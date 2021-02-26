import React from "react"
import Header from "./Header/Header";
import Todo from "./Todo/Todo";
import Error from "./Error/Error";
import {useSelector} from "react-redux";

const TodoApp = () => {
    const {error} = useSelector(state => state.TaskReducer)
    return (
        <div className="wrapper">
            <Header />
            <Todo />
            {error && <Error />}
        </div>
    )
}

export default TodoApp
