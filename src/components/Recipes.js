import React, { useContext, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { AppContext } from '../context/AppProvider';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Recipes() {
  const { helpers: { title }, apiResponse, functions } = useContext(AppContext);
  const URL_API = title === 'Meals' ? MEALS_API : DRINKS_API;
  const [isLoading, , recipes, fetchData] = useFetch({ [title.toLowerCase()]: [] });
  const choosedResponse = title === 'Meals' ? apiResponse.meals : apiResponse.drinks;

  useEffect(() => {
    fetchData(URL_API);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  console.log(choosedResponse);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      {
        choosedResponse.map((obj) => console.log(obj))
      }
    </div>
  );
}

export default Recipes;
