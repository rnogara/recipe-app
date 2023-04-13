import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DoneRecipies from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/done-recipes" component={ DoneRecipies } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals" render={ () => (<Recipes title="Meals" />) } />
        <Route path="/drinks" render={ () => (<Recipes title="Drinks" />) } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
