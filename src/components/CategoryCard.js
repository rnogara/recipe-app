import React from 'react';
import PropTypes from 'prop-types';

function CategoryCard({ category: { strCategory }, onClick, icon }) {
  return (
    <div>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => onClick(strCategory) }
        className="category-button"
      >
        <div>
          <img src={ icon } alt={ strCategory } />
        </div>
        <span>{strCategory}</span>
      </button>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CategoryCard;
