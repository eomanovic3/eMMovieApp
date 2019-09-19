/**
 *
 * VideoPlayer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import shaka from 'shaka-player';
import muxjs from 'mux.js';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { loadMovieWithId } from './actions';
import {
  makeSelectError,
  makeSelectId,
  makeSelectLoading,
  makeSelectMovie,
  makeSelectMovieLink,
} from './selectors';

class VideoPlayer extends React.PureComponent {
  constructor() {
    super();
    window.muxjs = muxjs;
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const splitUrl = this.props.location.pathname.split('/');
    this.props.getMovieWithId(splitUrl[splitUrl.length - 1]);

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
    // Create a Player instance.
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    player.resolution = '1440X444';
    player.bandwidth = '10285391';
    player.codecs = 'CODECS=avc1.4d4033';
    window.player = player;
    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    player
      .load(
        'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8')
      .then(function() {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  render() {
    return (
      <div>
        <h2>Player</h2>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          id="video"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          data-shaka-player-container
          data-shaka-player-cast-receiver-id="7B25EC44"
          autoPlay
          allow="fullScreen"
          width="1440"
          height="444"
        />
      </div>
    );
  }
}
VideoPlayer.propTypes = {
  getMovieWithId: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    getMovieWithId: id => dispatch(loadMovieWithId(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  movie: makeSelectMovie(),
  movieLink: makeSelectMovieLink(),
  id: makeSelectId(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'videoPlayer', reducer });
const withSaga = injectSaga({ key: 'videoPlayer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VideoPlayer);
