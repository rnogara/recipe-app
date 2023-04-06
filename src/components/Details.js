import React from 'react';
import PropTypes from 'prop-types';
import Iframe from './Iframe';

function Details({ payload }) {
  const toSlice = 32;
  const {
    title,
    thumbnail,
    category,
    ingredients,
    measurements,
    instructions,
    video,
  } = payload;
  return (
    <>
      <h1
        data-testid="recipe-title"
      >
        { title }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ thumbnail }
        alt={ title }
      />
      <h3
        data-testid="recipe-category"
      >
        Category :
        {' '}
        { category }
      </h3>
      <h4>
        Ingredients
      </h4>
      <ul>
        {ingredients.map((ing, index) => ((
          <li
            key={ `${ing}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${measurements[index] || ''} ${ing || ''}`}
          </li>)))}
      </ul>
      <h4>
        Instructions
      </h4>
      <p
        data-testid="instructions"
      >
        { instructions }
      </p>
      {video !== 'false' ? <Iframe embedId={ video.slice(toSlice) } /> : false}
    </>
  );
}

Details.propTypes = {
  payload: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measurements: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    video: PropTypes.string,
  }).isRequired,
};

export default Details;
