import React from 'react';
import MealIcon from '../images/mealIcon.svg';
import DrinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <section data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <button>
        <img src={ MealIcon } alt="Meal" data-testid="meals-bottom-btn" />
      </button>
      <button>
        <img src={ DrinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>
    </section>
  );
}

export default Footer;
