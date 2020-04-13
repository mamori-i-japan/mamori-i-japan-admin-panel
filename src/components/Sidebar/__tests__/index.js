import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sidebar from '../';

configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const component = shallow(
      <Router history={history}>
        <Sidebar />
      </Router>
    );

    expect(component).toMatchSnapshot();
  });
});
