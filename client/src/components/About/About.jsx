import style from './About.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
const About = () => {
    return <div className={style.wrapper}>
        <div className={style.header__wrapper}>
            <h1>About</h1>
            <NavLink className={style.link} to="/login">Back</NavLink>
        </div>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Delectus enim, eos nobis quia reprehenderit sequi voluptate voluptates voluptatum.
            A adipisci architecto eaque error excepturi fugiat iusto laboriosam nesciunt nostrum officiis!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi facilis necessitatibus quis saepe!
            Adipisci aliquam amet aperiam assumenda atque cumque distinctio earum fugiat illum ipsam libero mollitia placeat,
            ratione saepe.
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Delectus enim, eos nobis quia reprehenderit sequi voluptate voluptates voluptatum.
            A adipisci architecto eaque error excepturi fugiat iusto laboriosam nesciunt nostrum officiis!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi facilis necessitatibus quis saepe!
            Adipisci aliquam amet aperiam assumenda atque cumque distinctio earum fugiat illum ipsam libero mollitia placeat,
            ratione saepe.
        </p>
    </div>
}

export default About