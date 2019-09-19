import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { LOAD_MOVIE } from './constants';
import { movieLoaded, movieLoadingError } from './actions';

export function* getMovieWithId(id) {
  try {
    const movie = yield call(
      request,
      `https://api.themoviedb.org/3/movie/${
        id.id
      }?api_key=a8ff50b145b3742d52ef2fc9ce52264f`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    yield put(movieLoaded(movie));
  } catch (err) {
    yield put(movieLoadingError(err));
  }
}
// Individual exports for testing
export default function* detailPageSaga() {
  yield takeLatest(LOAD_MOVIE, getMovieWithId);
}
