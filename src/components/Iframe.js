import React from 'react';
import PropTypes from 'prop-types';

function Iframe({ embedId }) {
  return (
    <div className="video-responsive">
      <iframe
        data-testid="video"
        width="360"
        height="240"
        src={ `https://www.youtube.com/embed/${embedId}` }
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

Iframe.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default Iframe;
