/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import VideoList from '../../components/VideoList';
import { loadMovies } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAllMovies,
  makeSelectDocumentaryMovies,
  makeSelectError,
  makeSelectFamilyShows,
  makeSelectLoading,
  makeSelectPopularMovies,
  makeSelectPopularTvShows,
} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import styled from 'styled-components';
import SearchBar from "../../components/SearchBar";

const PaddingDiv = styled.div`
  padding: 0 23px !important;
`;
class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <div className="d-flex flex-column">
          <h3 className="pl-3 pb-1 pt-2 border-bottom">
            <b>eMMovie</b>
          </h3>
          <SearchBar />
          <PaddingDiv className="pl-1 pb-3 pr-1 pt-1 mb-3">
            <div>
              <h5 className="pb-1 pt-2 mr-3 border-bottom">Popular movies</h5>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.props.popularMovies}
              />{' '}
            </div>
          </PaddingDiv>

          <PaddingDiv className="pl-1 pb-3 pr-1 pt-4">
            <div>
              <h5 className="pb-1 pt-2 mr-3 border-bottom">Popular series</h5>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.props.popularTvShows}
              />{' '}
            </div>
          </PaddingDiv>

          <PaddingDiv className="pl-1 pb-3 pr-1 pt-4">
            <div>
              <h5 className="pb-1 pt-2 mr-3 border-bottom">Family</h5>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.props.familyShows}
              />{' '}
            </div>
          </PaddingDiv>

          <PaddingDiv className="pl-1 pb-3 pr-1 pt-4">
            <div>
              <h5 className="pb-1 pt-2 mr-3 border-bottom">Documentary</h5>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.props.documentaryMovies}
              />{' '}
            </div>
          </PaddingDiv>
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  loading: PropTypes.bool,
  getMovies: PropTypes.func,
  popularMovies: PropTypes.object,
  popularTvShows: PropTypes.object,
  familyShows: PropTypes.object,
  documentaryMovies: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    getMovies: () => dispatch(loadMovies()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  allMovies: makeSelectAllMovies(),
  popularMovies: makeSelectPopularMovies(),
  popularTvShows: makeSelectPopularTvShows(),
  familyShows: makeSelectFamilyShows(),
  documentaryMovies: makeSelectDocumentaryMovies(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
