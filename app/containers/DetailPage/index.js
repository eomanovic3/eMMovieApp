/**
 *
 * DetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import 'font-awesome/css/font-awesome.min.css';

import {
    makeSelectError,
    makeSelectId,
    makeSelectLoading,
    makeSelectMovie,
} from './selectors';
import {loadMovieWithId} from './actions';
import nomovie from '../../images/nomovie.jpg';
import LoadingIndicator from '../../components/LoadingIndicator';
// eslint-disable-next-line import/order
import {Link} from 'react-router-dom';

class DetailPage extends React.PureComponent {
    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        const splitUrl = this.props.location.pathname.split('/');
        this.props.getMovieWithId(splitUrl[splitUrl.length - 1]);
    }

    render() {
        console.log(this.props);
        if (this.props.loading) {
            return <LoadingIndicator/>;
        }
        const imageUrl =
            this.props.movie && this.props.movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`
                : nomovie;

        return (
            <div className="d-flex flex-column">
                <div className="p-2"><Link className="text-right float-left mr-3" style={{fontSize: '20px'}} to="/"><i
                    className="fa fa-arrow-left" aria-hidden="true"/> Back to dashboard</Link></div>
                <div className="p-5 d-flex justify-content-center">
                    <div className="flex-column">
                        <div className="pb-4 justify-content-end">
                            <div className="float-left">
                                {this.props.movie && this.props.movie.release_date
                                    ? this.props.movie.release_date.toString().split('-')[0]
                                    : null}
                            </div>
                            <div className="float-left">
                                &nbsp;{' '}
                                <i
                                    className="fa fa-circle"
                                    style={{color: 'grey', fontSize: '12px'}}
                                    aria-hidden="true"
                                />{' '}
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
                                                    style={{color: 'lightgrey', fontSize: '9px'}}
                                                    aria-hidden="true"
                                                />
                                            ) : null}
                                            &nbsp;
                                        </div>
                                    ))
                                ) : (
                                    <div/>
                                )}
                            </div>
                        </div>
                        <h2>
                            {this.props.movie && this.props.movie.original_title
                                ? this.props.movie.original_title
                                : 'No title'}
                        </h2>
                        <h5 className="text-secondary">
                            {this.props.movie && this.props.movie.original_title
                                ? this.props.movie.original_title
                                : 'No title'}
                        </h5>
                        <h5>
                            {this.props.movie && this.props.movie.overview
                                ? this.props.movie.overview
                                : 'No overview'}
                        </h5>

                        <h5>
                            Vote average :{' '}
                            <i
                                className="fa fa-star"
                                style={{color: 'gold', fontSize: '23px'}}
                                aria-hidden="true"
                            />
                            &nbsp;
                            {this.props.movie && this.props.movie.vote_average
                                ? `${this.props.movie.vote_average}/10`
                                : 'No vote average'}
                        </h5>
                        <Link
                            className="btn btn-primary"
                            to={`/videoPlayer/${
                                this.props.movie && this.props.movie.id ? this.props.movie.id : ''
                                }`}
                        >
                            {' '}
                            Play video{' '}
                        </Link>
                    </div>
                    <div>
                        <img
                            className="ui image"
                            src={imageUrl}
                            alt={
                                this.props.movie && this.props.movie.overview
                                    ? this.props.movie.overview
                                    : 'No overview'
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

DetailPage.propTypes = {
    loading: PropTypes.bool,
    original_title: PropTypes.string,
    movie: PropTypes.object,
    overview: PropTypes.string,
    getMovieWithId: PropTypes.func,
    video: PropTypes.object,
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
    id: makeSelectId(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'detailPage', reducer});
const withSaga = injectSaga({key: 'detailPage', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(DetailPage);
