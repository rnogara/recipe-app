import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import RecipeCardMeals from '../components/RecipeCardMeals';
import RecipeCardDrinks from '../components/RecipeCardDrinks';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function useRecipes(title) {
  const { apiResponse } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const choosedResponse = title === 'Meals' ? apiResponse.meals : apiResponse.drinks;
  const RecipeCard = title === 'Meals' ? RecipeCardMeals : RecipeCardDrinks;
  const URL_CATEGORIES = title === 'Meals' ? MEALS_CATEGORIES : DRINK_CATEGORIES;
  return { URL_API, choosedResponse, RecipeCard, URL_CATEGORIES };
}

export default useRecipes;
