import React, { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { AppContext } from '../context/AppProvider';
import RecipeCardMeals from './RecipeCardMeals';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Recipes() {
  const { helpers: { title }, apiResponse, functions } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const [isLoading, , recipes, fetchData] = useFetch({ [title.toLowerCase()]: [] });
  const [choosedResponse, RecipeCard] = title === 'Meals'
    ? [apiResponse.meals, RecipeCardMeals] : [apiResponse.drinks];

  useEffect(() => {
    fetchData(URL_API);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  console.log(choosedResponse);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="recipes-list">
      {
        choosedResponse.map((recipe, index) => (
          <RecipeCard
            index={ index }
            recipe={ recipe }
            key={ recipe[`id${title}`] }
          />
        ))
      }
    </div>
  );
}

export default Recipes;
