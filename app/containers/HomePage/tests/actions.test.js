import { loadMovies } from '../actions';
import { LOAD_MOVIES } from '../constants';

describe('HomePage actions', () => {
  describe('Default Action', () => {
    it('has a type of LOAD_MOVIES', () => {
      const expected = {
        type: LOAD_MOVIES,
      };
      expect(loadMovies()).toEqual(expected);
    });
  });
});
