import {useSelector} from "react-redux";

const Error = () => {
    const {error} = useSelector(state => state.TaskReducer)
    return <div>
        <div>{error.status}</div>
        <div>{error.data.message}</div>
    </div>
}

export default Error