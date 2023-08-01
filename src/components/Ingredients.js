import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import convertToDoneRecipe from '../helpers/convertToDoneRecipe';

function Ingredients({ recipe, id, title }) {
  const { push } = useHistory();
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
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
    const allRecipesInProgress = { ...recipesInProgress,
      [title]: { ...recipesInProgress[title], [id]: mapedSteps } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(allRecipesInProgress));
    return mapedSteps;
  });

  const saveAndRedirect = (recipeToSave) => {
    const convertedRecipe = convertToDoneRecipe(recipeToSave);
    const savedOnLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...savedOnLocalStorage, convertedRecipe]),
    );
    push('/done-recipes');
  };

  const style = { textDecoration: 'line-through solid rgb(0, 0, 0)' };

  return (
    <div>
      <section
        className="instructions"
      >
        <h4>
          Ingredients
        </h4>
        <div
          className="ing-list"
        >
          {
            ingredients.map((ingredient, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                className="label-ingredient"
                key={ index }
                style={ doneSteps[index].done ? style : {} }
              >
                <input
                  className="checkbox-ingredient"
                  type="checkbox"
                  value={ index }
                  checked={ doneSteps[index].done || doneRecipes
                    .some((doneRecipe) => doneRecipe.id === id) }
                  onChange={ handleCheckBox }
                />
                {ingredient}
              </label>
            ))
          }
        </div>
      </section>
      <button
        className="fixed-btn-pos"
        data-testid="finish-recipe-btn"
        disabled={ doneSteps.some(({ done }) => !done) }
        onClick={ () => saveAndRedirect(recipe) }
      >
        Finish Recipe
      </button>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Ingredients;
