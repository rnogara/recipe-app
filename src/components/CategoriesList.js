import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../hooks/useRecipes';
import CategoryCard from './CategoryCard';
import generateId from '../helpers/generateId';
import useFetch from '../hooks/useFetch';
import { AppContext } from '../context/AppProvider';

function CategoriesList({ title }) {
  const lowerTitle = title.toLowerCase();
  const { URL_CATEGORIES, URL_CATEGORY_SELECTED, URL_API } = useRecipes(title);
  const [isLoading, , categories, fetchCategories] = useFetch(
    { [lowerTitle]: [] },
  );
  const [, , recipes, fetchRecipes] = useFetch({ [lowerTitle]: [] });
  const [toggles, setToggles] = useState({});
  const { functions } = useContext(AppContext);

  useEffect(() => {
    fetchCategories(URL_CATEGORIES);
  }, []);

  useEffect(() => {
    functions[`set${title}`](recipes[lowerTitle]);
  }, [recipes]);

  useEffect(() => {
    setToggles(categories[lowerTitle]
      .reduce((acc, curr) => ({ ...acc, [curr.strCategory]: false }), {}));
  }, [categories]);

  const handleCategoriesClick = ({ target: { innerText } }) => {
    if (!toggles[innerText]) {
      fetchRecipes(URL_CATEGORY_SELECTED + innerText);
    } else {
      fetchRecipes(URL_API);
    }
    const allToggles = categories[lowerTitle]
      .reduce((acc, curr) => (
        { ...acc, [curr.strCategory]: false }
      ), {});
    setToggles({ ...allToggles, [innerText]: !toggles[innerText] });
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section>
      {
        categories[lowerTitle]
          .map(
            (category, index) => {
              const indexLimit = 5;
              if (index < indexLimit) {
                return (<CategoryCard
                  category={ category }
                  key={ generateId() }
                  onClick={ handleCategoriesClick }
                />);
              }
              return null;
            },
          )
      }
      <button
        data-testid="All-category-filter"
        onClick={ () => {
          fetchRecipes(URL_API);
          const allToggles = categories[lowerTitle]
            .reduce((acc, curr) => (
              { ...acc, [curr.strCategory]: false }
            ), {});
          setToggles(allToggles);
        } }
      >
        All
      </button>
    </section>
  );
}

CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoriesList;
