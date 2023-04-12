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

  console.log(doneRecipes);

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

// a chave doneRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: meal-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
