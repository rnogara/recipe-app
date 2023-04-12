import React from 'react';
import PropTypes from 'prop-types';

function FilterBtnRow({ filterState }) {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ ({ target: { name } }) => { filterState(name); } }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ ({ target: { name } }) => { filterState(name); } }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ ({ target: { name } }) => { filterState(name); } }
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
