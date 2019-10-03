import { loadSearchMovies } from "../actions";
import {LOAD_SEARCH_MOVIES} from "../constants";

describe("SearchPage actions", () => {
  describe("LOAD_SEARCH_MOVIES Action", () => {
    it("has a type of LOAD_SEARCH_MOVIES", () => {
      const expected = {
        type: LOAD_SEARCH_MOVIES
      };
      expect(loadSearchMovies()).toEqual(expected);
    });
  });
});
