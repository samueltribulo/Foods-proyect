import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css"

export default function Nav (){
    return (
        <div className={styles.divNav}>
            <NavLink to={`/`}> 
                <span className={styles.spansCreateAndHome}>Home</span>
            </NavLink>
            <NavLink to={`/recipe/create`}>
                <span className={styles.spansCreateAndHome}>Crete recipe</span>
            </NavLink>
        </div>
    )
}