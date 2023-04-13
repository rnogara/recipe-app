import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import FilterBtnRow from '../components/FilterBtnRow';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { functions: { setTitle } } = useContext(AppContext);
  const [filterState, setFilterState] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const render = filterState === 'all' ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filterState);

  useEffect(() => {
    setTitle('Done Recipes');
  }, []);

  return (
    <section>
      <Header />
      <FilterBtnRow filterState={ setFilterState } />
      { doneRecipes.length > 0 && render.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) }
    </section>
  );
}

export default DoneRecipes;
