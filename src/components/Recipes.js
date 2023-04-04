import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { AppContext } from '../context/AppProvider';
import RecipeCardMeals from './RecipeCardMeals';
import RecipeCardDrinks from './RecipeCardDrinks';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Recipes({ title }) {
  const { apiResponse, functions } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const [isLoading, , recipes, fetchData] = useFetch({ [title.toLowerCase()]: [] });
  const [choosedResponse, RecipeCard] = title === 'Meals'
    ? [apiResponse.meals, RecipeCardMeals] : [apiResponse.drinks, RecipeCardDrinks];

  useEffect(() => {
    fetchData(URL_API);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="recipes-list">
      {
        choosedResponse.map((recipe, index) => {
          const indexLimit = 12;
          if (index < indexLimit) {
            return (<RecipeCard
              index={ index }
              recipe={ recipe }
              key={ recipe[`id${title}`] }
            />);
          }
          return null;
        })
      }
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
