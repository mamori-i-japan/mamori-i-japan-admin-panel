import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sidebar from '../';

configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  it('should render correctly', () => {
    const component = shallow(<Sidebar />);

    // expect(component).toMatchSnapshot();
  });
});
