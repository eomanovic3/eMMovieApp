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
    let video = this.props.video;
    const imageUrl = video.poster_path
      ? `https://image.tmdb.org/t/p/w500${video.poster_path}`
      : nomovie;
    if(video) {
      return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <Link
              to={`/detailPage/${video.id}`}
              className="video-item item shadow-lg d-flex flex-column"
          >
            <img
                className="ui image"
                alt={video.original_title}
                src={imageUrl}
            />
            <TitleDiv>{video.original_title ? video.original_title : (
                video.original_name ? video.original_name : null)}</TitleDiv>
            <YearDiv>
              {video.release_date
                  ? video.release_date.toString().split('-')[0]
                  : (video.first_air_date ? video.first_air_date.toString().split('-')[0] : null)}
            </YearDiv>
          </Link>
      );
    }
    return <div/>;
  }
}

VideoItem.propTypes = {
  video: PropTypes.object,
  onVideoSelect: PropTypes.func,
};

export default VideoItem;
