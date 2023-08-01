import React, { useContext, useEffect, useState } from 'react';
import clipBoardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import WHIcon from '../images/whiteHeartIcon.svg';
import BHIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import { AppContext } from '../context/AppProvider';

function ShareAndFav({ url, recipe }) {
  const { functions: { setFavoriteRecipes }, favoriteRecipes } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(
    favoriteRecipes.some(({ id }) => recipe.id === id),
  );

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
      setFavoriteRecipes(filtered);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...prevFav, parsed]));
      setFavoriteRecipes([...prevFav, parsed]);
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    const favLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favLocalStorage) {
      const isFav = favLocalStorage.some(({ id }) => url.includes(id));
      setFavorite(isFav);
    }
  }, []);

  return (
    <div className="s-f-container">
      <button
        className="s-f-button"
        data-testid="share-btn"
        onClick={ () => { toClipBoard(url); } }
      >
        <img
          src={ ShareIcon }
          alt="Share Icon"
        />
      </button>
      <button
        className="s-f-button"
        onClick={ () => { favRecipeList(recipe); } }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? BHIcon : WHIcon }
          alt="Favorite Icon"
        />
      </button>
      { copied === false ? false : (
        <span>
          Link copied!
        </span>
      )}
    </div>
  );
}

ShareAndFav.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
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
