const axios = require('axios');
const {Recipe, Diet} = require('../db')

const getApiRecipes = async () =>{
    const recipes = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=66c3e30a343f4847b4c7a2e5112aabbe&addRecipeInformation=true&number=100');
    const apiInfo = await recipes.data.results.map(el => {
        return {
        name: el.title,
        summary: el.summary,
        healthScore: el.healthScore,
        instructions: el.analyzedInstructions.map(e => e),
        diets: el.diets.map(e => e),
        id: el.id
        }
    })
    return apiInfo;
};



const getDBRecipes = async () =>{
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })

}

const allInfo = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDBRecipes();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}



const getApiDiets = async () => {
    const allRecipes = await getApiRecipes();
    const arrDeArr = await allRecipes.map(el => el.diets);
    let arrFinal = arrDeArr.flat();
    console.log(arrFinal);
    return arrFinal.map(e => {return {name: e}});
}
getApiDiets()

const postNewRecipe = async (name, summary, score, healthScore, instructions) => {
    if(!name || !summary || !score || !healthScore || !instructions) throw new Error('Faltan argumentos');
    await Recipe.create({
        name: name,
        summary: summary,
        score: score,
        healthScore: healthScore,
        instructions: instructions
    })
}







// diets.forEach(async (element) => {
//     await Diet.findOrCreate({
//         where: {
//             name: element,
//         },
//         defaults: {
//             name: element
//         }
//     })
// });



module.exports= {
    getApiRecipes,
    getDBRecipes,
    allInfo,
    getApiDiets,
    postNewRecipe

}