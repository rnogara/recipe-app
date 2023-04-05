import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import RecipeCardMeals from '../components/RecipeCardMeals';
import RecipeCardDrinks from '../components/RecipeCardDrinks';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function useRecipes(title) {
  const { apiResponse } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const choosedResponse = title === 'Meals' ? apiResponse.meals : apiResponse.drinks;
  const RecipeCard = title === 'Meals' ? RecipeCardMeals : RecipeCardDrinks;
  return { URL_API, choosedResponse, RecipeCard };
}

export default useRecipes;
