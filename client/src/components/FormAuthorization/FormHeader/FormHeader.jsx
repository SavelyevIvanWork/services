import style from "./FormHeader.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const FormHeader = () => {
    return <div className={style.wrapper}>
            <h1 className={style.title}>Please login or register</h1>
            <NavLink className={style.link} to="/about">About</NavLink>
        </div>
}

export default FormHeader