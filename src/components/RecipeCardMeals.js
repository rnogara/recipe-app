import React from 'react';
import PropTypes from 'prop-types';

function RecipeCardMeals({ recipe: { strMeal, strMealThumb }, index }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${index}-card-img` }
      />
      <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
    </section>
  );
}

RecipeCardMeals.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCardMeals;
