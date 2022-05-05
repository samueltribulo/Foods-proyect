import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './Receta.module.css'

export default function RecetaCard(props){
    if(props.createdInDb){
        return (

            <div className={styles.divRecetaCard}>
                <img src={props.image} alt="no hay imagen" />
                <NavLink to={`/recipes/${props.id}`}>
                    <h3>{props.name}</h3>
                </NavLink>
                <div className={styles.divInfo}>
                    <label>Diets: </label>
                    <span>{`${props.diets.join(', ')}.`}</span>
                    <br />
                    <label >Score: </label>
                    <span>{props.score}</span>
                </div>
            </div>
        )       
    }else{
        return(
            <div className={styles.divRecetaCard}>
                <img src={props.image} alt="" />
                <NavLink to={`/recipes/${props.id}`}>
                    <h3>{props.name}</h3>
                </NavLink>
                <div className={styles.divInfo}>
                    <label>Diets: </label>
                    <span>{`${props.diets.join(', ')}.`}</span>
                    <br />
                    <label >Score: </label>
                    <span>{props.score}</span>
                </div>
            </div>
        )
    }
}



