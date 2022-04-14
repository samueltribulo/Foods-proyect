const {Router} = require('express')
const axios = require('axios');
const {getApiRecipes, getDBRecipes, allInfo, postNewRecipe} = require('./utils');


const router = Router();




module.exports = {
    recipesByQuery: async (req, res) => {
        const {name} = req.query;
        const allRecipes = await allInfo();
        try {
            if(name){
                const recipes = await allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
                recipes.length ? res.send(recipes) : res.status(404).send('No existen recetas con el nombre especificado.');
            }
        } catch (error) {
            
        }
       
    },
    recipeByID: async (req, res) =>{
        const idRecipe = req.params.idRecipe;
        console.log(idRecipe)
        const allRecipes = await allInfo();
        try {
            if(idRecipe){
                const recipe = allRecipes.find(el => el.id == idRecipe)
                console.log(recipe)
                if(recipe) res.send(recipe)
                else res.status(404).send({error: `no existe ninguna receta con el id ${idRecipe}`});
            }
        } catch (error) {
            console.log(error);
        }
    },
    recipePost: async (req, res) => {
        const {name, summary, score, healthScore, instructions} = req.body;
        console.log(name)
        try {
            await postNewRecipe(name, summary, score, healthScore, instructions);
            res.send('Todo ok');
        } catch (error) {
            console.log(error)
            res.status(404).send('Ocurrio un error');
        }
    }

}