import style from './FormAuthorization.module.css'
import FormHeader from "./FormHeader/FormHeader";
import {userLogin, userNameUpdate, userPasswordUpdate, userRegistration
} from "../../reducers/FormReducer/action-creator";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const FormAuthorization = () => {

    const dispatch = useDispatch()
    const {username, password, messages, error} = useSelector(state => state.FormReducer)
    const isFetching = useSelector(state => state.FormReducer.isFetching)
    const userRegistrationHandler = (e) => {
        e.preventDefault()
        dispatch(userRegistration(username, password))
    }

    const userLoginHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(username, password))
    }

    const err = (messages) => {
        if (messages.errors) {
            return messages.errors.errors.map(err => err.msg)
        }
    }

    return (
        <div className={style.app__wrapper}>
            <FormHeader />
            <div className={style.wrapper}>
                <form action="">
                    <div className={style.item}>
                        <label className={style.label} htmlFor="">User name:</label>
                        <input
                            className={style.input}
                            type="text"
                            value={username}
                            placeholder='Enter your user name'
                            onChange={(e) => dispatch(userNameUpdate(e.target.value))}
                            autoFocus={true}
                        />
                    </div>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="">Password:</label>
                        <input
                            className={style.input}
                            type="password"
                            value={password}
                            placeholder='Please enter your password'
                            onChange={(e) => dispatch(userPasswordUpdate(e.target.value))}
                        />
                    </div>
                    <div className={`${style.item} ${style.item__btn}`}>
                        <button
                            className={`${style.btn}`}
                            onClick={userLoginHandler}
                        >
                            Log in
                        </button>
                        <button
                            className={`${style.btn}`}
                            onClick={userRegistrationHandler}
                        >
                            Register
                        </button>
                        <a href="http://localhost:8080/todo/auth/facebook">Login with Facebook</a>
                    </div>
                </form>
                {
                    error ? <div>
                            <span className={`${style.message} ${style.message__error}`}>{messages.message}</span>
                            {messages.errors && err(messages).map(error => <span
                                className={`${style.message} ${style.message__error}`}>{error}</span>)}
                        </div>
                        : <span className={`${style.message}`}>{messages.message}</span>
                }
            </div>
            {isFetching && <Redirect to="/todo"/> }
        </div>
    )
}

export default FormAuthorization
