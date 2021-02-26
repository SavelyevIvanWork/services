import {userLogoutAC} from "../../../reducers/AuthReducer/action-creator";
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch()
    return (
        <div className="title-wrapper">
            <h3 className="title">Your todo list</h3>
            <button
                className="btn__logout"
                onClick={()=> dispatch(userLogoutAC())}
            >
                Log out
            </button>
        </div>
    )
}

export default Header


