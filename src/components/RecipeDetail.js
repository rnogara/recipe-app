import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetail() {
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const params = useParams();
  const history = useHistory();
  const fromURL = history.location.pathname;
  const { id } = params;
  const recipeType = fromURL.includes('meal') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [isLoading, errors, recipe, fetchingData] = useFetch({
    meals: false,
    drinks: false,
  });
  console.log(`${isLoading} loading`);
  console.log(`${errors} error`);

  const getDetails = (detailed) => {
    const ingredientsRange = 20;
    const ing = 'strIngredient';
    const meas = 'strMeasure';
    const recipeData = fromURL.includes('meal') ? { ...detailed.meals[0] }
      : { ...detailed.drinks[0] };
    const payload = {
      title: recipeData.strMeal || recipeData.strDrink,
      thumbnail: recipeData.strMealThumb || recipeData.strDrinkThumb,
      instructions: recipeData.strInstructions,
      category: recipeData.strCategory,
      ingredients: [],
      measurements: [],
      video: recipeData.strYoutube || false,
    };
    for (let i = 1; i <= ingredientsRange; i += 1) {
      payload.ingredients.push(recipeData[ing + i]);
      payload.measurements.push(recipeData[meas + i]);
    }
    return payload;
  };

  useEffect(() => {
    fetchingData(recipeType);
  }, []);

  useEffect(() => {
    setDetailedRecipe(getDetails(recipe));
  }, [recipe]);

  return (
    <p>{detailedRecipe === null ? 'Carregando' : detailedRecipe.title }</p>
  );
}

export default RecipeDetail;
