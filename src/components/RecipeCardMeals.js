import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCardMeals({ recipe: { strMeal, strMealThumb, idMeal }, index }) {
  return (
    <Link to={ `/meals/${idMeal}` }>
      <section data-testid={ `${index}-recipe-card` }>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
        />
        <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
      </section>
    </Link>
  );
}

RecipeCardMeals.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCardMeals;
