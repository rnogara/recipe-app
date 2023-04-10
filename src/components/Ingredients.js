import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe }) {
  const ingrendientsQuantity = Object.entries(recipe)
    .filter(([measureKey, measure]) => measureKey.includes('Measure') && measure)
    .map((eachQuantity) => eachQuantity[1]);
  const ingredients = Object.entries(recipe)
    .filter(([ingredientIndex, ingredient]) => ingredientIndex
      .includes('Ingredient') && ingredient)
    .map((eachIngredient, i) => `${ingrendientsQuantity[i]} ${eachIngredient[1]}`);
  return (
    <div>
      {
        ingredients.map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input type="checkbox" />
            {ingredient}
          </label>
        ))
      }
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Ingredients;
