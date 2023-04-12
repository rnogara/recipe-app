import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import FilterBtnRow from '../components/FilterBtnRow';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const { functions: { setTitle }, favoriteRecipes } = useContext(AppContext);

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, []);

  return (
    <section>
      <Header />
      <FilterBtnRow />
      {
        favoriteRecipes.map((favoriteRecipe, index) => (
          <FavoriteRecipeCard recipe={ favoriteRecipe } index={ index } key={ index } />
        ))
      }
    </section>
  );
}

export default FavoriteRecipes;
