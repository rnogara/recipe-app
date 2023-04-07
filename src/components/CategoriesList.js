import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../hooks/useRecipes';
import CategoryCard from './CategoryCard';
import generateId from '../helpers/generateId';
import useFetch from '../hooks/useFetch';

function CategoriesList({ title, fetchRecipes }) {
  const { URL_CATEGORIES, URL_CATEGORY_SELECTED, URL_API } = useRecipes(title);
  const [loadingCategories, , categories, fetchCategories] = useFetch(
    { [title.toLowerCase()]: [] },
  );
  const [toggles, setToggles] = useState({});

  useEffect(() => {
    fetchCategories(URL_CATEGORIES);
  }, []);

  useEffect(() => {
    setToggles(categories[title.toLowerCase()]
      .reduce((acc, curr) => ({ ...acc, [curr.strCategory]: false }), {}));
  }, [categories]);

  if (loadingCategories) return <h1>Loading...</h1>;

  const handleCategoriesClick = ({ target: { innerText } }) => {
    if (!toggles[innerText]) {
      fetchRecipes(URL_CATEGORY_SELECTED + innerText);
    } else {
      fetchRecipes(URL_API);
    }
    const allToggles = categories[title.toLowerCase()]
      .reduce((acc, curr) => (
        { ...acc, [curr.strCategory]: false }
      ), {});
    setToggles({ ...allToggles, [innerText]: !toggles[innerText] });
  };

  return (
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
                  onClick={ handleCategoriesClick }
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
  );
}

CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
};

export default CategoriesList;
