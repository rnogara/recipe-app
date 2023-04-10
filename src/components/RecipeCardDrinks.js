import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCardDrinks({ recipe: { strDrink, strDrinkThumb, idDrink }, index }) {
  return (
    <Link to={ `/drinks/${idDrink}` }>
      <section data-testid={ `${index}-recipe-card` }>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
        />
        <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
      </section>
    </Link>
  );
}

RecipeCardDrinks.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCardDrinks;
