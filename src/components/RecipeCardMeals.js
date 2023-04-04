import React from 'react';
import PropTypes from 'prop-types';

function RecipeCardMeals({ recipe: { strMeal, strMealThumb }, index }) {
  return (
    <section data-testId={ `${index}-recipe-card` }>
      <img
        data
        src={ strMealThumb }
        alt={ strMeal }
        data-testId={ `${index}-card-img` }
      />
      <h4 data-testId={ `${index}-card-name` }>{ strMeal }</h4>
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
