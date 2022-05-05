import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, getRecipesPerDiet, sortNames, sortScore, onSearch} from "../redux/actions"; 
import Receta from "./Receta";
import Buscador from "./Buscador";
import Pagination from "./Pagination";
import styles from "./RecetasStyles.module.css";
import RecetaCardNoEncontrado from "./RecetaNoEncontrado";

export default  function Recetas(props){
    const dispatch = useDispatch();
    const allRecipes =  useSelector(state => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const [reRender, setReRender] = useState('');

    const paginado = (number) => setCurrentPage(number);

    const filtePerRecipe = (e) => {
        dispatch(getRecipesPerDiet(e.target.value));
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
        setCurrentPage(1)
    }

    const sortNamesFunc = (e) => {
        dispatch(sortNames(e.target.value));
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
    }

    const sortScoreFunc = (e) => {
        dispatch(sortScore(e.target.value));
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
    }

    const onSearchFunc = (recipe) => {
        dispatch(onSearch(recipe));
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${recipe}`)
    }
    
    useEffect(() => {
        dispatch(getAllRecipes());
    }, []);
        return(
            <div className={styles.conteiner}>
                <div className={styles.Buscador}>
                    <Buscador  onSearchFunc={onSearchFunc} sortScoreFunc={sortScoreFunc} sortNamesFunc={sortNamesFunc} filtePerRecipe={filtePerRecipe}></Buscador>
                </div> 
                <div className={styles.divPagination}>
                    <Pagination currentPage={currentPage} paginado={paginado} allRecipes= {allRecipes.length} recipesPerPage={recipesPerPage}></Pagination>
                </div>
                <div className={styles.conteiner2}>
                    {currentRecipes.length ? currentRecipes.map(r => <Receta {...r}></Receta> ) : <RecetaCardNoEncontrado></RecetaCardNoEncontrado> }
                </div>
            </div> 
        )
}

