import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../hooks/useRecipes';
import CategoryCard from './CategoryCard';
import useFetch from '../hooks/useFetch';

function CategoriesList({ title, fetchRecipes }) {
  const lowerTitle = title.toLowerCase();
  const { URL_CATEGORIES, URL_CATEGORY_SELECTED, URL_API } = useRecipes(title);
  const [isLoading, , categories, fetchCategories] = useFetch(
    { [lowerTitle]: [] },
  );
  const [toggles, setToggles] = useState({});

  useEffect(() => {
    fetchCategories(URL_CATEGORIES);
  }, [title]);

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

  if (isLoading || !categories[lowerTitle]) return <h1>Loading...</h1>;

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
                  key={ index }
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
  fetchRecipes: PropTypes.func.isRequired,
};

export default CategoriesList;
