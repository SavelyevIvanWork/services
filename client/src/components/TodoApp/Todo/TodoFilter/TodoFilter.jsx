import React from 'react'
import './TodoFilter.css'
import {useDispatch, useSelector} from "react-redux";
import {ALL_TASK_COMPLETED, ALL_TASK_DELETE, SORT_ALL_TASK, SORT_COMPLETED_TASK, SORT_CURRENT_TASK
} from "../../../../reducers/FilterReducer/actions";
import { allTodoCompleted, AllTodoDelete
} from "../../../../reducers/TaskReducer/action-creator";
import { sortAllTask, sortCompletedTask, sortCurrentTask
} from "../../../../reducers/FilterReducer/action-creator";

const TodoFilter = () => {
    const {tasks} = useSelector(state => state.TaskReducer)
    const {baseFilter} = useSelector(state => state.FilterReducer)

    const dispatch = useDispatch()

    const btnHandler = (e) => {
        let id = e.target.id
        switch (id) {
            case SORT_ALL_TASK:
                dispatch(sortAllTask(id))
                break
            case SORT_CURRENT_TASK:
                dispatch(sortCurrentTask(id))
                break
            case SORT_COMPLETED_TASK:
                dispatch(sortCompletedTask(id))
                break
            case ALL_TASK_COMPLETED:
                dispatch(allTodoCompleted())
                break
            case ALL_TASK_DELETE:
                dispatch(AllTodoDelete())
                break
            default:
                dispatch(sortAllTask(id))
        }
    }

    const taskCompleted = []
    tasks.filter((task) => {
        return task.completed && taskCompleted.push(task)
    })

    return (
        <div className="todo-filter">
            <button
                className={`btn todo-filter__btn--lightgrey todo-filter__btn--tasks-left`}
                id={ALL_TASK_COMPLETED}
                onClick={btnHandler}>
                <span>{tasks.length}</span> tasks left
            </button>

            <div className="todo-filter__btn-wrapper">
                <button
                    className={`btn todo-filter__btn ${baseFilter === SORT_ALL_TASK ? 'todo-filter__btn--active' : ''}`}
                    id={SORT_ALL_TASK}
                    onClick={btnHandler}
                >
                    All
                </button>
                <button
                    className={`btn todo-filter__btn ${baseFilter === SORT_CURRENT_TASK ? 'todo-filter__btn--active' : ''}`}
                    id={SORT_CURRENT_TASK}
                    onClick={btnHandler}
                >
                    ToDo
                </button>
                <button
                    className={`btn todo-filter__btn ${baseFilter === SORT_COMPLETED_TASK ? 'todo-filter__btn--active' : ''}`}
                    id={SORT_COMPLETED_TASK}
                    onClick={btnHandler}
                >
                    Completed
                </button>
            </div>
            {
                taskCompleted.length > 0 && <button
                    className={`btn todo-filter__btn--lightgrey todo-filter__btn--clear-completed`}
                    id={ALL_TASK_DELETE}
                    onClick={btnHandler}>
                    Clear completed
                </button>
            }

        </div>
    )
}


export default TodoFilter