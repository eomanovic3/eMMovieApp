/**
 *
 * VideoItem
 *
 */

import React from 'react';
import './VideoItem.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import nomovie from '../../images/nomovie.jpg';

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

const MovieImage = styled.img`
  width: ${props => (!props.noMovieImageAvailable ? '300px !important' : '400px !important')};
  margin: auto;
  display: block;
  float: right;
  box-shadow: 5px 5px 5px grey;
`;

class VideoItem extends React.PureComponent {
  render() {
    const { video } = this.props;
    const imageUrl = video && video.poster_path ? `https://image.tmdb.org/t/p/w500${video.poster_path}` : nomovie;
    const noMovieImageAvailable = video && video.poster_path;
    if (
      video &&
      (video.first_air_date || video.release_date) &&
      (video.original_title || video.original_name || video.name)
    ) {
      return (
        <Link
          to={`/detailPage/${video.first_air_date ? 'tv' : 'movie'}/${video.id}`}
          className="video-item item shadow-lg d-flex flex-column"
        >
          <MovieImage
            className="ui image"
            alt={video.original_title}
            src={imageUrl}
            noMovieImageAvailable={noMovieImageAvailable}
          />
          <TitleDiv>
            {video.original_title ? video.original_title : video.original_name ? video.original_name : null}
          </TitleDiv>
          <YearDiv>
            {video.release_date
              ? video.release_date.toString().split('-')[0]
              : video.first_air_date
              ? video.first_air_date.toString().split('-')[0]
              : null}
          </YearDiv>
        </Link>
      );
    }
    return <div />;
  }
}

VideoItem.propTypes = {
  video: PropTypes.object,
  onVideoSelect: PropTypes.func,
};

export default VideoItem;
