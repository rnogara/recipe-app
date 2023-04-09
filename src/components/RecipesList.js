import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import generateId from '../helpers/generateId';
import useFetch from '../hooks/useFetch';
import useRecipes from '../hooks/useRecipes';
import { AppContext } from '../context/AppProvider';

function RecipesList({ title }) {
  const { functions } = useContext(AppContext);
  const [isLoading, , recipes, fetchRecipes] = useFetch({ [title.toLowerCase()]: [] });
  const { URL_API, recipesResponse, RecipeCard } = useRecipes(title);
  const { push } = useHistory();

  useEffect(() => {
    fetchRecipes(URL_API);
    functions.setTitle(title);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);
  return (
    <section>
      {
        isLoading ? <h1>Loading...</h1> : recipesResponse.map((recipe, index) => {
          const indexLimit = 12;
          if (index < indexLimit) {
            const recipeId = recipe[`id${title.replace('s', '')}`];
            return (
              <div
                key={ generateId() }
                onClick={
                  () => push(`/${title.toLowerCase()}/${recipeId}`)
                }
                role="presentation"
              >
                <RecipeCard
                  index={ index }
                  recipe={ recipe }
                />
              </div>
            );
          }
          return null;
        })
      }
    </section>
  );
}

RecipesList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipesList;
