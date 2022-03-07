import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicTrack, trackName } = this.props;

    return (
      <li className="album-track">
        {trackName}
        <audio data-testid="audio-component" src={ musicTrack } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input type="checkbox" />
      </li>
    );
  }
}

MusicCard.propTypes = {
  musicTrack: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
