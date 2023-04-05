import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import RecipeCardMeals from '../components/RecipeCardMeals';
import RecipeCardDrinks from '../components/RecipeCardDrinks';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const CATEGORY_SELECTED_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const CATEGORY_SELECTED_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

function useRecipes(title) {
  const { apiResponse } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const choosedResponse = title === 'Meals' ? apiResponse.meals : apiResponse.drinks;
  const RecipeCard = title === 'Meals' ? RecipeCardMeals : RecipeCardDrinks;
  const URL_CATEGORIES = title === 'Meals' ? MEALS_CATEGORIES : DRINK_CATEGORIES;
  const URL_CATEGORY_SELECTED = title === 'Meals'
    ? CATEGORY_SELECTED_MEALS : CATEGORY_SELECTED_DRINKS;
  return { URL_API, choosedResponse, RecipeCard, URL_CATEGORIES, URL_CATEGORY_SELECTED };
}

export default useRecipes;
