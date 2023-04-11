import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeInProgressCard from '../components/RecipeInProgressCard';
import ShareAndFav from '../components/ShareAndFav';
import { getDetails } from '../helpers/getDetails';

const MEAL_ID_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const COCKTAIL_ID_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const INITIAL_IN_PROGRESS_RECIPES = { meals: {}, drinks: {} };

function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const URLpath = window.location.href.replace('/in-progress', '');
  const URL = pathname.includes('meals')
    ? (MEAL_ID_ENDPOINT + id) : (COCKTAIL_ID_ENDPOINT + id);
  const [isLoading, , recipe, fetchRecipe] = useFetch();
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(INITIAL_IN_PROGRESS_RECIPES));
  }

  useEffect(() => {
    fetchRecipe(URL);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <section>
      {/* <button data-testid="share-btn"><img src={ shareIcon } alt="Share" /></button>
      <button data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="Favorite" />
      </button> */}
      <ShareAndFav url={ URLpath } recipe={ getDetails(recipe, pathname) } />
      { recipe && (
        <RecipeInProgressCard recipe={ recipe } id={ id } />
      )}
      <button data-testid="finish-recipe-btn">Finalizar receita</button>
    </section>
  );
}

RecipeInProgress.propTypes = {
};

export default RecipeInProgress;
