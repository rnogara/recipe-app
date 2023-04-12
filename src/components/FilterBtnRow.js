import React from 'react';
import PropTypes from 'prop-types';

function FilterBtnRow({ filterState }) {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ () => { filterState('all'); } }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        name="meals"
        onClick={ () => { filterState('meals'); } }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="drinks"
        onClick={ () => { filterState('drinks'); } }
      >
        Drinks
      </button>
    </div>
  );
}

FilterBtnRow.propTypes = {
  filterState: PropTypes.func.isRequired,
};

export default FilterBtnRow;
