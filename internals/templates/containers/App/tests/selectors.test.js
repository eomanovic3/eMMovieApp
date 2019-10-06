import { makeSelectLoading } from 'containers/App/selectors';

describe('makeSelectLoading', () => {
  it('should select the loading', () => {
    const router = {
      loading: false,
    };
    const mockedState = {
      router,
    };
    expect(makeSelectLoading()(mockedState)).toEqual(router.loading);
  });
});
