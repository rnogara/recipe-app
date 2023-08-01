import React from 'react';
import { useHistory } from 'react-router-dom';
import MealIcon from '../images/🦆 emoji _fork and knife with plate_.svg';
import DrinkIcon from '../images/icone-bebida.svg';
import '../styles/Footer.css';

function Footer() {
  const { push } = useHistory();
  const redirect = (end) => {
    push(`/${end}`);
  };
  return (
    <section
      className="footer-wraper"
      data-testid="footer"
    >
      <button
        className="footer-btn-redirect"
        onClick={ () => redirect('drinks') }
      >
        <img
          className="footer-img-redirector"
          src={ DrinkIcon }
          alt="Drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        className="footer-btn-redirect"
        onClick={ () => redirect('meals') }
      >
        <img
          className="footer-img-redirector"
          src={ MealIcon }
          alt="Meal"
          data-testid="meals-bottom-btn"
        />
      </button>
    </section>
  );
}

export default Footer;
