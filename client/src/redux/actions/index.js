import axios from "axios";
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_PER_DIET = 'GET_RECIPES_PER_DIET';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const SORT_NAMES = 'SORT_NAMES';
export const SORT_SCORE = 'SORT_RATES';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const POST_NEW_RECIPE = 'POST_NEW_RECIPE';
export const GET_ALL_DIETS = 'GET_ALL_DIETS';
export const DELETE_ONE_RECIPE = 'DELETE_ONE_RECIPE';
export const UNMOUNT_DETAIL = 'UNMOUNT_DETAIL';
export const CLEAN_FILTERS = "CLEAN_FILTERS";


export const getAllRecipes = () => { 
    return async (dispatch) => {
    let res = await axios('http://localhost:3002/recipes')
    console.log(res.data)
    return dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
    })
}}

export const unmountDetail = () => {
    return async (dispatch) => {
        return dispatch({
            type: UNMOUNT_DETAIL
        })
    }
}

export const getRecipeDetail = (recipeID) => {
    return async (dispatch) =>{
        let res = await axios(`http://localhost:3002/recipes/${recipeID}`)
        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: res.data
        })
    }
}

export const deleteRecipe = (recipeID) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3002/recipes/${recipeID}`)
        } catch (error) {
            console.log(error);
        }
    }
}

export const postNewRecipe = (payload) => {
    return async () => {
        try {
            let newRecipe = await axios.post('http://localhost:3002/recipes', payload)
            console.log(newRecipe)
        } catch (error) {
            console.log(error);
        }
    }
}


export const getAllDiets = () => {
    return async (dispatch) => {
        let res = await axios.get('http://localhost:3002/diets');
        return dispatch({
            type: GET_ALL_DIETS,
            payload: res.data
        })
    }
}

export const getRecipesPerDiet = (diet) =>{
    return {
        type: GET_RECIPES_PER_DIET,
        payload: diet
    }
}

export const sortNames = (order) => {
    return{
        type: SORT_NAMES,
        payload: order
    }
}

export const sortScore = (order) => {
    return{
        type: SORT_SCORE,
        payload: order
    }
}

export const onSearch = (name) => {
    return {
        type: SEARCH_BY_NAME,
        payload: name
    }
}

export const cleanFilters = () => {
    return {
        type: CLEAN_FILTERS,
    }
}




