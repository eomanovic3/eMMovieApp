/**
 *
 * VideoItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './VideoItem.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nomovie from '../../images/nomovie.jpg';
import { Link } from 'react-router-dom';

const TitleDiv = styled.div`
  width: 220px !important;
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
`;
const YearDiv = styled.div`
  width: 220px !important;
  float: left;
  color: #9f9f9f;
`;

class VideoItem extends React.PureComponent {
  render() {
    const imageUrl = this.props.video.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.props.video.poster_path}`
      : nomovie;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <Link
        to={`/detailPage/${this.props.video.id}`}
        className="video-item item shadow-lg d-flex flex-column"
      >
        <img
          className="ui image"
          alt={this.props.video.original_title}
          src={imageUrl}
        />
        <TitleDiv>{this.props.video.original_title}</TitleDiv>
        <YearDiv>
          {this.props.video.release_date
            ? this.props.video.release_date.toString().split('-')[0]
            : null}
        </YearDiv>
      </Link>
    );
  }
}

VideoItem.propTypes = {
  video: PropTypes.object,
  onVideoSelect: PropTypes.func,
};

export default VideoItem;
