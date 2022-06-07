const axios = require('axios');
const {Recipe, Diet} = require('../db')

const getApiRecipes = async () =>{
    const recipes = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=f92954dc5710445188ae2f89ecc85a1d&addRecipeInformation=true&number=100');
    const apiInfo = await recipes.data.results.map(el => {
        return {
        name: el.title,
        summary: el.summary,
        healthScore: el.healthScore,
        instructions: el.analyzedInstructions[0],
        diets: el.diets.map(e => e),
        id: el.id,
        image: el.image,
        score: el.spoonacularScore,
        }
    })
    return apiInfo;
};



const getDbRecipes = async () => {
    const fixedDbInfo = await Recipe.findAll({include: Diet})
    const fixedDbInfo2 = fixedDbInfo.map(e => {
        const diets = [];
        for (let i = 0; i < e.dataValues.Diets.length; i++) {           
            diets.push(e.dataValues.Diets[i].dataValues.name) 
            console.log(e.dataValues.Diets[i])
        }
        return{
            id: e.dataValues.id,
            name: e.dataValues.name,
            summary: e.dataValues.summary,
            score: e.dataValues.score,
            healthScore: e.dataValues.healthScore,
            instructions: e.dataValues.instructions,
            createdInDb: e.createdInDb,
            image: e.image,
            diets: diets, 
        }
    })
    return fixedDbInfo2;
}

const allInfo = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}




const getApiDiets = async () => {
    const allRecipes = await getApiRecipes();
    const arrDeArr = await allRecipes.map(el => el.diets);
    let arrFinal = arrDeArr.flat();
    return arrFinal.map(e => {return {name: e}});
}

const getAllDiets = async () => {
    const fixedDbInfo = await Diet.findAll()
    const fixedDiets = fixedDbInfo.map(e => {
        const diets = [];
        diets.push(e.dataValues.name)
        return diets;
    })
    const diets = fixedDiets.flat()
    return diets;
}



const postNewRecipe = async (name, summary, score, healthScore, instructions, diet, image) => {
    if(!name || !summary || !score || !healthScore || !instructions ) throw new Error('Faltan argumentos');
    const newRecipe = await Recipe.create({
        name: name,
        summary: summary,
        score: score,
        healthScore: healthScore,
        instructions: instructions,
        image: image
    })
    const diets = await Diet.findAll({
        where: {
            name: diet 
        }
    })
    newRecipe.addDiet(diets);
}

// await jane.update({ name: "Ada" })


const updateRecipe = async (id, name, summary, score, healthScore, instructions, diet, image) =>{
    if(!id) throw new Error('Falta id.');

    let recipe = await Recipe.findByPk(id)

    const diets = await Diet.findAll({
        where: {
            name: diet 
        }
    })

    await recipe.update({
        name,
        summary,
        score,
        healthScore,
        instructions,
        diet: diets,
        image,
    })
}

const deleteRecipe = async (id) => {
    if(!id) throw new Error('Falta id.');

    await Recipe.destroy({
        where: {id: id}
    })

}

module.exports= {
    getApiRecipes,
    getDbRecipes,
    allInfo,
    getApiDiets,
    postNewRecipe,
    getAllDiets,
    deleteRecipe,
    updateRecipe

}