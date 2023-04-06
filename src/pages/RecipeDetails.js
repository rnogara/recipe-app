import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Details from '../components/Details';
import useFetch from '../hooks/useFetch';

function RecipeDetail() {
  const [recipeRecommended, setRecipeRecommended] = useState([{ name: undefined }]);
  const [detailedRecipe, setDetailedRecipe] = useState({
    title: undefined,
  });
  const params = useParams();
  const history = useHistory();
  const fromURL = history.location.pathname;
  const { id } = params;
  const recipeType = fromURL.includes('meal') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const detailsType = fromURL.includes('meal') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [, , recipe, fetchingData] = useFetch({
    meals: false,
    drinks: false,
  });

  const [, , recommendations, fetchingRecommendations] = useFetch([]);

  const getRecommendations = (recommendList) => {
    const recomendationLength = 6;
    if (recommendations !== undefined) {
      const list = fromURL.includes('meal') ? Object.values({ ...recommendList.drinks })
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
    const recipeData = fromURL.includes('meal') ? { ...detailed.meals[0] }
      : { ...detailed.drinks[0] };
    const payload = {
      title: recipeData.strMeal || recipeData.strDrink,
      thumbnail: recipeData.strMealThumb || recipeData.strDrinkThumb,
      instructions: recipeData.strInstructions,
      category: fromURL.includes('meals') ? recipeData.strCategory
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

  useEffect(() => {
    fetchingData(recipeType);
  }, []);

  useEffect(() => {
    setDetailedRecipe(getDetails(recipe));
  }, [recipe]);

  return (
    <section
      className="details"
    >
      {detailedRecipe.category === undefined ? 'Carregando'
        : <Details payload={ detailedRecipe } />}
    </section>
  );
}

export default RecipeDetail;
