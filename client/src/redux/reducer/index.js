import { GET_ALL_RECIPES, GET_RECIPES_PER_DIET, SORT_NAMES, SORT_SCORE, SEARCH_BY_NAME, GET_RECIPE_DETAIL, POST_NEW_RECIPE, GET_ALL_DIETS, DELETE_ONE_RECIPE, UNMOUNT_DETAIL} from "../actions";

const initialState = {
    recipes: [],
    recipesCopy:[],
    recipeDetail: {},
    diets:['-']
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES: {
            return {
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload,
                unorderRecipes: action.payload
            }
        }
        case UNMOUNT_DETAIL:{
            return{
                ...state,
                recipeDetail: {},
            }
        }
        case GET_RECIPES_PER_DIET: {
            const allRecipes = state.recipesCopy;
            
            const filterRecipes = action.payload === 'all' ? allRecipes : allRecipes.filter((e) => e.diets.includes(action.payload))
            return{
                ...state,
                recipes: filterRecipes
            }
        }
        case DELETE_ONE_RECIPE:{
            return{
                ...state
            }
        }
        case GET_ALL_DIETS:{
            console.log(action.payload)
            return{
                ...state,
                diets: state.diets.concat(action.payload)
            }
        }
        case POST_NEW_RECIPE:{
            return{
                ...state,
            }
        }
        case GET_RECIPE_DETAIL:{
            return{
                ...state,
                recipeDetail: action.payload
            }
        }
        case SEARCH_BY_NAME:{
            const allRecipes = state.recipesCopy;

            const filterRecipes = allRecipes.filter(e => e.name.toUpperCase().includes(action.payload.toUpperCase()));

            return{
                ...state,
                recipes: filterRecipes
            }
        }
        case SORT_NAMES: {
            let allRecipes = state.recipesCopy
            let filterRecipes; 
             if(action.payload === 'AZ'){
                filterRecipes = allRecipes.sort((a, b) =>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                })
                return{
                    ...state,
                    recipes: filterRecipes
                }
            }else if ((action.payload === 'ZA')){
                filterRecipes = allRecipes.sort((a, b) =>{
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                })
                return{
                    ...state,
                    recipes: filterRecipes
                }
            }else{
                return{
                    ...state,
                    recipes: allRecipes
                }
            }
        }
        case SORT_SCORE: {
            let allRecipes = state.recipesCopy;
            let filterRecipes;
            if(action.payload === 'all') return {...state, recipes: allRecipes};
            if(action.payload === 'Lowest to highest') filterRecipes = allRecipes.sort((a, b) =>{
                return a.score - b.score;
            })
            else if(action.payload === 'Highest to lowest') filterRecipes = allRecipes.sort((a, b) => {
                return b.score - a.score;
            })
            console.log(filterRecipes)
            return{
                ...state,
                recipes: filterRecipes
            }
        }
        default: return state;
    }
}

export default rootReducer;