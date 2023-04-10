import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clipBoardCopy from 'clipboard-copy';

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

export default ShareAndFav;
