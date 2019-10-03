// import produce from 'immer';
import searchPageReducer from "../reducer";
import {fromJS} from "immutable";
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe("searchPageReducer", () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      term: '',
      movies: null,
    });
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(searchPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
