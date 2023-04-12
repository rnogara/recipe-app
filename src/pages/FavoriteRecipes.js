import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import FilterBtnRow from '../components/FilterBtnRow';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const { functions: { setTitle }, favoriteRecipes } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredRecipes = favoriteRecipes
    .filter(({ type }) => type.includes(filter !== 'all' ? filter : ''));

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, []);

  return (
    <section>
      <Header />
      <FilterBtnRow filterState={ setFilter } />
      {
        filteredRecipes.map((favoriteRecipe, index) => (
          <FavoriteRecipeCard recipe={ favoriteRecipe } index={ index } key={ index } />
        ))
      }
    </section>
  );
}

export default FavoriteRecipes;
