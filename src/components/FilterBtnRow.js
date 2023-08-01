import React from 'react';
import PropTypes from 'prop-types';
import drink from '../images/allDrinks.png';
import meal from '../images/allMeals.png';
import all from '../images/all.png';

function FilterBtnRow({ filterState }) {
  return (
    <div className="filters-button-list">
      <button
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ () => { filterState('all'); } }
        className="filter-button"
      >
        <div>
          <img src={ all } alt="Clear filters" />
        </div>
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ () => { filterState('meal'); } }
        className="filter-button"
      >
        <div>
          <img src={ meal } alt="Filter by meal" />
        </div>
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ () => { filterState('drink'); } }
        className="filter-button"
      >
        <div>
          <img src={ drink } alt="Filter by drink" />
        </div>
        Drinks
      </button>
    </div>
  );
}

FilterBtnRow.propTypes = {
  filterState: PropTypes.func.isRequired,
};

export default FilterBtnRow;
