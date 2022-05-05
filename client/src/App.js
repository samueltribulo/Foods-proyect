import './App.css';
import React, { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import {Route, Routes} from 'react-router-dom';
import Recetas from './components/Recetas';
import RecipeDetail from './components/RecipeDetail'; 
import CreateRecipe from './components/CreateRecipe';

function App() {


  return (
    <div className="App">
        <Routes>
          <Route exact path={'/'} element={<LandingPage/>}/>
          <Route exact path={'/recipes'} element={<Recetas></Recetas>}/>
          <Route exact path={`/recipes/:id`} element={<RecipeDetail/>}/>
          <Route exact path={`/recipe/create`} element={<CreateRecipe></CreateRecipe>}/>
        </Routes>
    </div>
  );
}

export default App;
