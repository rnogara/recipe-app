import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const lowerTitle = title.toLowerCase();
  const { apiResponse } = useContext(AppContext);

  const URL_API = pathname.includes('meals') ? MEALS_API : DRINKS_API;
  const RecipeCard = title === 'Meals' ? RecipeCardMeals : RecipeCardDrinks;
  const URL_CATEGORIES = title === 'Meals' ? MEALS_CATEGORIES : DRINK_CATEGORIES;
  const URL_CATEGORY_SELECTED = title === 'Meals'
    ? CATEGORY_SELECTED_MEALS : CATEGORY_SELECTED_DRINKS;

  return {
    URL_API,
    recipesResponse: apiResponse[lowerTitle],
    RecipeCard,
    URL_CATEGORIES,
    URL_CATEGORY_SELECTED,
  };
}

export default useRecipes;
