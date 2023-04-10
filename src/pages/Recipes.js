import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import generateId from '../helpers/generateId';
import useFetch from '../hooks/useFetch';
import useRecipes from '../hooks/useRecipes';
import { AppContext } from '../context/AppProvider';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';

function Recipes({ title }) {
  const { functions } = useContext(AppContext);
  const [isLoading, , recipes, fetchRecipes] = useFetch({ [title.toLowerCase()]: [] });
  const { URL_API, recipesResponse, RecipeCard } = useRecipes(title);

  useEffect(() => {
    fetchRecipes(URL_API);
    functions.setTitle(title);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  return (
    <div className="recipes-list">
      <Header />
      <CategoriesList title={ title } fetchRecipes={ fetchRecipes } />
      <section>
        {
          isLoading ? <h1>Loading...</h1> : recipesResponse.map((recipe, index) => {
            const indexLimit = 12;
            if (index < indexLimit) {
              return (
                <RecipeCard
                  index={ index }
                  recipe={ recipe }
                  key={ generateId() }
                />
              );
            }
            return null;
          })
        }
      </section>
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
