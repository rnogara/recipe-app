import React, { useState } from 'react';
import clipBoardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';

function ShareAndFav({ url, recipe }) {
  const [copied, setCopied] = useState(false);
  console.log(recipe);

  const toClipBoard = (path) => {
    clipBoardCopy(path);
    setCopied(true);
  };

  const parseRecipe = (data) => {
    const toLocalStorage = {
      id: data.id,
      type: data.video === 'false' ? 'drink' : 'meal',
      nationality: data.video !== 'false' ? data.area : '',
      category: data.category,
      alcoholicOrNot: data.video === 'false' ? data.alcoholicOrNot : '',
      name: data.title,
      image: data.thumbnail,
    };
    return toLocalStorage;
  };

  const favRecipeList = (payload) => {
    const prevFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const parsed = parseRecipe(payload);
    const isFav = prevFav.some((fav) => fav.id === parsed.id);
    if (isFav) {
      const filtered = prevFav.filter((fv) => fv.id !== parsed.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...prevFav, parsed]));
    }
  };

  return (
    <>
      <button
        data-testid="share-btn"
        onClick={ () => { toClipBoard(url); } }
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ () => { favRecipeList(recipe); } }
      >
        Favoritar
      </button>
      { copied === false ? false : (
        <span>
          Link copied!
        </span>
      )}
    </>
  );
}

ShareAndFav.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measurements: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    video: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};

export default ShareAndFav;
