import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareAndFav from './ShareAndFav';

function FavoriteRecipeCard({ recipe, index }) {
  const { type, id, name, image, category, nationality } = recipe;
  const { push } = useHistory();
  return (
    <section>
      <ShareAndFav recipe={ recipe } url={ `${window.location.origin}/${type}s/${id}` } />
      <div
        role="presentation"
        onClick={ () => push(`/${type}s/${id}`) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ `${name} ${type}` }
          src={ image }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${nationality}-${category}` }
        </p>
      </div>
    </section>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
