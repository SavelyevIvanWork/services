import {SET_VISIBILITY_FILTER, SORT_ALL_TASK} from "./actions";

let baseFilter = SORT_ALL_TASK

const Index = (state = baseFilter, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter

        default:
            return state
    }
}

export default Index
