import React from 'react';
import PropTypes from 'prop-types';

function CategoryCard({ category: { strCategory } }) {
  return (
    <div>
      <button
        data-testid={ `${strCategory}-category-filter` }
      >
        {strCategory}
      </button>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
