import React from 'react'
import TodoItem from "./TodoItem/TodoItem";
import './Todo.css'
import TodoFilter from "./TodoFilter/TodoFilter";
import {useMemo} from "react";
import {useEffect} from "react";
import {SORT_ALL_TASK, SORT_COMPLETED_TASK, SORT_CURRENT_TASK} from "../../../reducers/FilterReducer/actions";
import {addAllTodos, addTodo, updateNewTask} from "../../../reducers/TaskReducer/action-creator";
import {useDispatch, useSelector} from "react-redux";

import '../../../Image/dustbin.svg'
import { debounce } from 'lodash';

const getVisibleTodos = (filterTodos, todos) => {
    switch (filterTodos) {
        case SORT_ALL_TASK:
            return todos
        case SORT_COMPLETED_TASK:
            return todos.filter(t => t.completed)
        case SORT_CURRENT_TASK:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filterTodos)
    }
}

const Todo = () => {
    const dispatch = useDispatch()
    const {tasks, newTask, loading} = useSelector(state => state.TaskReducer);
    const filterTodos = useSelector(state => state.FilterReducer);

    useEffect(() => {
        dispatch(addAllTodos())
    }, []);

    const memo = useMemo(() => getVisibleTodos(filterTodos, tasks), [filterTodos, tasks])


    const validation = (value) => {
        const reg = /^\s*$/;
        return !reg.test(value)
    }

    const onAddTask = (e) => {
        if (e.key === 'Enter' && validation(newTask)) {
            dispatch(addTodo(newTask))
        }
    }

    const onAddTaskDebounce = debounce(onAddTask,500)

    const onChangeInput = (e) => {
        const text = e.target.value
        dispatch(updateNewTask(text))
    }
    return (
        <div className="todo">
            {
                loading && <div className='loader-wrapper'>
                    <div className="loader"></div>
                </div>
            }
            <div className="todo__input-wrapper">
                <input
                    className="todo__input"
                    type="text"
                    placeholder='Enter your task name here'
                    value={newTask}
                    onChange={onChangeInput}
                    onKeyDown={onAddTaskDebounce}
                    autoFocus={true}
                />
            </div>
            <div className="todo__list">
                <ul>
                    {
                        memo.map((task) => <TodoItem
                            task={task}
                            key={task.id}
                        />)
                    }

                </ul>
            </div>
            {tasks.length > 0 && <TodoFilter/>}
        </div>
    )
}

export default Todo

