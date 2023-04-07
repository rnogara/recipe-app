import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import useRecipes from '../hooks/useRecipes';
import { AppContext } from '../context/AppProvider';
import Header from '../components/Header';
import generateId from '../helpers/generateId';
import CategoriesList from '../components/CategoriesList';
// import useToggle from '../hooks/useToggle';

function Recipes({ title }) {
  const { functions } = useContext(AppContext);
  const [isLoading, , recipes, fetchRecipes] = useFetch({ [title.toLowerCase()]: [] });
  // const [loadingCategories, , categories, fetchCategories] = useFetch(
  //   { [title.toLowerCase()]: [] },
  // );
  const { URL_API, recipesResponse, RecipeCard } = useRecipes(title);

  useEffect(() => {
    fetchRecipes(URL_API);
    // fetchCategories(URL_CATEGORIES);
    functions.setTitle(title);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[title.toLowerCase()]);
  }, [recipes]);

  // const handleCategoriesClick = ({ target: { innerText } }) => {
  //   if (!toggles[innerText]) {
  //     fetchRecipes(URL_CATEGORY_SELECTED + innerText);
  //   } else {
  //     fetchRecipes(URL_API);
  //   }
  //   const allToggles = categories[title.toLowerCase()]
  //     .reduce((acc, curr) => (
  //       { ...acc, [curr.strCategory]: false }
  //     ), {});
  //   setToggles({ ...allToggles, [innerText]: !toggles[innerText] });
  // };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="recipes-list">
      <Header />
      <section>
        <CategoriesList title={ title } fetchRecipes={ fetchRecipes } />
      </section>
      <section>
        {
          recipesResponse.map((recipe, index) => {
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
