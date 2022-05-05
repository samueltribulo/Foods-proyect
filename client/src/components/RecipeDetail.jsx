import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import { getRecipeDetail, deleteRecipe, unmountDetail} from "../redux/actions";
import Nav from './Nav';
import styles from './RecipeDetail.module.css'
import {unmountComponentAtNode} from 'react-dom'


export default function RecipeDetail (props){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipeDetail);
    let {id} = useParams();
    const deleteOneRecipe = () => {
        if(window.confirm('Desea eliminar la receta?') === true){
            dispatch(deleteRecipe(id));
            alert('Receta eliminada.')
            navigate('/recipes');
        }else{
            alert('cancelado.')
        }
    }
    console.log(recipe)
    useEffect(() => {
        dispatch(getRecipeDetail(id));
        return () => {
            dispatch(unmountDetail());
        }
    }, [])
    return (

        <div className={styles.conteiner}>
            <div className={styles.divNav}>
                <Nav></Nav>
            </div>
            <div className={styles.conteiner2}>
                <div className={styles.conteiner3}>
                    <div className={styles.conteinerDelete}>
                        {recipe.createdInDb && <button className={styles.btnDelete} onClick={deleteOneRecipe}>Delete recipe</button>}
                    </div>
                        <div >
                                <h3>{recipe.name}</h3>
                        </div>
                        <div className={styles.imageDiv}>
                            <img src={recipe.image} alt="No tiene imagen" />
                            <div className={styles.details}>
                                <div>
                                    <label >Score:</label>
                                    <span> {` ${recipe.score}.`}</span>
                                </div>
                                <div>
                                    <label >health:</label>
                                    <span>{`${recipe.healthScore}.`}</span>
                                </div>
                                <div>
                                    <label >Diets:</label>
                                    <span>
                                        {
                                            ` ${recipe.diets?.join(', ')}.`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    
                        <div>
                            <br />
                            <label >Summary:</label>
                            <span>{` ${recipe.summary?.replace(/<[^>]*>?/g,'')}`}</span>
                            <br />
                            <br />
                            <div>
                                <label >Instructions:</label>
                                {
                                    recipe.createdInDb ? 
                                    <div >{recipe.instructions}</div>
                                    :
                                    <span>
                                        
                                        {recipe.instructions ? ` ${recipe.instructions.steps.map(e => ` ${e.step}`)}` : `The recipe has no instructions.` }
                                    </span>
                                    
                                }
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
