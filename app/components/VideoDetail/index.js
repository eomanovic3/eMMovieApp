/**
 *
 * VideoDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class VideoDetail extends React.PureComponent {
  render() {
    if (!this.props.video) {
      return <div>Loading...</div>;
    }
    const videoSrc = `https://www.youtube.com/embed/${this.props.video.id}`;
    return (
      <div>
        <div className="ui embed">
          <iframe title="videoPlayer" src={videoSrc} />
        </div>
        <div className="ui segment">
          <h4>{this.props.video.original_title}</h4>
          <p>{this.props.video.overview}</p>
        </div>
      </div>
    );
  }
}

VideoDetail.propTypes = {
  video: PropTypes.object,
};
export default VideoDetail;
