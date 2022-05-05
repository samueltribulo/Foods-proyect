import React from "react";
import styles from './LandingPage.module.css';
import { NavLink } from "react-router-dom";
export default function LandingPage (){
    return (
        <div className={styles.container}>
            <h1 className={styles.Title}>Recipe app</h1>
            <p>¡Find your ideal recipe or create it!</p>
            <span className={styles.btn}><NavLink className={styles.NavLink} to="/recipes" >Start</NavLink></span>
        </div>
    );
}