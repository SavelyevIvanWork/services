import {SET_VISIBILITY_FILTER} from "./actions";

export const sortAllTask = (id) => {
    return {type: SET_VISIBILITY_FILTER, filter: id}
}

export const sortCompletedTask = (id) => {
    return {type: SET_VISIBILITY_FILTER, filter: id}
}

export const sortCurrentTask = (id) => {
    return {type: SET_VISIBILITY_FILTER, filter: id}
}
