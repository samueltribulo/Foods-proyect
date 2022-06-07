import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, getRecipesPerDiet, sortNames, sortScore, onSearch, cleanFilters} from "../redux/actions"; 
import Receta from "./Receta";
import Buscador from "./Buscador";
import Pagination from "./Pagination";
import styles from "./RecetasStyles.module.css";
import RecetaCardNoEncontrado from "./RecetaNoEncontrado";
import Loading from "./Loading";

export default  function Recetas(props){
    const dispatch = useDispatch();
    const allRecipes =  useSelector(state => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const [reRender, setReRender] = useState('');
    const [loading, setLoading] = useState(false);


    const paginado = (number) => setCurrentPage(number);

    const filtePerRecipe = async (e) => {
        setLoading(true);
        await dispatch(getRecipesPerDiet(e.target.value));
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
        setLoading(false);
        setCurrentPage(1);
    }

    const sortNamesFunc = async (e) => {
        setLoading(true);
        await dispatch(sortNames(e.target.value));
        setLoading(false);
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
    }

    const sortScoreFunc = async (e) => {
        dispatch(sortScore(e.target.value));
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
    }

    const onSearchFunc = async (recipe) => {
        setLoading(true);
        await dispatch(onSearch(recipe));
        setLoading(false)
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${recipe}`)
    }

    const getAllRecipes2 = async () => {
        setLoading(true)
        await dispatch(getAllRecipes());
        setLoading(false)
    }
    const cleanFilters2 = async (e) => {
        await dispatch(cleanFilters());
        setCurrentPage(1);
        setReRender(`Ultimo ordenamiento ${e.target.value}`);
    }
    
    useEffect(() => {
        getAllRecipes2();
    }, []);
        return(
            <div className={styles.conteiner}>
                <div className={styles.Buscador}>
                    <Buscador cleanFilters2={cleanFilters2} onSearchFunc={onSearchFunc} sortScoreFunc={sortScoreFunc} sortNamesFunc={sortNamesFunc} filtePerRecipe={filtePerRecipe}></Buscador>
                </div> 
                <div className={styles.divPagination}>
                    <Pagination currentPage={currentPage} paginado={paginado} allRecipes= {allRecipes.length} recipesPerPage={recipesPerPage}></Pagination>
                </div>
                {loading ? <div className={styles.conteiner2}>
                    <Loading />
                </div> :  <div className={styles.conteiner2}>
                    {currentRecipes.length ? currentRecipes.map(r => <Receta {...r}></Receta> ) : <RecetaCardNoEncontrado/> }
                </div>}

            </div> 
        )
}

