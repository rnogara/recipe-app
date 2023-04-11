import React from 'react';
import { useHistory } from 'react-router-dom';
import MealIcon from '../images/mealIcon.svg';
import DrinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const { push } = useHistory();
  const clickMeals = (end) => {
    push(`/${end}`);
  };
  return (
    <section data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <button onClick={ () => clickMeals('meals') }>
        <img src={ MealIcon } alt="Meal" data-testid="meals-bottom-btn" />
      </button>
      <button onClick={ () => clickMeals('drinks') }>
        <img src={ DrinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
    </section>
  );
}

export default Footer;
