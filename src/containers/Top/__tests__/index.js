import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { configure, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';

import Top from '../';

configure({ adapter: new Adapter() });

describe('Top', () => {
  const initialState = { lineChartData: [] };
  const mockStore = configureStore();
  let store;
  it('should render correctly with no props', () => {
    store = mockStore(initialState);

    const component = shallow(
      <Provider store={store}>
        <Top />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  // it('should render correctly content: "top"', () => {
  //   const { getByText } = render(<Top />);
  //   const linkElement = getByText(/top/i);

  //   expect(linkElement).toBeInTheDocument();
  // });
});
