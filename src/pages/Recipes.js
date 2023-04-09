import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CategoriesList from '../components/CategoriesList';
import RecipesList from '../components/RecipesList';

function Recipes({ title }) {
  return (
    <div className="recipes-list">
      <Header />
      <section>
        <CategoriesList title={ title } fetchRecipes={ fetchRecipes } />
      </section>
      <RecipesList title={ title } />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
