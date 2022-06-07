import React, {useEffect, useState}from "react";
import Nav from "./Nav";
import {useDispatch, useSelector} from 'react-redux';
import styles from './Buscador.module.css';
import { useNavigate } from "react-router-dom";

export default function Buscador ({filtePerRecipe, sortNamesFunc, sortScoreFunc, onSearchFunc}){
    const [recipe, setRecipe] = useState('');
    const navigate = useNavigate();
    const cleanFilters = () => {
        navigate('/recipes');
    }
    return(
        <div className={styles.conteiner}>
            <div className={styles.divNav}>
            <Nav/>
            </div>
            <div className={styles.conteiner2}>
            <form className={styles.formConteiner} onSubmit={(e) => {
                    e.preventDefault();
                    onSearchFunc(recipe);
                    setRecipe('');
                }}>
                    <input 
                    type="text" 
                    placeholder="Ej: Salad"
                    value={recipe}
                    onChange={(e) => {
                        e.preventDefault();
                        setRecipe(e.target.value);
                    }}
                    />
                    <input type="submit" value='Search'/>
                </form>
                <select name="rate order" onChange={(e) => sortScoreFunc(e)}>
                    <option value="all">Health Score order</option>
                    <option value="Highest to lowest">Highest to lowest</option>
                    <option value="Lowest to highest">Lowest to highest</option>
                </select>
                <select name="alphabetic order" onChange={(e) => sortNamesFunc(e)}>
                    <option value="Normal">Alphabetic order</option>
                    <option value="AZ">A-Z</option>
                    <option value="ZA">Z-A</option>
                </select>
                <select name="DT" onChange={(e) => filtePerRecipe(e)}>
                    <option value="all">All diets</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="ketogenic">Ketogenic</option>
                </select>

                <form className={styles.formConteiner} onSubmit={cleanFilters}>
                    <input type="submit" value='Clean filters'/>
                </form>
            </div>
            
        </div>
    )
}