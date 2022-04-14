const { Router } = require('express');
const {recipesByQuery, recipeByID, recipePost} = require('./rutas');
const {getApiDiets} = require('./utils');
const {Diet, Recipe} = require('../db')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', recipesByQuery);

router.get('/recipes/:idRecipe', recipeByID);

router.post('/recipes', recipePost);

(async () => {
    let preDiets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'pescatarian', 'paleo', 'primal', 'low FODMAP', 'whole 30'].map(e => {return {name: e}});
    let diets = await getApiDiets();
    diets.forEach(async element => {
        await Diet.findOrCreate({
            where:{
                name: element.name
            },
            defaults: {
                name: element.name
            }
        })
    });
    preDiets.forEach(async element => {
        await Diet.findOrCreate({
            where:{
                name: element.name
            },
            defaults: {
                name: element.name
            }
        })
    });
})()





module.exports = router;
