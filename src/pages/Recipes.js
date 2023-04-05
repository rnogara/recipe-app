import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import useRecipes from '../hooks/useRecipes';
import { AppContext } from '../context/AppProvider';
import Header from '../components/Header';

function Recipes({ title }) {
  const { functions } = useContext(AppContext);
  const [isLoading, , recipes, fetchData] = useFetch({ [title.toLowerCase()]: [] });
  const { URL_API, choosedResponse, RecipeCard } = useRecipes(title);

  useEffect(() => {
    fetchData(URL_API);
    functions.setTitle(title);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="recipes-list">
      <Header />
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
