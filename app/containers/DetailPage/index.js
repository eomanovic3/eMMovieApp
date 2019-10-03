/**
 *
 * DetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import 'font-awesome/css/font-awesome.min.css';

import { makeSelectError, makeSelectId, makeSelectLoading, makeSelectMovie, makeSelectMovieLink } from './selectors';
import { loadMovieWithId } from './actions';
import nomovie from '../../images/nomovie.jpg';
import yt from '../../images/yt.png';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MovieImage = styled.img`
  min-width: 150px;
  min-height: 150px;
  width: ${props => (!props.noMovieImageAvailable ? '300px !important' : '400px !important')};
  margin: auto;
  display: block;
  float: right;
  box-shadow: -28px 26px 5px grey;
`;

class DetailPage extends React.PureComponent {
  componentDidMount() {
    const splitUrl = this.props.location.pathname.split('/');
    const id = splitUrl[splitUrl.length - 1];
    const movieType = splitUrl[splitUrl.length - 2];
    this.props.getMovieWithId(id, movieType);
  }

  render() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    const imageUrl =
      this.props.movie && this.props.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`
        : nomovie;
    const noMovieImageAvailable = this.props.movie && this.props.movie.poster_path;
    const movieLinkValue =
      !this.props.movieLink || this.props.movieLink === ''
        ? 'https://www.youtube.com/watch?v=vFPajU-d-Ek'
        : this.props.movieLink;
    if (this.props.movie) {
      return (
        <div className="d-flex flex-column">
          <div className="p-2">
            <Link className="text-right float-left mr-3" style={{ fontSize: '20px' }} to="/">
              <i className="fa fa-arrow-left" aria-hidden="true" /> Back to dashboard
            </Link>
          </div>
          <div className="p-5 d-flex justify-content-center">
            <div className="flex-column w-75">
              <div className="pb-4 justify-content-end">
                <div className="float-left">
                  {this.props.movie && this.props.movie.release_date
                    ? this.props.movie.release_date.toString().split('-')[0]
                    : null}
                </div>
                <div className="float-left">
                  &nbsp; <i className="fa fa-circle" style={{ color: 'grey', fontSize: '12px' }} aria-hidden="true" />{' '}
                  &nbsp;
                </div>
                <div className="flex-row">
                  {this.props.movie && this.props.movie.genres ? (
                    this.props.movie.genres.map((genre, index) => (
                      <div className="float-left" key={index.toString()}>
                        {genre.name}&nbsp;
                        {index !== this.props.movie.genres.length - 1 ? (
                          <i
                            className="fa fa-circle"
                            style={{ color: 'lightgrey', fontSize: '9px' }}
                            aria-hidden="true"
                          />
                        ) : null}
                        &nbsp;
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <h2>
                {this.props.movie.original_title
                  ? this.props.movie.original_title
                  : this.props.movie.name
                  ? this.props.movie.name
                  : 'No title'}
                <a href={movieLinkValue}>
                  <img src={yt} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </a>
              </h2>
              <h5 className="text-secondary">
                {this.props.movie && this.props.movie.original_title ? this.props.movie.original_title : 'No title'}
              </h5>
              <h5>{this.props.movie && this.props.movie.overview ? this.props.movie.overview : 'No overview'}</h5>

              <h5>
                Vote average :{' '}
                <i className="fa fa-star" style={{ color: 'gold', fontSize: '23px' }} aria-hidden="true" />
                &nbsp;
                {this.props.movie && this.props.movie.vote_average
                  ? `${this.props.movie.vote_average}/10`
                  : 'No vote average'}
              </h5>
              <Link
                className="btn btn-primary play-button"
                to={`/videoPlayer/${this.props.movie && this.props.movie.id ? this.props.movie.id : ''}`}
              >
                {' '}
                Play video{' '}
              </Link>
            </div>
            <div className="w-75" style={{ minWidth: '200px !important' }}>
              <MovieImage
                className="ui image rounded-5 w-100"
                src={imageUrl}
                noMovieImageAvailable={noMovieImageAvailable}
                alt={this.props.movie && this.props.movie.overview ? this.props.movie.overview : 'No overview'}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

DetailPage.propTypes = {
  loading: PropTypes.bool,
  original_title: PropTypes.string,
  movie: PropTypes.object,
  overview: PropTypes.string,
  getMovieWithId: PropTypes.func,
  video: PropTypes.object,
  movieLink: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    getMovieWithId: (id, movieType) => dispatch(loadMovieWithId(id, movieType)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  movie: makeSelectMovie(),
  id: makeSelectId(),
  movieLink: makeSelectMovieLink(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'detailPage', reducer });
const withSaga = injectSaga({ key: 'detailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DetailPage);
