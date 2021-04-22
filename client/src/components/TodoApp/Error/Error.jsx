import {useSelector} from "react-redux";

const Error = () => {
    const {error} = useSelector(state => state.TaskReducer)
    return <div>{error.message}</div>
}

export default Error