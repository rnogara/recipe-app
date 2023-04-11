import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Ingredients from './Ingredients';

function RecipeInProgressCard({ recipe, id }) {
  const { pathname } = useLocation();
  const isMealsPage = pathname.includes('meals');
  const actualPage = isMealsPage ? 'Meal' : 'Drink';
  const lowerTitle = `${actualPage.toLowerCase()}s`;

  return (
    <section>
      <h1 data-testid="recipe-title">{recipe[lowerTitle][0][`str${actualPage}`]}</h1>
      <img
        data-testid="recipe-photo"
        src={ recipe[lowerTitle][0][`str${actualPage}Thumb`] }
        alt={ `${lowerTitle} recipe` }
      />
      <h4 data-testid="recipe-category">
        { `Category: ${isMealsPage
          ? recipe[lowerTitle][0].strCategory : recipe[lowerTitle][0].strAlcoholic}` }
      </h4>
      <p data-testid="instructions">{ recipe[lowerTitle][0].strInstructions }</p>
      <Ingredients recipe={ recipe[lowerTitle][0] } id={ id } title={ lowerTitle } />
    </section>
  );
}

RecipeInProgressCard.propTypes = {
  recipe: PropTypes
    .objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))).isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeInProgressCard;
