import React from 'react';
import PropTypes from 'prop-types';

function RecipeCardDrinks({ recipe: { strDrink, strDrinkThumb }, index }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ `${index}-card-img` }
      />
      <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
    </section>
  );
}

RecipeCardDrinks.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCardDrinks;
