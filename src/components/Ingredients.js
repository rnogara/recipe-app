import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe, id, title }) {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const currentIngredientsInProgress = recipesInProgress[title][id];
  const ingrendientsQuantity = Object.entries(recipe)
    .filter(([measureKey, measure]) => measureKey.includes('Measure') && measure)
    .map((eachQuantity) => eachQuantity[1]);
  const ingredients = Object.entries(recipe)
    .filter(([ingredientIndex, ingredient]) => ingredientIndex
      .includes('Ingredient') && ingredient)
    .map((eachIngredient, i) => `${ingrendientsQuantity[i] || ''} ${eachIngredient[1]}`);
  const ingredientsToLocalStorage = ingredients
    .reduce((acc, ingredient) => [...acc, { ingredient, done: false }], []);
  const defaultDoneSteps = currentIngredientsInProgress || ingredientsToLocalStorage;
  const [doneSteps, setDoneSteps] = useState(defaultDoneSteps);

  const handleCheckBox = ({ target: { value, checked } }) => setDoneSteps((steps) => {
    const mapedSteps = steps.map((ingredient, index) => {
      if (index === parseInt(value, 10)) return { ...ingredient, done: checked };
      return ingredient;
    });
    return mapedSteps;
  });

  const style = { textDecoration: 'line-through solid rgb(0, 0, 0)' };

  return (
    <div>
      {
        ingredients.map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            style={ doneSteps[index].done ? style : {} }
          >
            <input
              type="checkbox"
              value={ index }
              checked={ doneSteps[index].done }
              onChange={ handleCheckBox }
            />
            {ingredient}
          </label>
        ))
      }
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Ingredients;
