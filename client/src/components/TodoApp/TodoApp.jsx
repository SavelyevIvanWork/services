import React from "react"
import Header from "./Header/Header";
import Todo from "./Todo/Todo";

const TodoApp = () => {
    return (
        <div className="wrapper">
            <Header />
            <Todo />
        </div>
    )
}

export default TodoApp
