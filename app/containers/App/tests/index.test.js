// import { CountryList } from '../index';

import React from 'react';
import Adapter from 'enzyme-adapter-react-16/build';
import Enzyme, { shallow } from 'enzyme';
import App from '../index';
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('render with videos', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
