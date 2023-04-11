import React from 'react';
import MealIcon from '../images/mealIcon.svg';
import DrinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <section data-testid="footer">
      <button>
        <img src={ MealIcon } alt="Meal" data-testid="drinks-bottom-btn" />
      </button>
      <button>
        <img src={ DrinkIcon } alt="Drink" data-testid="meals-bottom-btn" />
      </button>
    </section>
  );
}

export default Footer;
