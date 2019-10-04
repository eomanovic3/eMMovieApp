/**
 *
 * Tests for VideoPlayer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

// eslint-disable-next-line import/named
import { VideoPlayer } from '../index';

describe('<VideoPlayer />', () => {
  it('Expect to have additional unit tests specified', () => {
    expect(false).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<VideoPlayer />);
    expect(firstChild).toMatchSnapshot();
  });
});
