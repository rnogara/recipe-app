import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';
import RecipesList from '../components/RecipesList';

function Recipes({ title }) {
  return (
    <div className="recipes-list">
      <Header />
      <CategoriesList title={ title } />
      <RecipesList title={ title } />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
