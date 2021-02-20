import React from "react";
import "./TodoItem.css"
import '../../../../Image/dustbin.svg'
import {todoCompleted, todoDelete} from "../../../../reducers/TaskReducer/action-creator";
import {useDispatch} from "react-redux";

const TodoItem = ({task}) => {
    const dispatch = useDispatch()
    return (
        <li className={task.completed ? `todo-list__item active` : `todo-list__item`}
            onClick={() => dispatch(todoCompleted(task.id, task.completed))}
            id={task.id}
        >
            <span className={`todo-list__text`}>{task.message}</span>
            <button className='todo-item__button'
                    onClick={(event) => {
                        event.stopPropagation()
                        dispatch(todoDelete(task.id))
                    }}>
                <span>delete</span>
            </button>
        </li>
    )
}

export default TodoItem
