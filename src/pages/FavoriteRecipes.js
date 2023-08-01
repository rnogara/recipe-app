import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import FilterBtnRow from '../components/FilterBtnRow';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { functions: { setTitle }, favoriteRecipes } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredRecipes = favoriteRecipes
    .filter(({ type }) => type.includes(filter !== 'all' ? filter : ''));

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, []);

  return (
    <section className="favorites-page">
      <Header />
      <FilterBtnRow filterState={ setFilter } />
      <ul className="favorite-recipes-list">
        {
          filteredRecipes.map((favoriteRecipe, index) => (
            <li key={ index }>
              <FavoriteRecipeCard recipe={ favoriteRecipe } index={ index } />
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default FavoriteRecipes;
