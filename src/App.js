import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MainContent from './pages/MainContent';
import DoneRecipies from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <Switch>
        <Route path="/meals/:id/in-progress" component={ MainContent } />
        <Route path="/drinks/:id/in-progress" component={ MainContent } />
        <Route path="/drinks/:id" component={ MainContent } />
        <Route path="/meals/:id" component={ MainContent } />
        <Route path="/done-recipes" component={ DoneRecipies } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals" component={ MainContent } />
        <Route path="/drinks" component={ MainContent } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
