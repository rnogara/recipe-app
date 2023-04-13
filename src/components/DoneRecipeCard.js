import React, { useState } from 'react';
import clipBoardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  const history = useHistory();
  const { name, doneDate, category, image, nationality,
    alcoholicOrNot, tags, type, id } = recipe;
  const [copied, setCopied] = useState(false);
  const hasTag = tags.sort((a, b) => a - b) || [];

  const toClipBoard = (path) => {
    const newPath = `${path}/${type}s/${id}`;
    clipBoardCopy(newPath);
    setCopied(true);
  };

  const sizeStyle = {
    maxWidth: '120px',
    maxHeight: '120px',
  };

  return (
    <div>
      <div
        role="presentation"
        onClick={ () => { history.push(`/${type}s/${id}`); } }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ `Foto de ${name}` }
          style={ sizeStyle }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </div>
      { nationality
      && (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${nationality} - ${category}` }
        </p>
      )}
      { alcoholicOrNot
      && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </p>
      )}
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button
        onClick={ () => { toClipBoard(window.location.origin); } }
      >
        <img
          src={ shareIcon }
          alt="share button"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {copied === false ? false : <span>Link copied!</span>}
      <ul>
        { hasTag.length > 0
          && <li data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</li>}
        { hasTag.length > 1
          && <li data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</li>}
      </ul>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.array,
  index: PropTypes.number,
}.isRequired;

export default DoneRecipeCard;

// [{
//     id: id-da-receita,
//     type: meal-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
