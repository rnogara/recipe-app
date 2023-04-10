import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Details from '../components/Details';
import useFetch from '../hooks/useFetch';
import Recomendations from '../components/Recomendations';

function RecipeDetail() {
  const [recipeRecommended, setRecipeRecommended] = useState([{ name: undefined }]);
  const [detailedRecipe, setDetailedRecipe] = useState({
    title: undefined,
  });
  const params = useParams();
  const { location: { pathname }, push } = useHistory();
  const { id } = params;
  const MEAL_S_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const COCTAIL_S_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const MEAL_ID_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const COCKTAIL_ID_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const recipeType = pathname.includes('meal') ? MEAL_ID_ENDPOINT : COCKTAIL_ID_ENDPOINT;
  const detailsType = pathname.includes('meal') ? COCTAIL_S_ENDPOINT : MEAL_S_ENDPOINT;
  const [, , recipe, fetchingData] = useFetch({
    meals: false,
    drinks: false,
  });

  const [, , recommendations, fetchingRecommendations] = useFetch([]);

  const getRecommendations = (recommendList) => {
    const recomendationLength = 6;
    if (recommendations !== undefined) {
      const list = pathname.includes('meal') ? Object.values({ ...recommendList.drinks })
        : Object.values({ ...recommendList.meals });
      const finalList = [];
      const newList = list.slice(0, recomendationLength);
      newList.forEach((element) => {
        finalList.push({
          id: element.idDrink || element.idMeal,
          Thumb: element.strDrinkThumb || element.strMealThumb,
          name: element.strDrink || element.strMeal });
      });
      return finalList;
    }
  };

  const getDetails = (detailed) => {
    const ingredientsRange = 20;
    const ing = 'strIngredient';
    const meas = 'strMeasure';
    const recipeData = pathname.includes('meal') ? { ...detailed.meals[0] }
      : { ...detailed.drinks[0] };
    const payload = {
      title: recipeData.strMeal || recipeData.strDrink,
      thumbnail: recipeData.strMealThumb || recipeData.strDrinkThumb,
      instructions: recipeData.strInstructions,
      category: pathname.includes('meals') ? recipeData.strCategory
        : recipeData.strAlcoholic,
      ingredients: [],
      measurements: [],
      video: recipeData.strYoutube || 'false',
    };
    for (let i = 1; i <= ingredientsRange; i += 1) {
      const ingRef = recipeData[ing + i];
      if (ingRef !== null && ingRef !== undefined && ingRef !== '') {
        payload.ingredients.push(recipeData[ing + i]);
        payload.measurements.push(recipeData[meas + i]);
      }
    }
    return payload;
  };

  useEffect(() => {
    fetchingRecommendations(detailsType);
  }, []);

  useEffect(() => {
    setRecipeRecommended(getRecommendations(recommendations));
  }, [recommendations]);

  const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const btnStartLogic = storageDoneRecipes.some((recipesMade) => recipesMade.id === id);

  const startBtn = () => (pathname.includes('meal')
    ? push(`/meals/${id}/in-progress`)
    : push(`/drinks/${id}/in-progress`));

  useEffect(() => {
    fetchingData(recipeType);
  }, []);

  useEffect(() => {
    setDetailedRecipe(getDetails(recipe));
  }, [recipe]);

  return (
    <div>
      <section
        className="details"
      >
        {detailedRecipe.category === undefined ? 'Carregando'
          : <Details payload={ detailedRecipe } />}
        {recipeRecommended.length === 0 ? 'Carregando'
          : <Recomendations payload={ recipeRecommended } />}
      </section>
      <button
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        hidden={ btnStartLogic }
        onClick={ startBtn }
      >
        { btnStartLogic ? 'Start Recipe' : 'Continue Recipe' }

      </button>
    </div>
  );
}

export default RecipeDetail;
