import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sidebar from '../';

configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  const history = createMemoryHistory();
  it('should render correctly', () => {
    const component = shallow(
      <MemoryRouter keyLength={0}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
