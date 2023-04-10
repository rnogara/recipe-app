import React from 'react';

function ShareAndFav() {
  return (
    <>
      <button
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
    </>
  );
}

export default ShareAndFav;
