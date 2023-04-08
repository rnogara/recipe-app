import React from 'react';
import PropTypes from 'prop-types';

function Recomendations({ payload }) {
  const carousel = {
    display: 'grid',
    gap: '1em',
    gridTemplateColumns: 'repeat(6, 200px)',
    overflowX: 'scroll',
    width: '400px',
  };

  const card = {
    heigth: '200px',
    width: '200px',
  };

  return (
    <section
      className="recommendation-carousel"
      style={ carousel }
    >
      {payload.map((reco, index) => (
        <div
          className="recommendation-card"
          key={ reco.id + index }
          data-testid={ `${index}-recommendation-card` }
          style={ card }
        >
          <img
            src={ reco.Thumb }
            alt={ reco.name }
            style={ card }
          />
          <h3
            data-testid={ `${index}-recommendation-title` }
          >
            {reco.name}
          </h3>
        </div>))}
    </section>
  );
}

Recomendations.propTypes = {
  payload: PropTypes.shape({
    name: PropTypes.string,
    Thumb: PropTypes.string,
    id: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};

export default Recomendations;
