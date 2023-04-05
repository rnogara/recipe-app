import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import useRecipes from '../hooks/useRecipes';
import { AppContext } from '../context/AppProvider';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import generateId from '../helpers/generateId';

function Recipes({ title }) {
  const { functions } = useContext(AppContext);
  const [isLoading, , recipes, fetchRecipes] = useFetch({ [title.toLowerCase()]: [] });
  const { URL_API, choosedResponse, RecipeCard,
    URL_CATEGORIES, URL_CATEGORY_SELECTED } = useRecipes(title);
  const [loadingCategories, , categories, fetchCategories] = useFetch(
    { [title.toLowerCase()]: [] },
  );

  useEffect(() => {
    fetchRecipes(URL_API);
    functions.setTitle(title);
    fetchCategories(URL_CATEGORIES);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  if (isLoading || loadingCategories) return <h1>Loading...</h1>;

  return (
    <div className="recipes-list">
      <Header />
      <section>
        {
          categories[title.toLowerCase()]
            .map(
              (category, index) => {
                const indexLimit = 5;
                if (index < indexLimit) {
                  return (<CategoryCard
                    category={ category }
                    key={ generateId() }
                    onClick={ (e) => {
                      fetchRecipes(URL_CATEGORY_SELECTED + e.target.innerText);
                    } }
                  />);
                }
                return null;
              },
            )
        }
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchRecipes(URL_API) }
        >
          All
        </button>
      </section>
      <section>
        {
          choosedResponse.map((recipe, index) => {
            const indexLimit = 12;
            if (index < indexLimit) {
              return (<RecipeCard
                index={ index }
                recipe={ recipe }
                key={ generateId() }
              />);
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
