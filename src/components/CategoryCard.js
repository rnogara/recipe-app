import React from 'react';
import PropTypes from 'prop-types';

function CategoryCard({ category: { strCategory }, onClick }) {
  return (
    <div>
      <button
        data-testid={ `${strCategory}-category-filter` }
        onClick={ onClick }
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
  onClick: PropTypes.func.isRequired,
};

export default CategoryCard;
